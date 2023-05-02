const inquirer = require('inquirer');
const mysql = require('mysql2');
const modules = require('./utils/modules');

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
// const askUser = () => {


// inquirer.prompt([
//     {
//       type: 'list',
//       name: 'action',
//       message: 'What would you like to do?',
//       choices: [
//         'View all employees',
//         'View all departments',
//         'View all roles',
//         'Add an employee',
//         'Add a department',
//         'Add a role',
//         'Update an employee role'
//       ]
//     }
// ])
// .then((answer) => {

//   switch (answer.action) {
//     case 'View all employees':
//       modules.viewAllEmployees();
//       askUser();
//       break;
//     case 'View all departments':
//       modules.viewAllDepartments();
//       askUser();
//       break;
//     case 'View all roles':
//       modules.viewAllRoles();
//       askUser();
//       break;
//     case 'Add a department':
//       modules.addDepartment();
//       askUser();
//       break;
//     case 'Add an employee':
//       modules.addEmployee();
//       askUser();
//       break;
//     case 'Add a role':
//       modules.addRole();
//       askUser();
//       break;
//     case 'Update an employee role':
//       updateEmployeeRole();
//       askUser();
//       break;
//     default:
//       console.log('Invalid choice');
//     }
//   });
// }

// askUser();

inquirer.prompt([
  {
    type: 'list',
    name: 'action',
    message: 'What would you like to do?',
    choices: [
      'View all employees',
      'View all departments',
      'View all roles',
      'Add an employee',
      'Add a department',
      'Add a role',
      'Update an employee role'
    ]
  }
])
.then((answer) => {

switch (answer.action) {
  case 'View all employees':
    modules.viewAllEmployees();
    break;
  case 'View all departments':
    modules.viewAllDepartments();
    break;
  case 'View all roles':
    modules.viewAllRoles();
    break;
  case 'Add a department':
    modules.addDepartment();
    break;
  case 'Add an employee':
    modules.addEmployee();
    break;
  case 'Add a role':
    modules.addRole();
    break;
  case 'Update an employee role':
    updateEmployeeRole();
    break;
  default:
    console.log('Invalid choice');
  }
});
