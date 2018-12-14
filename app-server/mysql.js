

//引入数据库
var mysql=require('mysql');

//实现本地链接
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'mysql_001'
})

//曝光
module.exports=conn