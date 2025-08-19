// 1. Import client
const { SecretsManagerClient, GetSecretValueCommand } = require('@aws-sdk/client-secrets-manager');
// fromIni → reads credentials from your local ~/.aws/credentials or ~/.aws/config file.
// ini stands for initialization file which is text file
const { fromIni } = require('@aws-sdk/credential-providers');
const { profile, region, secretName } = process.env;
module.exports.getSecrets = () => new Promise(async (resolve)=> {
    // 1. Create client
    const secretsManagerClient = new SecretsManagerClient({
        region,
        credentials: fromIni({ profile }),
    });

    // 3. Send command with your secret name
    try {
        const params = {
            SecretId: secretName
        };
        const command = new GetSecretValueCommand(params);
        const data = await secretsManagerClient.send(command);
        if('SecretString' in data) {
            process.env = JSON.parse(data.SecretString);
        } else {
            const buff = Buffer.from(data.SecretBinary, 'base64');
            process.env = buff.toString('ascii');
        }
    } catch (error) {
        console.error('Error Fetching AWS secret: ', error);
    }
    resolve(1);
});