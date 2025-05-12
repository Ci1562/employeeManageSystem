const csvToJson = require('convert-csv-to-json');
const fs = require('fs');

exports.insertOne = (req, res) => {
    let reqQue = req.query;
    //沒有輸入資料
    if (Object.keys(reqQue).length === 0) {
        return res.render('insertEmp', { emp: null, isInsert: false }); 
    }

    let no = 1001+json.length;
    let isInsert = false;
    //編號是否重複
    for(let i = 0; i < json.length; i++){
        if(json[i].empno == no){
            no += 1;
        }
    }

    let insertone = `${no},${reqQue.ename},${reqQue.hiredate},${reqQue.salary},${reqQue.deptno},${reqQue.title}\n`;
    fs.appendFile('./file/employee.csv', insertone, (err) => {
        if(err) throw err;
        csvToJson.fieldDelimiter(',').generateJsonFileFromCsv("./file/employee.csv", "./file/employee.json");
        json = csvToJson.fieldDelimiter(',').getJsonFromCsv("./file/employee.csv");
        
        for(let i = 0; i < json.length; i++){
            if(json[i].empno == no){
                emp = json[i];
                break;
            }
        }
        isInsert = true;
        res.render('insertEmp', { emp: emp, isInsert: true });
    });   
};