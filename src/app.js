const express = require('express')
const app = express()
const port = 3000
const index = 

app.get('/', (req, res) => {
    res.send("Hola3")
})



app.listen(port, () => {
    console.log("Inicio el servidor")
})