const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
let nums = false;
let notFound = false;
let isDel = false;

exports.index = (req, res) => {
    notFound = false;
    res.render('index', {notFound: false});
};

exports.getall = (req, res) => {
    nums = true;
    res.render('queryall', { emps: json, nums: true, isDel: false });
};

exports.queryone =  (req, res) => {
    let empno = req.params.empno;
    for(let i = 0; i < json.length; i++){
        if(json[i].empno == empno){
            emp = json[i];
            break;
        }
    }
    res.render('queryall', { emp: emp, nums: false, isDel: false });
};

exports.queryEmp =  (req, res) => {
    let name = req.query.name;
    let jsonQue = [];
    let j = 0;
    let find = false;
    getNum = 0;
    for(let i = 0; i < json.length; i++){
        if(json[i].ename.substr(0, name.length) == name){
            jsonQue[j] = json[i];
            j += 1;
            find = true;
        }
    }
    if(find == false){
        notFound = true;
        res.render('index', {notFound: true});
    }
    else{
        nums = true;
        res.render('queryall', { emps: jsonQue, nums: true, isDel: false });
    }
};

exports.deleteOne = (req, res) => {
    let isDel = false;
    let empno = req.query.empno;
    let data = "empno,ename,hiredate,salary,deptno,title\n";
    let emp;
    for(let i = 0; i < json.length; i++){
        if(json[i].empno == empno){
            emp = json[i];
        }
        else{
            data += `${json[i].empno},${json[i].ename},${json[i].hiredate},${json[i].salary},${json[i].deptno},${json[i].title}\n`;
        }
    }
    fs.writeFile('./file/employee.csv', data, (err) => {
        if(err) throw err;
        csvToJson.fieldDelimiter(',').generateJsonFileFromCsv("./file/employee.csv", "./file/employee.json");
        json = csvToJson.fieldDelimiter(',').getJsonFromCsv("./file/employee.csv");
        isDel = true;
        res.render('queryall', { emps: json, emp: emp, nums: true, isDel: true });
    });
};