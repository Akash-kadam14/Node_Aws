const { SESClient, ListIdentitiesCommand, SendEmailCommand } = require('@aws-sdk/client-ses');
const { region, sourceMail } = process.env;

const sesClient = new SESClient({ region });


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
        console.error('Error occured in sendEmail of file awsEmailService :: '. error);
        throw error;
    }
}

module.exports = {
    sendEmailBySES
}