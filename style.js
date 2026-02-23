const allCards = document.getElementById("allCards");
const total = document.getElementById("total");
const thriveCount = document.getElementById("thriveCount");
const strugglingCount = document.getElementById("strugglingCount");

// update count jonno ei function kora holo
function updateCounts() {
  const cards = document.querySelectorAll(".card");
  total.innerText = cards.length;

  let thrive = 0;
  let struggling = 0;

  cards.forEach(card => {
    const status = card.querySelector(".status").innerText;

    if (status === "Thrive") {
      thrive++;
    } else if (status === "Struggling") {
      struggling++;
    }
  });

  thriveCount.innerText = thrive;
  strugglingCount.innerText = struggling;
}

// event delegation part start
allCards.addEventListener("click", function (event) {
  const card = event.target.closest(".card");
  if (!card) return;

  // thrive button jonno kas korlam
  if (event.target.classList.contains("thrive-btn")) {
    card.querySelector(".status").innerText = "Thrive";
    updateCounts();
  }

  // struggling button jonno kas korlam
  if (event.target.classList.contains("struggline-btn")) {
    card.querySelector(".status").innerText = "Struggling";
    updateCounts();
  }

  // delete button jono kas start hoise
  if (event.target.classList.contains("btn-delete")) {
    card.remove();
    updateCounts();
  }
});


function toggleStyle(activeId) {
  const buttons = [
    "all-filter-btn",
    "thrive-filter-btn",
    "Struggling-filter-btn"
  ];

  buttons.forEach(id => {
    const btn = document.getElementById(id);
    btn.classList.remove("bg-black", "text-white");
    btn.classList.add("bg-gray-300");
  });

  const activeBtn = document.getElementById(activeId);
  activeBtn.classList.remove("bg-gray-300");
  activeBtn.classList.add("bg-black", "text-white");

  filterCards(activeId);
}



function filterCards(filterId) {
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const status = card.querySelector(".status").innerText;

    if (filterId === "all-filter-btn") {
      card.classList.remove("hidden");
    } 
    else if (filterId === "thrive-filter-btn") {
      if (status === "Thrive") {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    } 
    else if (filterId === "Struggling-filter-btn") {
      if (status === "Struggling") {
        card.classList.remove("hidden");
      } else {
        card.classList.add("hidden");
      }
    }
  });
}

updateCounts();