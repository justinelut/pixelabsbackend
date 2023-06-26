import express from 'express';
import payload from 'payload';
import path from 'path';

require('dotenv').config();
const app = express();

app.use('/media', express.static(path.resolve(__dirname, './media')));
app.use('/assets', express.static(path.resolve(__dirname, './assets')));

const start = async () => {
  

  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`);
    },
  });

  app.get('/preview/:template', (req, res) => {
    const template = req.params.template;
    if (template !== 'admin' && template !== 'vite.svg') {
      app.use(
        express.static(path.resolve(__dirname, `../preview/${template}`))
      );
      res.sendFile(
        path.resolve(__dirname, '../preview/', template, 'index.html')
      );
    }
  });

  // Add your own express routes here

  app.listen(process.env.PORT);
};

start();
