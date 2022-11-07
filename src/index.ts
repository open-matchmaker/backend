import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import passport from 'passport';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import router from './router';
import './middleware/passport';
import HttpException from './exeptions/HttpExeption';

const app = express();
const port = process.env.PORT || 3000;

// const express = require('express');
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
require('dotenv').config();

aws.config.update({
  secretAccessKey: '8puWQY64SR9srxQbxQjTUcovAkkkL099vKuSKShz',
  accessKeyId: 'AKIAXJORXNKGDVPWNZTD',
  region: 'sa-east-1',
});

const s3 = new aws.S3();

app.use(bodyParser.json());

const upload = multer({
  storage: multerS3({
    s3,
    // acl: 'public-read',
    bucket: 'pdsmatch',
    key(req: any, file: { originalname: any; }, cb: (arg0: null, arg1: any) => void) {
      console.log(file);
      cb(null, file.originalname); // use Date.now() for unique file keys
    },
  }),
});

// open in browser to see upload form
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);// index.html is inside node-cheat
});

// use by upload form
app.post('/upload', upload.array('upl', 25), (req, res, next) => {
  res.send({
    message: 'Uploaded!',
    // eslint-disable-next-line max-len
    urls: (req as any).files.map((file: { location: any; key: any; mimetype: any; size: any; }) => ({
      url: file.location, name: file.key, type: file.mimetype, size: file.size,
    })),
  });
});

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
