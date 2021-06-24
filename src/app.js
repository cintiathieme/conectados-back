require('dotenv').config();
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/apiRoutes');

require('./config/mongodb.config');

const app = express();

app.use(cors({
    origin: process.env.FRONT_END_URL,
}));

app.use(express.json());

app.use('/', apiRoutes);
app.use('/', require('./routes/fileUploadRoutes'));

app.listen(process.env.PORT, () => console.log(`App running on PORT ${process.env.PORT}`));
