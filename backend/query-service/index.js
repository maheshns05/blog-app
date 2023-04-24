const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());

const Posts = {};

app.get('/api/posts', (req, res) => {
    res.send(Posts);
});

app.post('/api/events', (req, res) => {
    const {type, data} = req.body;

    if(type === 'postCreated') {
        Posts[data.id] = data
    }

    if(type === 'commentCreated') {
        console.log(data);
        if(Posts[data.id].comments) {
            Posts[data.id].comments.push(data.comment);
        } else {
            Posts[data.id].comments = [data.comment]   
        }
    }

    res.send({});
});


app.listen(4002, () => {
    console.log(`Post service running at port: 4002`);
})
