const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require('path')
const config = require('config')

const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/api/booksearch', require('./routes/google.book.routes'))

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'the-app', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'the-app', 'build', 'index.html'))
    })
}


const PORT = config.get('port') || 5000

app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))

