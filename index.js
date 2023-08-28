'use strict'

const Pool = require('pg').Pool;;

require('dotenv').config();

const pool = new Pool({
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRESQL_DB,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.POSTGRESQL_PORT,
});

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const router = express.Router();

const PORT = 8050;
const HOST = "localhost";

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render("index");
});

app.post('/sms', async (req, res) => {
    const result = await pool.query('');
    res.sendStatus(200);
});
app.post('/telegram', async (req, res) => {
    const { text, buttonCount } = req.body;
    const result = await pool.query('INSERT INTO mailing (mailing_text, button_count)');
    res.sendStatus(200);
});
app.post('/whatsapp', async (req, res) => {
    const result = await pool.query('');
    res.sendStatus(200);
});
app.post('/vkontakte', async (req, res) => {
    const result = await pool.query('');
    res.sendStatus(200);
});

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});