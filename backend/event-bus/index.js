const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(express.json());
app.use(cors());

app.post('/api/events', (req, res) => {
    const {type, data} = req.body;
    axios.post('http://localhost:4000/api/events', {
        type,
        data
    }).catch(err =>  console.log(err));

    axios.post('http://localhost:4001/api/events', {
        type,
        data
    }).catch(err =>  console.log(err));

    axios.post('http://localhost:4002/api/events', {
        type,
        data
    }).catch(err =>  console.log(err));

    axios.post('http://localhost:4003/api/events', {
        type,
        data
    }).catch(err =>  console.log(err));

    res.send({});
});


app.listen(4005, () => {
    console.log(`Post service running at port: 4005`);
})
