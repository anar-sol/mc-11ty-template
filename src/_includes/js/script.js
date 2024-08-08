/* --------- navigation  --------- */
function initNavigation() {
    const menuBtnOpen = document.querySelector("#menu-btn--open");
    const menuBtnClose = document.querySelector("#menu-btn--close");
    const navigation = document.querySelector(`#${menuBtnOpen.getAttribute("aria-controls")}`);

    menuBtnOpen.addEventListener("click", (event) => {
        navigation.classList.add("navigation--expanded");
        document.body.classList.add("no-scroll");
        menuBtnClose.focus();
    });

    menuBtnClose.addEventListener("click", () => {
        navigation.classList.remove("navigation--expanded");
        menuBtnOpen.focus();
        document.body.classList.remove("no-scroll");
    });

    navigation.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            menuBtnClose.click();
        }
    });
};

/* --------- card --------- */
function initClickableCards() {
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const mainLink = card.querySelector(".card__cta");
            const isTextSelected = window.getSelection().toString();
            if (!isTextSelected && mainLink) {
                mainLink.click();
            }
        });
    });
}

(function init() {
    initNavigation();
    initClickableCards();
})();
