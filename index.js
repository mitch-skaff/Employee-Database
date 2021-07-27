const inquirer = require("inquirer");
const db = require('./db/dbQueries');

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
            }
        })
};
// async function viewAllEmployees () {
//     let employees = await db.findAllEmployees();
//     console.table(employees);
// }

// viewAllEmployees();

