CREATE TABLE projects (
    project_id serial NOT NULL,
    project_name varchar(255) NOT NULL,
    project_leader varchar(255) NOT NULL,
    project_budget int NOT NULL,
    PRIMARY KEY (project_id)
);

CREATE TABLE employees (
    employee_id serial NOT NULL,
    employee_firstName varchar(255) NOT NULL,
    employee_lastName varchar(255) NOT NULL,
    department_id int NOT NULL,
    hourly_rate int NOT NULL,
    PRIMARY KEY (employee_id)
);

CREATE TABLE departments (
    department_id serial NOT NULL,
    department_name varchar(255) NOT NULL,
    PRIMARY KEY (department_id)
);

CREATE TABLE projects_employees (
    project_id serial NOT NULL,
    employee_id serial NOT NULL
);

ALTER TABLE employees
    ADD FOREIGN KEY (department_id) REFERENCES departments(department_id);

ALTER TABLE projects_employees
    ADD FOREIGN KEY (project_id) REFERENCES projects(project_id),
    ADD FOREIGN KEY (employee_id) REFERENCES employees(employee_id);