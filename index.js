const inquirer = require("inquirer");
const db = require('./db/dbQueries');

async function viewAllEmployees () {
    let employees = await db.findAllEmployees();
    console.table(employees);
}

viewAllEmployees();