const express = require('express');
const app = express();
const XLSX = require('xlsx');
const port = process.env.PORT || 5000;
var file = XLSX.readFile("./data.xlsx");
const path = require("path");

app.get('/getdata', (req,res)=>{
    const sheets = file.SheetNames;
    const data = [];
    for ( let i=0; i < sheets.length; i++){
        const sheetname = sheets[i];
        const sheetData = XLSX.utils.sheet_to_json(file.Sheets[sheetname]);
        sheetData.forEach((e)=>{
            data.push(e);
        });
    }
    res.status(200).json({
        status : 'Success',
        data : {
            data
        }
    });
})

app.use(express.static(path.join(__dirname, "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, ()=>{
    console.log("Listening on port", port);
})
