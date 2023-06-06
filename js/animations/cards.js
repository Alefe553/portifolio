function fadeInCards() {
    let cardsTehcnologies = document.querySelectorAll("#technologies .card");
    let cardsExperience = document.querySelectorAll("#experience .card");
    let windowHeight = window.innerHeight;
    let delay = 0;
    let delayIncrement = 0.4;
    let transitionDuration = 1.5; 

    cardsTehcnologies.forEach(function (card) {
        let cardPosition = card.getBoundingClientRect().top;

        if (cardPosition < windowHeight) {
            card.style.transitionDelay = delay + "s";
            card.style.transitionDuration = transitionDuration + "s";
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
            delay += delayIncrement;
        }
    });

    cardsExperience.forEach(function (card) {
        let cardPosition = card.getBoundingClientRect().top;

        if (cardPosition < windowHeight) {
            card.style.transitionDelay = delay + "s";
            card.style.transitionDuration = transitionDuration + "s";
            card.style.opacity = 1;
            card.style.transform = "translateY(0)";
            delay += delayIncrement;
        }
    });
}

window.addEventListener("scroll", fadeInCards);
window.addEventListener("resize", fadeInCards);

// Executar a animação quando a página carrega
fadeInCards();