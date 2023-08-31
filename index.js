'use strict'

const Client = require('pg').Client;
const Pool = require('pg').Pool;

require('dotenv').config();

const client = new Client({
    user: process.env.POSTGRESQL_USER,
    host: process.env.POSTGRESQL_HOST,
    database: process.env.POSTGRESQL_DB,
    password: process.env.POSTGRESQL_PASSWORD,
    port: process.env.POSTGRESQL_PORT,
});

client.connect();

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
    try{
        await pool.query(`SELECT name FROM messenger;`, (error, result) => {
            if(error){
                throw error.stack;
            }
            let rows = result.rows;
            let toRender = [];
            for(let i = 0; i < rows.length; i++){
                toRender.push(rows[i].name);
            }
            res.render('index', {toRender: toRender});
        });
    } catch (err) {
        console.error(err.stack);
    }
});

app.post('/sms', async (req, res) => {
    try {
        await MessengerQuerySMS(req);
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
        res.sendStatus(502);
    }
});
app.post('/telegram', async (req, res) => {
    try {
        await MessengerQuery(req);
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
        res.sendStatus(502);
    }
});
app.post('/whatsapp', async (req, res) => {
    try {
        await MessengerQuery(req);
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
        res.sendStatus(502);
    }
});
app.post('/vkontakte', async (req, res) => {
    try {
        await MessengerQuery(req);
        res.sendStatus(200);
    } catch(err) {
        console.log(err.message);
        res.sendStatus(502);
    }
});

async function MessengerQuery(req){
    try{
        let messenger = req.body.selector;
        let message = req.body.message;
        let checkbox = req.body.checkbox;
        let buttons = [];

        for(const [key, value] of Object.entries(req.body)){
            if(key.includes("button-text-", 0)){
                buttons.push(value);
            }
        }

        if(checkbox == undefined) {
            checkbox = "false";   
        } else {
            checkbox = "true";
        }

        const messengerId = await pool.query(`SELECT id FROM messenger WHERE name = $1;`, [messenger]);

        await client.query(`INSERT INTO mailing (mailing_text, button_count, messenger_id) VALUES ($1, $2, $3);`,
        [message, buttons.length, messengerId.rows[0].id]);

        const mailingId = await pool.query(`SELECT id FROM mailing WHERE mailing_text = $1 AND button_count = $2 AND messenger_id = $3;`,
        [message, buttons.length, messengerId.rows[0].id]);

        for(let i = 0; i < buttons.length; i++){
            await client.query(`INSERT INTO button (text, link, inline, mailing_id) VALUES ($1, false, $2, $3);`,
            [buttons[i], checkbox, mailingId.rows[0].id]);
        } 
    } catch (error){
        console.error(error.stack);
    } 
}

async function MessengerQuerySMS(req){
    try{
        let messenger = req.body.selector;
        let message = req.body.message;

        const messengerId = await pool.query(`SELECT id FROM public.messenger WHERE name = $1;`, [messenger]);

        await client.query(`INSERT INTO public.mailing (mailing_text, button_count, messenger_id) VALUES ($1, $2, $3);`, [message, 0, messengerId.rows[0].id]);
    } catch (error){
        console.error(error.stack);
    }
}

app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
});