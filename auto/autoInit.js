const fs = require('fs');
const path = require('path')
const dirList = fs.readdirSync('./models')
let arr = []
dirList.forEach(item=>{
    arr.push(item.replace('.js',''))
})
arr.forEach(item=>{
    let data = `
'use strict';
const path = require('path');
const model = require(path.resolve(__dirname,'../../auto/models/${item}'));
module.exports = app => {
  const ${item} = model(app.model, app.Sequelize);
  return ${item};
};
`
    fs.writeFileSync(path.resolve(__dirname,'../app/model',item +'.js'),data,'utf-8')
})