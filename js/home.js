const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const cardContainer = document.getElementById("cardContainer");
const openCards = document.getElementById("openCards");
const closedCards = document.getElementById("closedCards");
const totalIssues = document.getElementById("totalIssues");
const issues_modal = document.getElementById("issues_modal");
const spinner = document.getElementById("spinner");


let countCard = [];
let countOpenCard = [];
let countClosed = [];

document.getElementById('logOut').addEventListener('click',()=>{
  window.location.href="./index.html"
})

function showSpinner(status) {
  if (status === true) {
    spinner.classList.remove("hidden");
    cardContainer.classList.add("hidden");
  } else {
    spinner.classList.add("hidden");
    cardContainer.classList.remove("hidden");
  }
}

function updateCount(status) {
  if (status === "all") {
    totalIssues.innerText = countCard.length;
  } else if (status === "open") {
    totalIssues.innerText = countOpenCard.length;
  } else if (status === "closed") {
    totalIssues.innerText = countClosed.length;
  }
}
document.getElementById("buttons").addEventListener("click", (e) => {
  const target = e.target.closest('.btn');
  if(!target)return
  const selectedBtn = document.querySelectorAll("#buttons .btn");
  selectedBtn.forEach((btn) => {
    btn.classList.remove("btn-primary");
  });
  target.classList.add("btn-primary");
  if (target.classList.contains("btn")) {
    if (target.id === "allBtn") {
      cardContainer.classList.remove("hidden");
      openCards.classList.add("hidden");
      closedCards.classList.add("hidden");
      updateCount("all");
    }
    if (target.id === "openBtn") {
      cardContainer.classList.add("hidden");
      openCards.classList.remove("hidden");
      closedCards.classList.add("hidden");
      updateCount("open");
    }
    if (target.id === "closedBtn") {
      cardContainer.classList.add("hidden");
      openCards.classList.add("hidden");
      closedCards.classList.remove("hidden");
      updateCount("closed");
    }
    
  }
});

async function loadAllIssues() {
  showSpinner(true);
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayAllIssues(data.data);
  showSpinner(false);
}
async function loadSingleIssues(id) {
  showSpinner(true);
  const res = await fetch(
    `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
  );
  const data = await res.json();
  modalIssues(data.data);
  showSpinner(false);
}
