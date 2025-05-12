const csvToJson = require('convert-csv-to-json');
const fs = require('fs');
const readline = require('readline');
let isUpdate = false;

exports.updateTemp = (req, res) => {
    let empno = req.query.empno;
    for(let i = 0; i < json.length; i++){
        if(json[i].empno == empno){
            emp = json[i];
            break;
        }
    }
    res.render('updateEmp', { emp: emp, isUpdate: false });
};

exports.updateOne =  (req, res) => {
    let que = req.query;
    let updata = `${que.empno},${que.ename},${que.hiredate},${que.salary},${que.deptno},${que.title}\n`
    let data = "";
    let emp;
    if(que){
        let inputStream = fs.createReadStream('./file/employee.csv');
        let lineReader = readline.createInterface({ input: inputStream});
        lineReader.on('line', line => {
            if(line.substr(0, 4) == que.empno){
                data += updata;
            }
            else{
                data += `${line}\n`;
            }
        });

        lineReader.on('close', () => {
            fs.writeFile('./file/employee.csv', data, (err) => {
                if(err) throw err;
                csvToJson.fieldDelimiter(',').generateJsonFileFromCsv("./file/employee.csv", "./file/employee.json");
                json = csvToJson.fieldDelimiter(',').getJsonFromCsv("./file/employee.csv");
                for(let i = 0; i < json.length; i++){
                    if(json[i].empno == que.empno){
                        emp = json[i];
                        break;
                    }
                }
                isUpdate = true;
                res.render('updateEmp', { emp: emp, isUpdate: true });
            });
            
        });
    }
    else{
        res.render('updateEmp', { isUpdate: false });
    }
};