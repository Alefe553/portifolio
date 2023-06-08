
const changeClass = (idElement, oldClasses, newClasses) => {
    let element = document.getElementById(idElement);
    oldClasses.forEach((oldClass) => {
        element.classList.remove(oldClass);
    });
    newClasses.forEach((newClass) => {
        element.classList.add(newClass);
    });
}

const handleScreenSizer = (event) => {
    if (event.matches) {
        changeClass('profile-content', ['fixed-content'], ['min-vh-100', 'py-5', 'mx-3']);
    } else {
        changeClass('profile-content', ['min-vh-100', 'py-5', 'mx-3'], ['fixed-content']);
    }
}

let mediaQuery = window.matchMedia("(max-width: 1070px)");
handleScreenSizer(mediaQuery);

const onResize = () => {
    handleScreenSizer(mediaQuery);
    handleScreenSizer(mediaQuery);
}

window.addEventListener("resize", onResize);
