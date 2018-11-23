const FtpSvr = require('ftp-srv');
const hostname = '0.0.0.0';
const port = 1111;
const { Storage } = require('@google-cloud/storage');

const ftpServer = new FtpSvr('ftp://' + hostname + ':' + port,
    { anonymous: true, greeting: ["Hello", "Welcome"] });

const PROJECT_ID = "seismic-box-219016";
const bucketName = 'ftp_demo';

// Creates a client
const storage = new Storage({
    projectId: PROJECT_ID,
    keyFilename: 'serviceAccountKey.json'
});

ftpServer.on('login', (data, resolve, reject) => {
    const connection = data.connection;
    console.log('connection: ' + data);
    console.log('resolve: ' + resolve);
    console.log('reject: ' + reject);

    connection.on('STOR', (error, fileName) => {
        console.log('file created...' + fileName)
        uploadFile(fileName);
    });
    resolve({ root: '/home/prateekk/source_code/ftp/ftpfiles' });
});

ftpServer.on('client-error', (connection, context, error) => {
    console.log('connection: ' + connection);
    console.log('context: ' + context);
    console.log('error: ' + error);
});

ftpServer.listen()
    .then(() => {
        console.log(`Server running at http://${hostname}:${port}/`);
    });

function uploadFile(fileName) {
    let bucket = storage.bucket(`${bucketName}`)
    bucket.upload(fileName, { destination: "/orders/order-" + Date.now() + '.txt' }, (err, file) => {
        if (err != null) {
            console.log(err);
        } else {
            console.log('file uploaded successfully....' + fileName);
        }
    });
}