const db = require('./queries')
const express = require('express')
const app = express()
const port = 3000

app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.send('bajs')
  })

app.get('/users', db.getUsers)
app.get('/actor', db.getActors)
app.get('/actor/:id', db.getActorById)
app.get('/actors', db.getActorNames)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })