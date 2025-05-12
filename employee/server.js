const express = require('express');
const app = express();
const csvToJson = require('convert-csv-to-json');
const insertEmp = require('./controller/insertone');
const queryEmp = require('./controller/query');
const updateEmp = require('./controller/update');

app.listen(8181);
app.set('view engine', 'ejs');
app.use(express.static('../public'));
app.use((req, res, next) => {
    json = csvToJson.fieldDelimiter(',').getJsonFromCsv("./file/employee.csv");
    next();
});

app.get('/employee', queryEmp.index);
app.get('/employee/getall', queryEmp.getall);
app.get('/employee/getone/:empno', queryEmp.queryone);
app.get('/employee/queryEmp', queryEmp.queryEmp);
app.get('/employee/deleteone', queryEmp.deleteOne);
app.get('/employee/insertone', insertEmp.insertOne);
app.get('/employee/updateEmp', updateEmp.updateTemp);
app.get('/employee/updateOne', updateEmp.updateOne);