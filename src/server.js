const express = require('express')
const app = express()
const port = 4000

app.post('/login', (req, res) => {
    const username = req.body.username || 'invalid';
    const password = req.body.password || 'invalid';
    if (username === 'admin' && password === 'admin') {
        res.json({ success: 1, message: 'logged in!' });
    } else {
        res.json({ success: 0, message: 'Credentials are invalid!' });
    }
})

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})