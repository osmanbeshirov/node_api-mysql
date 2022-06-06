

const mysql = require('mysql');
const fs = require('fs');

const {query} = require('express');


const connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "admin",
    database: "bootcamp",
  });
  
  connection.connect((err) => {
    if (!err) {
      console.log("SUCCESS");
    }
  }); 

  fs.readFile('tasks.json', 'utf8', (err,data) => {
      if(data) {
          console.log(JSON.parse(data));

          const parsed = JSON.parse(data);

          parsed.map(elem => {
              connection.query('INSERT INTO tasks_for_students(Task_description, Due_date,Employee,Finished_date) VALUES(?,?,?,?)', 
              [elem.description, elem.due, elem.employee, elem.finished], function(err,result){
                  if(data){
                      return console.log(result)
                  }
              })
            
          })
      }
  })