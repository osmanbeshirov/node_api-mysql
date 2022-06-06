// console.log("Hello Workd")
// const dayjs = require("dayjs");
// // console.log(dayjs().toString())
// console.log(new Date().toLocaleDateString())

const express = require("express");
const { send } = require("express/lib/response");
const mysql = require("mysql");

const app = express();

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

app.get("/mysql", (req, res) => {
  connection.query("SELECT * FROM new_user", (err, data) => {
    if (!err) {
      return res.json(data);
    }
    res.json(err);
  });
});

app.get("/tasks", (req, res) => {
  connection.query("SELECT * FROM tasks_for_students", (err, data) => {
    if (!err) {
      return res.json(data);
    }
    res.json(err);
  });
});

app.get("/tasks/:id", (req, res) => {
  connection.query(
    "SELECT Task_description FROM tasks_for_students WHERE id = " +
      req.params.id,
    (err, data) => {
      if (!err) {
        return res.json(data);
      }
      res.json(err);
    }
  );
});

app.post("/add", (req, res) => {
  const name  = req.body.name;
  const password = req.body.password;

  console.log([name, password])

  // const { name, password } = req.body;
  if (name && password) {
    connection.query("INSERT INTO new_user(name, password) VALUES(?,?)",
    [ name, password ], function(err,data){
      if(err) res.send(err)
      res.send(data)
    } );
  }

  res.send("Data cant be checked");
});


app.get("/", function (request, response) {
  response.send("Server is active");
});

app.get("/about", function (request, response) {
  response.send("It is an about page");
});

app.listen(3000, function () {
  console.log("Server issss on localhost: 3000");
});
