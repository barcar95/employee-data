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
            choice: ["View All departments", "View All roles", "View All employees", "Add a department", "Add a role", "Add an employee", "Update an employee"
            ]
        }
    ])
    .then((answers) => {
        if (answers.options === "View All departments"){
            // execute view all department function
        }
    })
}