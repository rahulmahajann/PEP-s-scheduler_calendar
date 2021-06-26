let nav = 0;
let mon = 0;
let clicked = null;
const monthButton = document.getElementById('monthbtn')
const calendar = document.getElementById("calendar");
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const main = document.querySelector(".flex");

const getweekdata = (day, month, year) => {
  const d = day <= 9 ? `0${day}` : `${day}`;
  const m = month <= 9 ? `0${month}` : `${month}`;
  const date = `${year}-${m}-${d}`;
  fetch(`/getWeek/${date}`, { method: "GET" }).then((res) => {
    res.json().then((result) => {
      const events = Array.from(result.results);

      events.forEach((event) => {
        const { teacher_name, batch_name, start_time, end_time, task , date } = event;
        const divBlock = document.createElement("div");
        divBlock.className = "flex-item temp";
        const Tname = document.createElement("div");
        Tname.className = "flex-sub-item";
        Tname.innerText = teacher_name;
        divBlock.appendChild(Tname);

        const Bname = document.createElement("div");
        Bname.className = "flex-sub-item";
        Bname.innerText = batch_name;
        divBlock.appendChild(Bname);

        const ST = document.createElement("div");
        ST.className = "flex-sub-item";
        ST.innerText = start_time;
        divBlock.appendChild(ST);

        const ET = document.createElement("div");
        ET.className = "flex-sub-item";
        ET.innerText = end_time;
        divBlock.appendChild(ET);

        const Task = document.createElement("div");
        Task.className = "flex-sub-item";
        Task.innerText = task;
        divBlock.appendChild(Task);

        const C_Date = document.createElement("div");
        C_Date.className = "flex-sub-item";
        C_Date.innerText = date;
        divBlock.appendChild(C_Date);


        main.appendChild(divBlock);
          });
    });
  });
};


const dt = new Date();
const month = dt.getMonth() + 1;
const year = dt.getFullYear();
// let day = ne
let daysInPrevMonth = new Date(year, month - 1, 0).getDate();
let daysInMonth = new Date(year, month, 0).getDate();
let monthsPassed = daysInMonth;
let monthsPass = 0;
function load() {
  const firstDayOfWeek = dt.getDate() - dt.getDay() + 7 * nav;
  calendar.innerHTML = "";
  for (let i = firstDayOfWeek; i <= firstDayOfWeek + 6; i++) {
    const daySquare = document.createElement("div");
    daySquare.classList.add("day");

    let num = i;
    daySquare.innerText = num;
    // console.log(`${i} -> ${monthsPass} `);
    calendar.appendChild(daySquare);
    const twoD = num <= 9 ? `0${num}` : `${num}`;
    const twoM = month <= 9 ? `0${month}` : `${month}`;
    daySquare.addEventListener("click", () => {
    window.location = `/${twoD}-${twoM}-${year}`;
    });
  }
  getweekdata(firstDayOfWeek,month,year)
}
load();



monthButton.addEventListener('click',()=>{
  window.location=`/`
  console.log('click hua?');
})



const displayEvents = (name, batch) => {
  fetch(`/getEvents/${name}/${batch}/${dateDisplay}`, {
    method: "Get",
  }).then((res) => {
    res.json().then((result) => {
      const events = Array.from(result.results);

      events.forEach((event) => {
        const { teacher_name, batch_name, start_time, end_time, task } = event;
        const divBlock = document.createElement("div");
        divBlock.className = "flex-item temp";
        const Tname = document.createElement("div");
        Tname.className = "flex-sub-item";
        Tname.innerText = teacher_name;
        divBlock.appendChild(Tname);

        const Bname = document.createElement("div");
        Bname.className = "flex-sub-item";
        Bname.innerText = batch_name;
        divBlock.appendChild(Bname);

        const ST = document.createElement("div");
        ST.className = "flex-sub-item";
        ST.innerText = start_time;
        divBlock.appendChild(ST);

        const ET = document.createElement("div");
        ET.className = "flex-sub-item";
        ET.innerText = end_time;
        divBlock.appendChild(ET);

        const Task = document.createElement("div");
        Task.className = "flex-sub-item";
        Task.innerText = task;
        divBlock.appendChild(Task);

        const C_Date = document.createElement("div");
        C_Date.className = "flex-sub-item";
        C_Date.innerText = date;
        divBlock.appendChild(C_Date);


        main.appendChild(divBlock);
          });
      });
    });
  }