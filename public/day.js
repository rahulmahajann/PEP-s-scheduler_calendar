const dayButton = document.querySelector("#dayButton");
const dateDisplay = document.querySelector(".hidden").innerText;
const dt = new Date();
const day = dt.getDate();
const month = dt.getMonth();
const year = dt.getFullYear();
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
// dateDisplay.innerText = `${day} ${monthName[month]}, ${year}`;

const twoDigitDay = day <= 9 ? `0${day}` : `${day}`;
const twoDigitMonth = month + 1 <= 9 ? `0${month + 1}` : `${month + 1}`;
const date = { d: `${year}-${twoDigitMonth}-${twoDigitDay}` };

const main = document.querySelector(".flex");
const btn = document.querySelector("#btn");
// console.log(Array.from(main).length);
const dropDown = document.querySelector("#teachers");

const dragAndDrop = (element, event, events) => {
  element.addEventListener("dragend", () => {
    element.className = "flex-item";
    // main.appendChild(element);
  });

  const deleteButton = document.querySelector(".dragDel");

  deleteButton.addEventListener("dragover", (e) => {
    e.preventDefault();
  });
  deleteButton.addEventListener("dragenter", (e) => {
    e.preventDefault();
    deleteButton.className = "fas fa-trash cursor hovered";
  });
  deleteButton.addEventListener("dragleave", (e) => {
    e.preventDefault();
    deleteButton.className = "fas fa-trash cursor dragDel";
  });
  deleteButton.addEventListener("drop", () => {
    deleteData(event, element, events);
    deleteButton.className = "fas fa-trash cursor dragDel";
  });
};
const displayEvents = (date) => {
  const options = {
    method: "Get",
  };

  fetch(`/getEvents/${dateDisplay}`, options).then((res) => {
    res.json().then((result) => {
      const events = Array.from(result.results);

      events.forEach((event) => {
        const { teacher_name, batch_name, start_time, end_time, task } = event;
        const divBlock = document.createElement("div");
        divBlock.className = "flex-item";
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

        const delD = document.createElement("div");
        const del = document.createElement("i");
        delD.className = "flex-sub-item";
        del.className = "fas fa-trash cursor";
        delD.appendChild(del);
        divBlock.appendChild(delD);

        const editD = document.createElement("div");
        const edit = document.createElement("i");
        editD.className = "flex-sub-item";
        edit.className = "fas fa-edit cursor";
        editD.appendChild(edit);

        divBlock.appendChild(editD);

        main.appendChild(divBlock);

        const modalBtn = document.querySelector(".modal-btn");
        const modalBg = document.querySelector(".modal-bg");
        const modalClose = document.querySelector(".modal-close");

        edit.addEventListener("click", () => {
          modalBg.classList.add("bg-active");

          updateBtn.addEventListener("click", () => {
            modalBg.classList.remove("bg-active");

            const prevData = {
              pTname: teacher_name,
              pBname: batch_name,
              pST: start_time,
              pET: end_time,
              pTask: task,
            };

            const nTname = document.querySelector("#newTName").value;
            const nBname = document.querySelector("#newBName").value;
            const nST = document.querySelector("#newST").value;
            const nET = document.querySelector("#newET").value;
            const nTask = document.querySelector("#newTask").value;
            if (nTname.length > 0) Tname.innerText = nTname;
            if (nBname.length > 0) Bname.innerText = nBname;
            if (nST.length > 0) ST.innerText = nST;
            if (nET.length > 0) ET.innerText = nET;
            if (nTask.length > 0) Task.innerText = nTask;
            const newData = {
              nTname,
              nBname,
              nST,
              nET,
              nTask,
            };
            updateData(prevData, newData);
          });
        });

        modalClose.addEventListener("click", () => {
          modalBg.classList.remove("bg-active");
        });

        del.addEventListener("click", () => {
          deleteData(event, divBlock, events);
        });
        divBlock.setAttribute("draggable", "true");
        divBlock.addEventListener("dragstart", () => {
          setTimeout(() => {
            divBlock.className += " hide";
          }, 10);
          dragAndDrop(divBlock, event, events);
          console.log("dragstart");
        });
      });
    });
  });
};
displayEvents(dateDisplay);

const deleteData = (event, divBlock, events) => {
  main.removeChild(divBlock);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event),
  };

  fetch("/deleteEvent", options);
};

const updateBtn = document.querySelector("#updateBtn");

const updateData = (prevData, newData) => {

  console.log(newData);
  const data = {
    prevData,
    newData,
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

};



const weekButton = document.querySelector('#weekButton')
const monthButton = document.querySelector('#monthButton')

weekButton.addEventListener("click", () => {
  window.location = `/week`;
});
monthButton.addEventListener("click", () => {
  window.location = `/`;
});

const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = document.querySelector(button.dataset.modalTarget);
    openModal(modal);
  });
});

overlay.addEventListener("click", () => {
  const modals = document.querySelectorAll(".modal.active");
  modals.forEach((modal) => {
    closeModal(modal);
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modal = button.closest(".modal");
    closeModal(modal);
  });
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}

const teacherName = document.querySelector("#teacher_name");

const options = {
  method: "GET",
};
fetch("/available_teacher", options)
  .then((res) => {
    res.json().then((results) => {
      results.forEach((result) => {
        const option = document.createElement("option");
        option.value = result;
        option.innerText = result;
        teacherName.appendChild(option);
      });
    });
  })
.catch((e) => console.log(e));



const batchName = document.querySelector("#batch_name");

fetch("/available_batch", options)
  .then((res) => {
    res.json().then((results) => {
      // console.log("YUp");
      results.forEach((result) => {
        const option = document.createElement("option");
        option.value = result;
        option.innerText = result;
        batchName.appendChild(option);
      });
    });
  })
.catch((e) => console.log(e));