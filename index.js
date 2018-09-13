const express = require('express')
const path = require('path')

//db startup
async function dbStartup() {
    const db = require('./src/api/database')
    await db.connect()
    await db.usersTable()
    await db.notesTable()
    return
}

//express setup
let app = express()

app.set('port', app.get('env') === 'production' ? process.env.PORT ? process.env.PORT : 3000 : 8000)

app.use('/public', express.static('dist'))
// app.use('/api', require('./src/api/routes')) //opens api endpoints
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
})

//start app
Promise.all([dbStartup()])
    .then(() => {
        app.listen(app.get('port'), () => console.log(`application running on port ${app.get('port')}`))
    })
    .catch(err => {
        console.log('Failed to lanch app: ' + err)
        process.exit(1)
    })
