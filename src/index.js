import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import api from './api';

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/clothing-store-management-software', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api', api);

app.listen(port, () => {
  console.log(`Clothing store management software running on port ${port}`);
});