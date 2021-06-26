const express = require("express");
const app = express();

const connection = require("./database/db");
const pool = require("./database/db");

app.use(express.urlencoded());
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("a");
});

app.get("/week", (req, res) => {
  res.render("week");
});
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
app.post("/create", (req, res) => {
  const { teacher_name, batch_name, start_time, end_time, date, task } =
    req.body;
  const u_query = `select start_time, end_time from schedule where (teacher_name = '${teacher_name}' or batch_name = '${batch_name}') and date = '${date}'`;
  let array = [];
  pool.query(u_query, (err, result) => {
    for (let i = 0; i < result.length; i++) {
      array.push([result[i].start_time, result[i].end_time]);
    }
    let count = 0;
    for (let i = 0; i < array.length; i++) {
      if (start_time >= result[i].start_time) {
        max_start = start_time;
      } else {
        max_start = result[i].start_time;
      }
      if (end_time <= result[i].end_time) {
        min_end = end_time;
      } else {
        min_end = result[i].end_time;
      }
      if (max_start < min_end) {
        count = 0;
        break;
      } else {
        count = 1;
      }
    }
    if (count == 1 || array.length == 0) {
      console.log("han thik hai add krdo");
      const query = `INSERT INTO schedule Values (NULL,'${teacher_name}', '${batch_name}', '${start_time}', '${end_time}', '${date}', '${task}')`;
      pool.query(query, (err, result) => {
        if (err) throw err;
      });
      // res.redirect("/");
    } else {
      console.log("nhi bhai glt hogya");
      // alert('time change krdo')
    }
    res.redirect("/");
  });
});

app.post("/teacher", (req, res) => {
  const { faculty_name } = req.body;
  const s_query = `INSERT INTO teacher Values ('${faculty_name}')`;
  pool.query(s_query, (err, result) => {
    if (err) throw err;
  });
  res.redirect("/");
});

app.post("/batch", (req, res) => {
  const { batch_name } = req.body;
  const s_query = `INSERT INTO batch Values ('${batch_name}')`;
  pool.query(s_query, (err, result) => {
    if (err) throw err;
  });
  res.redirect("/");
});

app.get("/create", (req, res) => {
  res.send("haan");
});

app.post("/events", (req, res) => {
  const { day, month, year } = req.body;
  const twoDigitMonth = month <= 9 ? `0${month}` : `${month}`;
  const twoDigitDay = day <= 9 ? `0${day}` : `${day}`;
  const date = `${year}-${twoDigitMonth}-${twoDigitDay}`;
  const query = `SELECT COUNT(*) as S FROM schedule WHERE date = '${date}';`;
  pool.query(query, (err, results) => {
    if (err) throw err;
    res.json({
      cnt: JSON.stringify(results[0]["S"]),
    });
  });
});

app.get("/available_teacher", (req, res) => {
  const query = "SELECT * FROM teacher";
  pool.query(query, (err, results) => {
    if (err) throw err;
    let teacherArray = [];
    for (let i = 0; i < results.length; i++) {
      teacherArray.push(results[i].teacher_name);
    }
    res.send(teacherArray);
  });
  // res.end();
});
app.get("/available_batch", (req, res) => {
  const query = "SELECT * FROM batch";
  pool.query(query, (err, results) => {
    if (err) throw err;
    let batchArray = [];
    for (let i = 0; i < results.length; i++) {
      batchArray.push(results[i].batch_name);
    }
    res.send(batchArray);
  });
  // res.end();
});

app.get("/getEvents/:date", (req, res) => {
  // const { d: date } = req.body;
  const date = req.params.date;
  // console.log(d);
  // console.log(date);
  const query = `SELECT teacher_name,batch_name,start_time,end_time,task  FROM schedule WHERE date = '${date}'`;
  // console.log(date);
  pool.query(query, (err, results) => {
    if (err) throw err;
    // console.log(results);
    res.json({ results });
  });
  // res.end();
});

app.post("/deleteEvent", (req, res) => {
  const { teacher_name, start_time, end_time, task } = req.body;

  const query = `DELETE FROM schedule WHERE teacher_name = '${teacher_name}' AND start_time = '${start_time}' AND end_time = '${end_time}' AND task = '${task}';`;
  pool.query(query, (err, results) => {
    if (err) throw err;
    // console.log(results);
  });
  res.end();
});

app.get("/:date", (req, res) => {
  const dateArray = req.params.date.split("-");
  myDate = req.params.date;
  res.render("day", {
    day: dateArray[0],
    month: monthName[+dateArray[1] - 1],
    year: dateArray[2],
    monthNum: dateArray[1],
  });
});

app.post("/update/:date", (req, res) => {
  const date = req.params.date;
  const { prevData, newData } = req.body;
;
  const query = `SELECT id FROM schedule WHERE teacher_name = '${prevData.pTname}' AND batch_name = '${prevData.pBname}' AND start_time = '${prevData.pST}' AND end_time = '${prevData.pET}' AND task = '${prevData.pTask}' AND date = '${date}';`;
  pool.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    const id = result[0].id;
    if (newData.nTname.length > 0) {
      const q = `UPDATE schedule SET teacher_name = '${newData.nTname}' WHERE id = ${id};`;
      pool.query(q, (err) => {
        if (err) throw err;
      });
    }
    if (newData.nBname.length > 0) {
      const q = `UPDATE schedule SET batch_name = '${newData.nBname}' WHERE id = ${id};`;
      pool.query(q, (err) => {
        if (err) throw err;
      });
    }
    if (newData.nST.length > 0) {
      const q = `UPDATE schedule SET start_time = '${newData.nST}' WHERE id = ${id};`;
      pool.query(q, (err) => {
        if (err) throw err;
      });
    }
    if (newData.nET.length > 0) {
      const q = `UPDATE schedule SET end_time = '${newData.nET}' WHERE id = ${id};`;
      pool.query(q, (err) => {
        if (err) throw err;
      });
    }
    if (newData.nTask.length > 0) {
      const q = `UPDATE schedule SET task = '${newData.nTask}' WHERE id = ${id};`;
      pool.query(q, (err) => {
        if (err) throw err;
      });
    }
    res.end();
  });
});


app.get("/getWeek/:date", (req, res) => {
  const date = req.params.date;
  const dateArray = date.split("-");
  let [year, month, day] = dateArray;

  const end = new Date(+year, +month, 0).getDate();
  month = +month;
  year = +year;
  day = +day + 6;
  if (day > end) {
    month += 1;
    if (month % 12 == 1) year += 1;
    day += +6 - end;
  }
  const twoDigitMonth = month <= 9 ? `0${month}` : `${month}`;
  const twoDigitDay = day <= 9 ? `0${day}` : `${day}`;
  endDate = `${year}-${twoDigitMonth}-${twoDigitDay}`;

  console.log(date, endDate);

  const query = `SELECT * FROM schedule WHERE date BETWEEN '${date}' AND '${endDate}';`;

  pool.query(query, (err, results) => {
    if (err) throw err;
    res.json({ results });
  });
});

app.listen(3000);
