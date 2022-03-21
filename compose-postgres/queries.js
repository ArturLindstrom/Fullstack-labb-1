const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Labb',
  password: 'changeme',
  port: 5432,
  
})



const getProjects = (request, response) => {
  pool.query('SELECT * FROM projects ORDER BY project_id', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getProjectById = (request, response) => {
  const id = parseInt(request.params.id)
  console.log(id)
  pool.query('SELECT * FROM projects WHERE project_id = $1', [id], (error, results) => {
    if (!results.rows[0]) {
      response.status(404).send('Project not found')
    }
    response.status(200).json(results.rows[0])
  })
}

const postProject = (request, response) => {
  const { project_name, project_leader, project_budget } = request.body

  pool.query('INSERT INTO projects (project_name, project_leader, project_budget) VALUES ($1, $2, $3) RETURNING *', [project_name, project_leader, project_budget], (error, results) => {
    if (error) {
      throw error
    }
     response.status(201).json(results.rows[0]);

  })
}

const deleteProject = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM projects WHERE project_id = $1 RETURNING *', [id], (error, results) => {
    if (!results.rows[0]) {
      response.status(404).send(`Project with id ${id} not found`)
    }
    else {response.status(200).send(`Project with id ${id} Deleted`)}
  })
}

const updateProject = (request, response) => {
  const { project_name, project_leader, project_budget } = request.body
  const id = parseInt(request.params.id)

  pool.query('UPDATE projects SET project_name = $1, project_leader = $2, project_budget = $3 WHERE project_id = $4 RETURNING *', [project_name, project_leader, project_budget, id], (error, results) => {
    if(!results.rows[0]){
      response.status(404).send(`Project with id ${id} not found`)
    }
    else if (error) {
      throw error
    }
    else {response.status(200).json(results.rows[0])}
  })
}


module.exports = {
  getProjects,
  getProjectById,
  postProject,
  deleteProject,
  updateProject
}