
let translations = {};

const changeLanguage = (language) => {
    let elements = document.querySelectorAll('[data-translate]');
    for (var i = 0; i < elements.length; i++) {
        var key = elements[i].getAttribute('data-translate');
        elements[i].textContent = translations[language][key];
    }
}

const loadTranslations = (language) => {
    fetch(`js/translates/${language}.json`)
        .then(response => response.json())
        .then(data => {
            translations[language] = data;
            changeLanguage(language);
        })
        .catch(error => console.error(error));
}

loadTranslations('pt-br');