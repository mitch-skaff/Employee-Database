const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    };

    findAllDepartments () {
        return this.connection.query(
            "SELECT * FROM department"
        )
    };

    findAllEmployees () {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id"
        )
    };

    findAllRoles () {
        return this.connection.query(
            "Select title as RoleTitle, salary as Salary, department.name as Department FROM role LEFT JOIN department on role.department_id = department.id"
        )
    };

    insertRole () {
        return this.connection.query(
            "INSERT INTO role SET ?"
        )
    };

    insertDepartment () {
        return this.connection.query(
            "INSERT INTO department SET ?"
        )
    };

    insertEmployee () {
        return this.connection.query(
            "INSERT INTO employee SET ?"
        )
    };
};


module.exports = new DB(connection);

