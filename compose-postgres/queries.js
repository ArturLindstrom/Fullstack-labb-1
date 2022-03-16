const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Labb',
  password: 'changeme',
  port: 5432,
})



const getProjects = (request, response) => {
  pool.query('SELECT * FROM projects', (error, results) => {
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
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const postProject = (request, response) => {
  const { project_name, project_leader, project_budget } = request.body

  pool.query('INSERT INTO projects (project_name, project_leader, project_budget) VALUES ($1, $2, $3)', [project_name, project_leader, project_budget], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`Project added`);
  })
}


module.exports = {
  getProjects,
  getProjectById,
  postProject
}