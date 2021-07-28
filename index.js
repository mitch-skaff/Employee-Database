const inquirer = require("inquirer");
const db = require('./db/dbQueries');
const connection = require('./db/connection');

init();

function init() {
    inquirer.prompt(
        {
            type: "list",
            message: "What would you like to do?",
            name: "choice",
            choices: [
                "View All Employees",
                "View All Roles",
                "View All Departments",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Update Employee Role",
                "Exit",
            ]
        }).then(answer => {
            switch (answer.choice) {
                case "View All Employees":
                    viewAllEmployees();
                    break;
                case "View All Roles":
                    viewAllRoles();
                    break;
                case "View All Departments":
                    viewAllDepartments();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Role":
                    addRole();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Update Employee Role":
                    updateEmployeeRole();
                    break;
                case "Exit":
                    console.log("\nHope you enjoyed this application!");
                    break;
            }
        })
};


async function viewAllEmployees() {
    let employees = await db.findAllEmployees()

    console.log("\n");
    console.table(employees);
    init();
};

async function viewAllRoles() {
    let roles = await db.findAllRoles()

    console.log("\n");
    console.table(roles);
    init();
};

async function viewAllDepartments() {
    let departments = await db.findAllDepartments()

    console.log("\n");
    console.table(departments);
    init();
};

function addRole() {
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the new role?"
        },
        {
            type: "input",
            name: "salary",
            message: "What is the new role's salary?"
        },
        {
            type: "input",
            name: "department_id",
            message: "What is the new role's department ID?",
        }
    ])
        .then(answer => {

            connection.query("INSERT INTO role SET ?",
                {
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                }, (err, res) => {
                    if(err) throw err;

                    init();
                });
        })
};

function addEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "first_name",
            message: "What is the new employee's first name?"
        },
        {
            type: "input",
            name: "last_name",
            message: "What is the new employee's last name?"
        },
        {
            type: "input",
            name: "manager_id",
            message: "Who is the new employee's manager's ID?",
        },
        {
            type: "input",
            name: "role_id",
            message: "What is the new employee's role ID?",
        },
    ])
        .then(answer => {

            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    manager_id: answer.manager_id,
                    role_id: answer.role_id

                }, (err, res) => {
                    if (err) throw err;

                    init();
                });
        })
};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the new department?"
        }
    ])
        .then(answers => {

            connection.query("INSERT INTO department SET ?",
                {
                    name: answers.name
                }, (err, res) => {
                    if (err) throw err;

                    init();
                });
        })
};

function updateEmployeeRole(){
    connection.query("SELECT employee.id, first_name, last_name, title, role_id FROM employee JOIN role ON role_id=role.id", (err,res) => {
        if(err) throw err;

        var employeesArray = [];
        res.forEach(employee => {employeesArray.push(employee.id + ": " + employee.first_name + " " + employee.last_name)});

        var rolesArray = [];
        res.forEach(role => {rolesArray.push(role.role_id + ": " + role.title)});

        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "For which employee would you like to change their role?",
                choices: employeesArray
            },
            {
                type: "list",
                name: "role",
                message: "What would you like to update their role to?",
                choices: rolesArray
            }

        ])
        .then(answer => {


            connection.query("UPDATE employee SET ? WHERE ?",
            [ 
                {
                    role_id: answer.role[0],
                },
                {
                    id: answer.employee[0],
                }
            ],
            (err,res) => {
                if (err) throw err;

                init();
            });
        })
    })
};


