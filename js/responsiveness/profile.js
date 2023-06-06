
const changeClass = (idElement, oldClass, newClasses) => {
    let element = document.getElementById(idElement);
    element.classList.remove(oldClass);
    newClasses.forEach((newClass) => {
        element.classList.add(newClass);
    });
}

const handleScreenSizer = (event) => {
    if (event.matches) {
        changeClass('profile-content', 'fixed-content', ['vh-100']);
    } else {
        changeClass('profile-content', 'vh-100', ['fixed-content']);
    }
}

let mediaQuery = window.matchMedia("(max-width: 1070px)");
handleScreenSizer(mediaQuery);

const onResize = () => {
    handleScreenSizer(mediaQuery);
    handleScreenSizer(mediaQuery);
}

window.addEventListener("resize", onResize);
