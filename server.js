const express = require('express');
const app = express();
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config();

const itemsPool = require('./dbConfig');


app.get('/', (req, res) => {
    res.send('Simple API homepage');
})
app.listen(5070, () => {
    console.log("Server running on port 5070");
})

app.get('/api/items', async(req, res) => {
    try {
        const allItems = await itemsPool.query(
            'SELECT * FROM test'
        );
        res.json({ allItems });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})
app.post('/api/items', async (req, res) => {
    console.log(req.body);
    const { description } = req.body;
    try {
        const newItem = await itemsPool.query(
            'INSERT INTO test (description) VALUES ($1) RETURNING *',
            [description]
        );
        res.json({ 
            message: "New item added!",
            item: newItem.rows
         });
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})