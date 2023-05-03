const inquirer = require('inquirer');
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password
      password: 'Ph!pi0207',
      database: 'company_db'
    }
);

const viewAllEmployees = (askUser) => {
    db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title AS title, department.name AS department, role.salary AS salary, concat(man.first_name, " ", man.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee man ON employee.manager_id = man.id ORDER BY department;', (err, results) => {
        if (err) throw err;
        console.log("");
        console.table(results);
        askUser();
    });
}

const viewAllDepartments = (askUser) => {
    db.query('SELECT * FROM department', (err, results) => {
        if (err) throw err;
        console.log("");
        console.table(results);
        askUser();
    });
}

const viewAllRoles = (askUser) => {
    db.query('SELECT role.id, title, department.name AS department, salary FROM role INNER JOIN department ON role.department_id = department.id ORDER BY department;', (err, results) => {
        if (err) throw err;
        console.log("");
        console.table(results);
        askUser();
    });
}

const addDepartment = (askUser) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the department?',
        },
    ])
    .then((answer) => {
        db.query(`INSERT INTO department (name) VAlUES ('${answer.name}')`,
        (err, result) => {
            if (err) throw err;
            console.log(`Added ${answer.name} to the database`)
            askUser();
        });
    });

}

const addEmployee = (askUser) => {
    db.query('SELECT * FROM role', function (err, roles) {
      if (err) throw err;
      db.query('SELECT * FROM employee', function (err, employees) {
        if (err) throw err;
        inquirer
          .prompt([
            {
              type: 'input',
              name: 'first_name',
              message: "What is the employee's first name?",
            },
            {
              type: 'input',
              name: 'last_name',
              message: "What is the employee's last name?",
            },
            {
              type: 'list',
              name: 'role_id',
              message: "What is the employee's role?",
              choices: roles.map((role) => {
                return {
                  name: role.title,
                  value: role.id,
                };
              }),
            },
            {
              type: 'list',
              name: 'manager_id',
              message: "Who is the employee's manager?",
              choices: [
                {name: 'None', value: 0},
                ...employees.map((employee) => {
                return {
                  name: employee.first_name + ' ' + employee.last_name,
                  value: employee.id,
                };
              })],
            },
          ]).then((answer) => {
            db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.first_name}', '${answer.last_name}', '${answer.role_id}', '${answer.manager_id}')`,
            (err, result) => {
                if (err) throw err;
                console.log(`Added ${answer.first_name} ${answer.last_name} to the database.`);
                askUser();
              });
            });
        });
    });
}

const addRole = (askUser) => {
    db.query('SELECT * FROM department', (err, departments) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of this role?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?',
            },
            {
                type: 'list',
                name: 'department_id',
                message: 'Which department does this role belong to?',
                choices: departments.map((department) => {
                    return {
                        name: department.name,
                        value: department.id,
                    }
                })
            },
        ])
        .then((answer) => {
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', '${answer.salary}', '${answer.department_id}')`,
            (err, result) => {
                if (err) throw err;
                console.log(`Added ${answer.title} role to the database`)
                askUser();
            });
        });
    });
}

// updateEmployeeRole

exports.viewAllEmployees = viewAllEmployees;
exports.viewAllDepartments = viewAllDepartments;
exports.viewAllRoles = viewAllRoles;
exports.addDepartment = addDepartment;
exports.addEmployee = addEmployee;
exports.addRole = addRole;