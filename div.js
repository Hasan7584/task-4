
//  8ta div delete korar pore eta show korbe
const deleteButtons = document.querySelectorAll(".btn-delete");
const noJobs = document.getElementById("noJobs");
const allCardsContainer = document.getElementById("allCards");
function checkCards() {
    const remainingCards = allCardsContainer.querySelectorAll(".card");
    if (remainingCards.length === 0) {
        noJobs.classList.remove("hidden"); 
    } else {
        noJobs.classList.add("hidden"); 
    }
}
deleteButtons.forEach(btn => {
    btn.addEventListener("click", function() {
        const card = btn.closest(".card"); 
        card.remove(); 
        checkCards(); 
    });
});