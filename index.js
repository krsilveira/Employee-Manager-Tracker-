
// packages for Application Usage


const logo = require('asciiart-logo');
const config = require('./package.json');
const inquirer = require('inquirer');
const db = require('./lib/connection.js');
const ViewManager = require('./lib/viewManager');
const AddManager = require('./lib/addManager');
require('console.table');


// function to allow choices to the main menu

const mainMenuObject = {
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles', 'View All Employees',
        'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 
        'Update an Employee Manager']
};


//  SQL Query and updates entries inside the DATABASE

function promptUserUpdate (queryType, questions, employeeArray, toSearchArray) {

    // start new questions

    inquirer.prompt(questions).then(async (answers) => {
        let queryString = `UPDATE employee `;
        // console.log(`We're going to ADD to ${queryType}`);
        // console.log(answers);
        let employee_id = 1 + (employeeArray.indexOf(answers.employee));
        switch(queryType){
            case "role":
                let role_id = 1 + (toSearchArray.indexOf(answers.role));
                queryString += `SET role_id = ${role_id}
                WHERE id = ${employee_id};`;
                break;
            case "manager":
                let manager_id = 1 + (toSearchArray.indexOf(answers.manager));
                queryString += `SET manager_id = ${manager_id}
                WHERE id = ${employee_id};`;
                break;
            default: 
                console.error("error in promptUserUpdate switch");
        }
        // console.log(`sql query:\n${queryString}`);
        db.query(queryString, function (err, results) {
            if(err) throw err;
            // console.log(results);
            console.log(`Updated employee's role.`);
            mainMenu();
        });
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("\nYour console environment is not supported!");
        } else {
            console.log(error);
        }
    });
}


// SQL Query and entries added to DATABASE

function promptUserAdd (queryType, questions, toSearchArray, managerArray) {

    // Start Add Questions

    inquirer.prompt(questions).then(async (answers) => {
        let successString = "";
        let queryString = `INSERT INTO ${queryType} `;
        // console.log(`We're going to ADD to ${queryType}`);
        // console.log(answers);
        switch(queryType){
            case "department":
                queryString += `(name) 
                VALUES ("${answers.name}");`;
                successString = answers.name;
                break;
            case "role":
                let department_id = 1 + (toSearchArray.indexOf(answers.department));
                //department_id needs to be sent instead of department name
                queryString += `(title, salary, department_id) 
                VALUES ("${answers.title}", ${answers.salary}, ${department_id});`;
                successString = answers.title;
                break;
            case "employee":
                let role_id = 1 + (toSearchArray.indexOf(answers.role));
                let manager_id = 1 + (managerArray.indexOf(answers.manager));
                //role_id and manager_id need to be sent instead of string equivalents
                queryString += `(first_name, last_name, role_id, manager_id) 
                VALUES ("${answers.first_name}", "${answers.last_name}", ${role_id}, ${manager_id});`;
                successString = `${answers.first_name} ${answers.last_name}`;
                break;
            default: 
                console.error("error in promptUserAdd switch");
        }
        // console.log(`sql query:\n${queryString}`);
        db.query(queryString, function (err, results) {
            if(err) throw err;
            // console.log(results);
            console.log(`Added ${successString} to the database.`);
            mainMenu();
        });

    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("\nYour console environment is not supported!");
        } else {
            console.log(error);
        }
    });
}



// users helper functions is created
// SQL Queries classes are created, to then view and modify db


