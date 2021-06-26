const mysql = require("mysql");

// const connection = mysql.createConnection({
//   host: "bs2krq3wttjzlmzfknik-mysql.services.clever-cloud.com",
//   user: "urjrbilayxxurnff",
//   password: "Q2MJVMArfWREWbzquMys",
//   database: "bs2krq3wttjzlmzfknik",
// });

// connection.connect(() => {
//   console.log("connected!!!");
// });

// module.exports = connection;


const connection=mysql.createPool({
  host: "bs2krq3wttjzlmzfknik-mysql.services.clever-cloud.com",
  user: "urjrbilayxxurnff",
  password: "Q2MJVMArfWREWbzquMys",
  database: "bs2krq3wttjzlmzfknik",

})

// pool.query('select 1+1',(err,rows)=>{/* */})

module.exports = connection