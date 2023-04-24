const express = require('express');
const app = express();
const cors = require('cors');
const {randomBytes} = require('crypto');
const axios = require('axios');

app.use(express.json());
app.use(cors());

const posts = {};

app.get('/api/posts', (req, res) => {
    res.send(posts);
});

app.post('/api/posts', async (req, res) => {
    const post = {
        id: randomBytes(4).toString('hex'),
        title: req.body.title
    }

    await axios.post('http://localhost:4005/api/events', {
        type: 'postCreated',
        data: post
    }).catch(er => console.log(`postCreated call failed`, er));

    posts[post.id] = post;

    res.send(post);
});


app.post('/api/events', (req, res) => {

    res.send({});
});


app.listen(4000, () => {
    console.log(`Post service running at port: 4000`);
})