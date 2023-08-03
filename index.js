const inquirer = require('inquirer');
const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: process.env.DB_USER,
        // MySQL password
        password: process.env.DB_PW,
        database: process.env.DB_NAME
    },
    console.log(`Connected to the books_db database.`)
);

db.connect((err) => {
    if (err) throw err;
    primaryPathway();
})

function primaryPathway() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee"
            ]
        }
    ])
        .then((answers) => {
            if (answers.options === "View all departments") {
                // execute view all department function
                viewDepartment();
            } else if (answers.options === "View all roles"){
                // execute view all roles function
                viewRoles();
            } else if (answers.options === "view all employees"){
                // execute view all employees function
                viewEmployees()
            }
        })
}

function viewDepartment() {
    db.query('SELECT * FROM department', function (err, results) {
        console.table(results);
        primaryPathway();
    });
}

function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.table(results);
        primaryPathway();
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.table(results);
        primaryPathway();
    });
}