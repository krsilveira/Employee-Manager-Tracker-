# Employee Manager Tracker

## Description
This Project is an Employee Manager Tracker built using Javascript with an SQL backend. The application allows a manager to organizes the company's departments, roles, employees and managers, as well as viewing, selecting and deleting roles/positions/names. These are the highlighted proficiencies during the development process:
* MYSQL
* databases 
* MYSQL libary and CLI commands
* NODEjs
* modularization
* classes


## Installations

Users will need to install npm libraries. Then, create a .env file (with .gitignore). Include entries for the employee_db database as well filing in your own mysql username and password in the connection.js file. These are the set-up CLI Commands for project root directory:
> npm i<br>
> cd db<br>
> mysql -u root -p then, enter password<br>
> SOURCE schema.sql<br>
> SOURCE seeds.sql<br>
> exit<br>
> cd ..<br>
> clear<br>
> node index or node index.js<br>

## User Story
```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria
```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```


## Usage
Initialize program from the CLI in the project root directory with: 

>node index.js

[Video Demonstration Link Here](https://drive.google.com/file/d/1c0kemdwgUEmFhWBX-Ez9Nuy8HzOgFCeo/view)


## Review
The URL for the GitHub repository (https://github.com/krsilveira/Challenge-12-)