const { 
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} = require('@aws-sdk/client-s3');

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const sharp = require('sharp');

const { region, USER_BUCKET_NAME } = process.env;

const s3client = new S3Client({ region });

function resizeImageBuffer(buffer, size = 0) {
    let image = null;
    if (size === 0) {
      // Original
      image = sharp(buffer)
        .flatten({
          background: {
            r: 255,
            g: 255,
            b: 255,
            alpha: 1,
          },
        })
        .jpeg();
    } else {
      image = sharp(buffer)
        .resize({
          ...size,
          background: {
            r: 255,
            g: 255,
            b: 255,
            alpha: 1,
          },
        })
        .flatten(true)
        .jpeg();
    }
    return new Promise((resolve, reject) => {
      image
        .toBuffer()
        .then((imageBUffer) => {
          resolve(imageBUffer);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
async function upload(fileData, fileName, bucketName) {
    try {
        let bufferData = Buffer.from(fileData.buffer);
        if(fileData.mimetype === 'image/jpeg') {
            buffer = await resizeImageBuffer(fileData.buffer);
        }
    
        // set up the params for to uplaod file to s3
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: bufferData,
            ContentType: fileData.mimetype,
        }
    
        const command = new PutObjectCommand(params);
        const response = await s3client.send(command);
        console.log('response', response);
        return `s3://${bucketName}/${params.Key}`;   
    } catch (error) {
        console.error('Error occured in upload of file awsStorage :: '. error);
        throw error;
    }
 
};

async function getFile(key) {
  try {
    // set up the params for to uplaod file to s3
    const params = {
      Bucket: USER_BUCKET_NAME,
      Key: key,
    }
    const command = new GetObjectCommand(params);
    // Generate a signed URL valid for 1 hour
    const url = await getSignedUrl(s3client, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.log('error', error);
    console.error('Error downloading in getFile of file awsStorage :: '. error);
    throw error;
  }
}
module.exports = {
    upload,
    getFile
}