const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path')
const dotenv = require('dotenv');
const Tesseract = require('tesseract.js');
const language = require('@google-cloud/language');

// Creates a client
const client = new language.LanguageServiceClient();

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env')  });

// get image from bucket
router.get('/:key', async (req, res) => {
  // Enter copied or downloaded access ID and secret key here
  const ID = 'AKIAIPYOOM6I7INU3FIA';
  const SECRET = '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';

  // The name of the bucket that you have created
  const BUCKET_NAME = 'my-aws-bucket-90091';

  const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
  });

    var params = { Bucket: BUCKET_NAME, Key: req.params.key };
    s3.getObject(params, function(err, data) {
    res.writeHead(200, {'Content-Type': 'image/jpeg'});
    if (!data) return res.status(400).json({ message: 'That file doesn'/'t exist'})
    res.write(data.Body, 'binary');
    res.end(null, 'binary');
});
})

router.post('/', async (req, res) => {
// Configure aws with your accessKeyId and your secretAccessKey
AWS.config.update({
  region: 'us-east-1', // Put your aws region here
  accessKeyId: 'AKIAIPYOOM6I7INU3FIA',
  secretAccessKey: 'NaarTHuKoFoq5TM9EjeSwcwFXdNUQ/blJRQ6ARW2'
})

const S3_BUCKET = 'my-aws-bucket-90091'
// Now lets export this function so we can call it from somewhere else
  const s3 = new AWS.S3();  // Create a new instance of S3
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
// Set up the payload of what we are sending to the S3 api
  const s3Params = {
    Bucket: S3_BUCKET,
    Key: fileName,
    Expires: 500,
    ContentType: fileType,
    ACL: 'public-read'
  };

// Make a request to the S3 API to get a signed URL which we can use to upload our file
s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if(err){
      console.log(err);
      res.json({success: false, error: err})
    }
    // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
const returnData = {
      signedRequest: data,
      url: `https://my-aws-bucket-90091.s3.amazonaws.com/${fileName}`
    };
    // Send it all back
    res.json({success:true, data:{returnData}});
  });

});

router.post('/parse', async (req, res) => {
    console.log('reached', req.body)
    Tesseract.recognize(
        req.body.imgUrl,
        'eng',
        { logger: m => console.log(m) }
      ).then(({ data: { text } }) => {
        res.status(200).json({ text })
      })
//       .then(async () => {
//         const text = 'Fuck you bro you are a little cunt. How about you go back to india or ill slap the shit out of you';

// // Prepares a document, representing the provided text
// const document = {
//   content: text,
//   type: 'PLAIN_TEXT',
// };

// // Classifies text in the document
// const [classification] = await client.classifyText({document});
// console.log('Categories:');
// classification.categories.forEach(category => {
//   console.log(`Name: ${category.name}, Confidence: ${category.confidence}`);
// });
//       })
})

// https://${S3_BUCKET}.s3.amazonaws.com/


module.exports = router;