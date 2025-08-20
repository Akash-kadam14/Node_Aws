const { 
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
    DeleteObjectCommand
} = require('@aws-sdk/client-s3');

const { region } = process.env;

const s3client = new S3Client({ region })
async function upload(fileData, fileName, bucketName) {
    let bufferData = Buffer.from(fileData.buffer);
    if(fileData.mimetype === 'image/jpeg') {
        buffer = await resizeImageBuffer(fileDate.buffer);
    }

    // set up the params for to uplaod file to s3

    const params = {
        Bucket: bucketName,
        key: fileName,
        Body: bufferData,
        ACL: 'public-read',
        ContentType: fileData.mimetype,
    }

    const command = new PutObjectCommand(params);
    const response = s3client.send(command);
    
}