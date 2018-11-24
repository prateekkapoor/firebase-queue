# firebase-queue
Simple project to get started with FTP, google cloud bucket, firebase and firebase queue.
- Put a file at FTP location.
- FTP listener listening to that location picks the file.
- FTP listener uploads the file in google storage bucket
- Cloud function is triggered on file upload.
- Cloud function downloads the csv file, converts it to json and pushes it to firebase and firebase queue.
- OrderQueueListener listenes to queue and process the task. Once processing is finished removes it from the queue.

## Install dependencies both in root and /functions
npm install

## Deploy functions
npm run deploy

### Running FTP server
node index.js

### Connecting to ftp
- ftp
- ftp> open
- ftp> 127.0.0.1
- ftp> <userName>
- ftp> <password>

### Starting order queue listener

node OrdersQueueListener.js

### Create a google bucket ftp_demo

## Starting point
Put a csv file at FTP location by connecting to ftp server.
