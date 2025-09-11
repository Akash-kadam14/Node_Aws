const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const { SQSClient, SendMessageCommand } = require('@aws-sdk/client-sqs');
const { region, sourceMail, queueUrl } = process.env;

const sesClient = new SESClient({ region });
const sqsClient = new SQSClient({ region })

async function sendEmailBySES(to, subject, message) {
    try {
        const params = {
            Source: sourceMail, // must be verified in sandbox
            Destination: {
              ToAddresses: [to], // must also be verified in sandbox
            },
            Message: {
              Subject: { Data: subject },
              Body: {
                Text: { Data: message },
              },
            },
          };
          const command = new SendEmailCommand(params);
          const response = await sesClient.send(command);
          return response
    } catch (error) {
        console.error('Error occured in sendEmail of file awsServices :: '. error);
        throw error;
    }
}

async function sendMessageToQueue(message) {
  try {
    const params = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(message),
    }
    const command = new SendMessageCommand(params);
    const response = await sqsClient.send(command);
    return response;
  } catch (error) {
    console.error('Error occured in sendMessageToQueue of file awsServices :: '. error);
    throw error;
  }
}
module.exports = {
    sendEmailBySES,
    sendMessageToQueue
}