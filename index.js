const express = require('express')
const path = require('path')

//express
let app = express()

app.set('port', app.get('env') === 'production' ? process.env.PORT ? process.env.PORT : 3000 : 8000)

app.use('/public', express.static('dist'))

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

app.listen(app.get('port'), () => console.log(`application running on port ${app.get('port')}`))
