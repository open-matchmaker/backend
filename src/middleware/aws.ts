const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: '8puWQY64SR9srxQbxQjTUcovAkkkL099vKuSKShz',
  accessKeyId: 'AKIAXJORXNKGDVPWNZTD',
  region: 'sa-east-1',
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    // acl: 'public-read',
    bucket: 'pdsmatch',
    key(req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) {
      console.log(file);
      const data = String(Date.now());
      cb(null, `${data}.png`); // use Date.now() for unique file keys
    },
  }),
});

export default upload;
