const express = require('express');
const app = express();
const cors = require('cors');
const {randomBytes} = require('crypto');
const axios = require('axios');

app.use(express.json());
app.use(cors());

const commentObj = {};

app.get('/api/posts/:id/comments', (req, res) => {
    const comments = commentObj[req.params.id] ? commentObj[req.params.id].comments : []
    res.send(comments);
});

app.post('/api/posts/:id/comments', async (req, res) => {
    const id = req.params.id;
    const comment = {
        id: randomBytes(4).toString('hex'),
        comment: req.body.comment,
        status: 'pending'
    }

    if (commentObj[id]) {
        commentObj[id].comments.push(comment);
    } else {
        commentObj[id] = {
            'comments': [comment]   
        }
    }

    await axios.post('http://localhost:4005/api/events', {
        type: 'commentCreated',
        data: {
            id,
            comment: comment
        }
    }).catch(er => console.log(`commentCreated call failed`, er));

    res.send(comment);
});

app.post('/api/events', (req, res) => {

    res.send({});
});

app.listen(4001, () => {
    console.log(`Post service running at port: 4001`);
})