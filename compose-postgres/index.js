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


app.get('/project', db.getProjects)
app.get('/project/:id', db.getProjectById)
app.get('/project', db.postProject)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })