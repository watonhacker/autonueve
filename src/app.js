const express = require('express')
const app = express()
const port = 3000
const cfg = require('./cfg')
const indexRoutes = require('./routes/index')


app.use('/test', indexRoutes)



app.listen(port, () => {
    console.log("Inicio el servidor")
})