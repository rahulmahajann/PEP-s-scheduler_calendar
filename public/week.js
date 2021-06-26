let nav = 0;
let mon = 0;
let clicked = null;
const monthButton = document.getElementById('monthbtn')
const calendar = document.getElementById("calendar");
const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];


const getweekdata = (day, month, year) => {
  const d = day <= 9 ? `0${day}` : `${day}`;
  const m = month <= 9 ? `0${month}` : `${month}`;
  const date = `${year}-${m}-${d}`;
  fetch(`/getWeek/${date}`, { method: "GET" }).then((res) => {
    res.json().then((result) => {
      console.log(result);
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