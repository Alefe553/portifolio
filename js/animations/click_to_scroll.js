window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTopButton');
    const sections = document.querySelectorAll('section');
    const firstSectionHeight = sections[0].offsetHeight;

    if (window.scrollY > firstSectionHeight) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}