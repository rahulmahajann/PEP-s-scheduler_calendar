const mysql = require("mysql");

// const connection = mys
// connection.connect(() => {
//   console.log("connected!!!");
// });

// module.exports = connection;


const connection=mysql.createPool({
  host: "bs2krq3wttjzlmzfknik-mysql.services.clever-cloud.com",
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  
})

// pool.query('select 1+1',(err,rows)=>{/* */})

module.exports = connection