function queryDB (answer) {
    let {choice} = answer;
    choice = choice.toLowerCase(); 
    let queryString = "";

    // User view
    if (choice.includes("view")){
        const newViewQuery = new ViewManager(choice);
        queryString = newViewQuery.toQuery();
        // console.log(`queryString is ${queryString}`);
   
        //  Add to db 
    } else if (choice.includes("add")) {
        // console.log("\nwe're going to Add with XX");
        const newAddQuery = new AddManager(choice);
        let addQuestions = newAddQuery.toPrompt()
        const addQuery = newAddQuery.toQuery();
        if(addQuery !== ""){
            let optionsArray = [];
            let addQueryList = {};
            db.query(addQuery, function (err, results) {
                if(err) throw err;

                //  Add a role 
                if (choice.includes("role")){
                    results.forEach(department => optionsArray.push(department.name));
                    // console.log(optionsArray);
                    addQueryList = {
                    type: 'list', 
                    name: 'department', 
                    message: 'Which department does the role belong to?', 
                    choices: optionsArray};
                    addQuestions.unshift(addQueryList);
                    // console.log(addQuestions);
                    promptUserAdd("role", addQuestions, optionsArray); 

                // Add an employee
                } else if (choice.includes("employee")){
                    results.forEach(role => optionsArray.push(role.title));

                    // Add employee role list
                    addQueryList = {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employee\'s role?',
                        choices: optionsArray};
                    addQuestions.push(addQueryList);


                    // Add the employee manager list

                    db.query('SELECT first_name, last_name FROM employee', function (err, managers) {
                        let managersArray = [];
                        if(err) throw err;
                        managers.forEach(manager => managersArray.push(`${manager.first_name} ${manager.last_name}`));
                        // console.log(managersArray);
                        let addQueryList2 = {
                            type: 'list',
                            name: 'manager',
                            message: 'Who is the employee\'s manager?',
                            choices: managersArray};
                            // console.log(addQueryList2);
                        addQuestions.push(addQueryList2);
                        // console.log(addQuestions);
                        promptUserAdd("employee", addQuestions, optionsArray, managersArray); 
                    });

                } else {
                    console.error("error");
                }
     
            });


         //  Add Department
        } else {
            promptUserAdd("department", addQuestions); 
        }
    // Update DATABASE
    } else if (choice.includes("update")) {
        // console.log("\nwe're going to Update with XX");

           // SELECT employee for script to update
        let updateQuestions = [];
        db.query('SELECT first_name, last_name FROM employee', function (err, employees) {
            let employeeArray = [];
            if(err) throw err;
            employees.forEach(employee => employeeArray.push(`${employee.first_name} ${employee.last_name}`));
            // console.log(employeeArray);
            let updateQueryList = {
                type: 'list',
                name: 'employee',
                message: 'Which employee\'s role do you want to update?',
                choices: employeeArray};
            updateQuestions.push(updateQueryList);



            // console.log(updateQuestions);
            //  Update an employees role 

            if (choice.includes("role")) {
                db.query('SELECT title FROM role', function (err, roles) {
                    let roleArray = [];
                    if(err) throw err;
                    roles.forEach(role => roleArray.push(role.title));
                    let updateQueryList2 = {
                        type: 'list',
                        name: 'role',
                        message: 'Which role do you want to assign the selected employee?',
                        choices: roleArray};
                    updateQuestions.push(updateQueryList2);
                    promptUserUpdate("role", updateQuestions, employeeArray, roleArray);
                });


            // Employees manager 

            } else if (choice.includes("manager")) {
                let updateQueryList2 = {
                    type: 'list',
                    name: 'manager',
                    message: 'Which manager do you want to assign to the selected employee?',
                    choices: employeeArray};
                updateQuestions.push(updateQueryList2);
                promptUserUpdate("manager", updateQuestions, employeeArray, employeeArray);
            }
            else {
                console.error("Option Not Found");
            }
        });
    } else {
        console.log("\nGoodbye.");
        return;
    }

    // Query DATABASE
    // console.log(`\n${queryString}`); // check query string

    if(queryString !== ""){
        db.query(queryString, function (err, results) {
            if(err) throw err;
            // console.clear();
            console.log("\n");
            console.table(results);
            mainMenu();
        });
    }
}


//  Display mainMenu

function mainMenu () {

    // Start prompt

    inquirer.prompt(mainMenuObject).then( (answers) => {
        queryDB(answers);
    })
    .catch((error) => {
        if (error.isTtyError) {
            console.log("\nYour console environment is not supported!");
        } else {
            console.log(error);
        }
    });
}

//  Display out ascii logo then mainMenu
async function init() {
    console.log(logo(config).render());
    await mainMenu();
}


// App Initialization

init();