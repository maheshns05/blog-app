const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(express.json());
app.use(cors());

app.post('/api/events', (req, res) => {
    const {type, data} = req.body;

    if(type === 'commentCreated') {

    }

    res.send({})
});

app.listen(4003, () => {
    console.log(`Post service running at port: 4003`);
})