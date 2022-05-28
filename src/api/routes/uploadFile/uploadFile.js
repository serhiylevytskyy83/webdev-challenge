const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const path = require('path');

const uploadFile= async (req, res) => {
    const filePath = path.resolve(req.file.path)
    const tableName = `file${req.file.path.slice(13, req.file.path.length)}`

    const queryCreateTable = `
                  CREATE TABLE ${tableName}(
                    date TEXT NOT NULL, 
                    category TEXT NOT NULL, 
                    lot_title TEXT NOT NULL, 
                    lot_location TEXT NOT NULL, 
                    lot_condition TEXT NOT NULL, 
                    pre_tax_amount TEXT NOT NULL, 
                    tax_name TEXT NOT NULL, 
                    tax_amount TEXT NOT NULL
                  );
                  `
    const queryImportDataFile = `COPY ${tableName} FROM '${filePath}' DELIMITER ',' CSV HEADER;`
    const querySelectData = `SELECT date, category, pre_tax_amount, lot_condition FROM ${tableName};`
    
    const creteTable = await prisma.$queryRawUnsafe(queryCreateTable)
    const copyData = await prisma.$queryRawUnsafe(queryImportDataFile)
    
    const promise1 = await prisma.$queryRawUnsafe(querySelectData)
      promise1.sort(function(a, b) {
        return parseFloat(a.pre_tax_amount) - parseFloat(b.pre_tax_amount);
      });
    
    const promise2 = await prisma.$queryRawUnsafe(querySelectData)
      promise2.map((item) => {
        for(let key in item){
          if(key === "pre_tax_amount"){
          item[key]=parseFloat(item[key])
          return item
          }
        }
      }) 
    Promise.all([promise1, promise2]).then((data) =>{
      res.json( data )
    })
  }
  
module.exports = uploadFile;
  