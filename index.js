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
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"
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
            } else if (answers.options === "View all employees"){
                // execute view all employees function
                viewEmployees()
            } else if (answers.options === "Add a department"){
                // execute add a department function
                addDepartment()
            } else if (answers.options === "Add a role"){
                // execute add a role function
                addRole()
            } else if (answers.options === "Add an employee"){
                // execute add an employee function
                addEmp() 
            } else if (answers.options === "Update an employee role"){
                // execute update employee role function
                updateEmpRole()
            }

        })
}

function viewDepartment() {
    db.query('SELECT * FROM department', function (err, results) {
        console.log();
        console.table(results);
        primaryPathway();
    });
}

function viewRoles() {
    db.query('SELECT * FROM role', function (err, results) {
        console.log();
        console.table(results);
        primaryPathway();
    });
}

function viewEmployees() {
    db.query('SELECT * FROM employee', function (err, results) {
        console.log();
        console.table(results);
        primaryPathway();
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDep',
            message: 'What department name would you like to add?'
        }
    ])
    .then((answer) => {
        const sql = `INSERT INTO department (name) VALUES (?)`
        const params = [answer.addDep];
        db.query(sql, params, (err, results) => {
            console.log(err);
            db.query('SELECT * FROM department', function (err, results) {
                console.log();
                console.table(results);
            primaryPathway();
        })
    })
})
}

async function addRole(){
    const roles = await db.promise().query('SELECT id AS value, CONCAT(name) AS name FROM department');
    const ans = await inquirer.prompt([
        {
            type:'input',
            name: 'addRole',
            message: 'What role name would you like to add?'
        },
        {
            type: 'input',
            name: 'addSal',
            message:'What salary will this role have?'
        },
        {
            type: 'list',
            name: 'depID',
            message: 'What department will this new role be under?',
            choices: roles[0]
        }
    ])
    const updated = ((answer1, answer2, answer3)=> {
        const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`
        const params = [answer1, answer2, answer3]
        db.query(sql, params, (err, result) => {
            console.log(err);
            db.query('SELECT * FROM role', function (err, results) {
                console.log();
                console.table(results);
            });
            primaryPathway();
        })
    })
    updated(ans.addRole, ans.addSal, ans.depID);
}

async function addEmp(){
    const role = await db.promise().query('SELECT id AS value, CONCAT(title) AS name FROM role');
    const users = await db.promise().query('SELECT id AS value, CONCAT(last_name, \', \', first_name) AS name FROM employee');

    const ans = await inquirer.prompt([
        {
            type:'input',
            name: 'firstName',
            message: 'Enter the first name of the new employee'
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'Enter the last name of the new employee'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of the new employee?',
            choices: role[0]
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who is the manager of the new employee?',
            choices: users[0]
        }
    ])
    const updated = ((answer1, answer2, answer3, answer4) => {
        const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
        const params = [answer1, answer2, answer3, answer4]
        db.query(sql, params, (err, result) => {
            console.log(err);
            db.query('SELECT * FROM employee', function (err, results) {
                console.log();
                console.table(results);
            });
            primaryPathway();
        })
    })
    updated(ans.firstName, ans.lastName, ans.role, ans.manager)
}


async function updateEmpRole() {
    const users = await db.promise().query('SELECT id AS value, CONCAT(last_name, \', \', first_name) AS name FROM employee');

    const ans = await inquirer.prompt([
        {
            type: 'list',
            name: 'updateEmp',
            message: "Which employee's role would you like to update?",
            choices: users[0]
        }]);

    console.log(ans);
    /* choice should like like this:
    {
        name: "Something that gets displayed",
        value: "What will be sent to the next part of the code"
    }
    */
    
    // new var to grab roles
    const roles = await db.promise().query('SELECT id AS value, CONCAT(title) AS name FROM role');
    const role = await inquirer.prompt([
        {
            type: 'list',
            name:'updateRole',
            message: "Which role do you want to assign to the selected employee?",
            choices: roles[0]
        }])
    console.log(role);
    const updated = ((roleID, empID) => {
        const sql = `UPDATE employee SET role_id = ? WHERE id = ?`
        const params = [roleID, empID]
        db.query(sql, params, (err, result) => {
            console.log(err);
            db.query('SELECT * FROM employee', function (err, results) {
                console.log();
                console.table(results);
            });
            primaryPathway();
        })
    })
    updated(role.updateRole, ans.updateEmp);
}