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
app.use(express.static('public'));

app.get('/', async (req, res) => {
    await pool.query(`SELECT name FROM messenger;`, (error, result) => {
        if(error){
            throw error;
        }
        let rows = result.rows;
        let toRender = [];
        for(let i = 0; i < rows.length; i++){
            toRender.push(rows[i].name);
        }
        res.render('index', {toRender: toRender});
    });
});

app.post('/sms', async (req, res) => {
    try {
        const result = await pool.query('');
    } catch(err) {
        console.log(err.message);
        res.sendStatus(502);
    }
    res.sendStatus(200);
});
app.post('/telegram', async (req, res) => {
    try {
        const { text, buttonCount } = req.body;
        const result = await pool.query(`INSERT INTO mailing (mailing_text, button_count) VALUES ($1, $2)`, {text, buttonCount});
    } catch(err) {
        console.log(err.message);
        res.sendStatus(502);
    }
    res.sendStatus(200);
});
app.post('/whatsapp', async (req, res) => {
    try {
        const result = await pool.query('');
    } catch(err) {
        console.log(err.message);
        res.sendStatus(502);
    }
    res.sendStatus(200);
});
app.post('/vkontakte', async (req, res) => {
    try {
        const result = await pool.query('');
    } catch(err) {
        console.log(err.message);
        res.sendStatus(502);
    }
    res.sendStatus(200);
});

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});