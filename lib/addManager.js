const QueryManager = require('./queryManager.js');

class AddManager extends QueryManager {
  constructor(queryType) {
    super(queryType);
  }


  // Question objects is being based on the Users selection with inquirer in index file

  toPrompt() {
    let questions = [];
    const queryIncludes = this.queryType;
    if(queryIncludes.includes("department")){
      questions = 
      [{
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?',
        validate: entry => {
          if (!entry) {
            console.log("Please enter a value");
            return false;
          } else {
            return true;
          }
        }
      }];
    } else if (queryIncludes.includes("role")) {
      questions = 
      [{
        type: 'input',
        name: 'title',
        message: 'What is the name of the role?',
        validate: entry => {
          if (!entry) {
            console.log("Please enter a value");
            return false;
          } else {
            return true;
          }
        }
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?',
        validate: entry => {
          if (!entry) {
            console.log("Please enter a value");
            return false;
          } else {
            return true;
          }
        }
      }];
    } else if (queryIncludes.includes("employee")) {
       questions = 
        [{
        type: 'input',
        name: 'first_name',
        message: 'What is the employee\'s first name?',
        validate: entry => {
          if (!entry) {
            console.log("Please enter a value");
            return false;
          } else {
            return true;
          }
        }
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What is the employee\'s last name?',
        validate: entry => {
          if (!entry) {
            console.log("Please enter a value");
            return false;
          } else {
            return true;
          }
        }
      }];
      
    } else{
      console.log("error");
    }
    return (questions); 
  }
// function is added to db string


  // return query string to add db

  toQuery() {
    let queryString;
    const queryIncludes = this.queryType;
    if(queryIncludes.includes("department")){
      queryString = "";
    } else if (queryIncludes.includes("role")) { 
      queryString = "SELECT name FROM department";
    } else if (queryIncludes.includes("employee")) {
      queryString = "SELECT title FROM role";
    } else{
      console.error("error");
    }
    // console.log(`queryString is: ${queryString}`);
    return (queryString); // return complete add to db string
  }
}




module.exports = AddManager;