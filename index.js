// console.log("Welcome to JS");
// var x=10;
// function fun{
//    var y=20;
//    console.log(x+y);
// }

// let {add,sub,mul,div} = require('./math');  
// console.log(add(5,10));
// console.log(sub(5,10));
// console.log(mul(5,10));
// console.log(div(5,10));

// let http = require('http');
// let server = http.createServer((req,res)=>{
//    // res.writeHead(200,{'Content-Type':'text/plain'});
//    // res.end('Hello World\n');
//     if(req.url==='/'){
//       res.end("Hello from server");
//     }else if(req.url==='/about'){
//       res.end("About us page");
//     }else if(req.url==='/contact'){
//       res.end("Contact us page");
//     }
// });
// server.listen("8000", ()=>{
//    console.log('Server is running at http://localhost:8000');//url
// });
// let express = require('express');
// let app = express();

// app.get('/', (req, res) => {
//    res.send("Hello from Express Server");
//   });

//    app.get('/home', (req, res) => {
//    res.send("Home Page");
// });

//   app.get('/about', (req, res) => {
//    res.send("About Page");
// });

// app.get('/contact', (req, res) => {
//    res.send("Contact Page");
// });

// app.get('/help', (req, res) => {
//    res.send("Help Page");
// });


// app.get('/services', (req, res) => {
//    res.send("Services Page");
// });

// app.listen("8000", () => {
//    console.log('Express Server is running at http://localhost:8000');
// });

// let express = require('express');
// let app = express();
// app.use(express.json());
//  require('dotenv').config();              
// app.get("/student", function (req, res) {
//    res.send("Hello Students");
// });
// app.listen(process.env.PORT ,function(){
//    console.log(`Server is running at ${process.env.PORT}`) ;
// });
// // app.post("/student-insert",  (req, res) => {
// //   let {NAME, RollNo}=req.body;
// //   res.send(`Student ${NAME} with Roll Number ${RollNo} inserted successfully`);
// //     //console.log(req.body);
// // });
// // app.post("/Employee-insert",  (req, res) => {
// //   let {emp_Name, emp_id, emp_Salary}=req.body;
// //   res.send(`Employee ${emp_Name} with ID Number ${emp_id}  and Salary ${emp_Salary} inserted successfully`);
// //     //console.log(req.body);
// // });

// app.post("/student-insert",  (req, res) => {
//   let {Name, RollNo}=req.query;
//   res.send(`Student ${Name} with Roll Number ${RollNo} inserted successfully`);
//     //console.log(req.body);
// });

// app.post("/product/:id",  (req, res) => {
//   let productId = req.params.id;
//   res.send(`Product with ID ${productId} inserted successfully`);
//     //console.log(req.body);

// });



// const express = require("express");
// const app = express();

// let checkUsername=(req,res,next)=>{
//   //console.log("Middleware executed");
//   // if(req.query.password !=="12345"){
//   //   return res.send("Unauthorized Access");
//   // }
//   if(req.query.username !=="Rayyan" ){
//     return res.send("Unauthorized User");
//   }

//   next();
// };

// let checkPass=(req,res,next)=>{
 
//   if(req.query.password !=="12345" ){
//     return res.send("Unauthorized password");
//   }

//   next();
// };
// //app.use(checkPass);

// app.get("/student",checkUsername, checkPass, (req, res) => {
//   res.send("Student Dashboard....");
//   // res.send({
//   //   name: "John Doe",
//   //   rollNo: 12345
//   // });
// })
// app.get("/teacher", (req, res) => { 
//   res.send("Teacher Dashboard....");
// })
// app.listen(8000,()=>{
//   console.log("Server is running on port 8000");
// })



let express = require('express');
let mongoose = require('mongoose');
let student = require('./studentmodel');
require('dotenv').config();
let app = express();
app.use(express.json());

mongoose.connect(process.env.DBURL).then(()=>{
   console.log("Connected to MongoDB");
}).catch((err)=>{
   console.log("Error connecting to MongoDB", err);
});

app.listen(8000, () => {
    console.log('Server is running at http://localhost:8000');
});

app.post('/student', async (req, res) => {
  let newStudent = new student({
    name: req.body.name,
    rollNo: req.body.rollNo
  });

newStudent.save().then((data) => {
  res.status(201).json(data);
}).catch((err) => {
  res.status(500).json({ error: 'Failed to create student' });
});
});

app.get('/student-select', (req, res) => {
  student.find().then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(500).json({ error: 'Failed to fetch students' });
  });
});

app.put('/student-update/:id', (req, res) => {
  student.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    rollNo: req.body.rollNo
  }, { new: true }).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(400).json({ error: 'Failed to update student' });
  });
});

app.delete('/student-delete/:id', (req, res) => {
  let id = req.params.id;
  student.findByIdAndDelete(id).then(() => {
    res.status(200).json({ message: 'Student deleted successfully' });  
  }).catch((err) => {
    res.status(400).json({ error: 'Failed to delete student' });
  });
});