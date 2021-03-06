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
app.post('/project', db.postProject)
app.delete('/project/:id', db.deleteProject)
app.put('/project/:id', db.updateProject)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })