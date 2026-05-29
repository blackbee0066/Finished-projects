/*---------------SHOW MENU--------------- */
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navClose = document.getElementById('navClose');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}


/*---------------REMOVE MENU DEVICES--------------- */

const navLink = document.querySelectorAll('.nav_link');

const linkAction = () => {
    const navMenu = document.getElementById('navMenu'); // Ensure the ID matches
    navMenu.classList.remove('show-menu');
};

navLink.forEach(n => n.addEventListener('click', linkAction));


/*--------------- ADD SHADOW HEADER--------------- */

const shadowHeader = () => {
    const header = document.getElementById('header');
    window.scrollY >= 50 ?
     header.classList.add('shadow-header') : header.classList.remove('shadow-header');
};

// Adding the event listener to call shadowHeader on scroll
window.addEventListener('scroll', shadowHeader);


/*------------------SWIPER POPULAR------------------*/

const swiperPopular = new Swiper('.popular_swiper', {
    loop: true,
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto'
});


/*---------------SCROLL UP--------------- */

const handleScrollUp = () => {
    const scrollUpButton = document.getElementById('scroll-up');
    window.scrollY >= 350 ?
     scrollUpButton.classList.add('show-scroll') : scrollUpButton.classList.remove('show-scroll');
};

window.addEventListener('scroll', handleScrollUp);


/*---------------SCROLL SECTION ACTIVE LINK--------------- */

const sections = document.querySelectorAll('section [id]');

const scrollActive = () => {
    const scrollDown = window.scrollY; // Get the current vertical scroll position

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight; // Height of the current section
        const sectionTop = current.offsetTop - 58; // Top position of the section with offset
        const sectionId = current.getAttribute('id'); // Get the ID of the section
        const sectionClass = document.querySelector('.nav_menu a[href*="' + sectionId + '"]'); // Select the corresponding nav link

        // Check if the scroll position is within the bounds of the section
        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionClass.classList.add('active-link'); // Add active class if in view
        } else {
            sectionClass.classList.remove('active-link'); // Remove active class if not in view
        }
    });
};

window.addEventListener('scroll', scrollActive); // Add scroll event listener


/* ========================MODAL STRUCTURE============================= */

// Select all shopping bag buttons and modals
var shoppingBags = document.querySelectorAll('.Menu_button');
var modals = document.querySelectorAll('.modal');
var closeButtons = document.querySelectorAll('.close');

// Loop through each button
shoppingBags.forEach((button, index) => {
    button.addEventListener('click', () => {
        modals[index].style.display = 'block';
    });
});

// Loop through each close button
closeButtons.forEach((close, index) => {
    close.addEventListener('click', () => {
        modals[index].style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    modals.forEach((modal) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});

/*==============Scroll reveal animation================ */

const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
    reset: true //animations repeat
})

sr.reveal(`.home_data, .footer`)

sr.reveal('.home_board', {
    delay: 500,
    distance: '100px',
    origin: 'bottom'
})

sr.reveal('.home_burger-fries', {
    delay: 1200,
    distance: '100px',
    duration: 1500
})

sr.reveal(`.home_ingredient`,{
    delay: 1600,
    interval: 100
})

sr.reveal(`.recipe_img, .contact_img, .about_data`, {
    origin: 'left'
})

sr.reveal(`.recipe_name, .contact_data, .about_img`, {
    origin: 'right'
})

/*
sr.reveal('.popular_card', {
    interval: 100
})*/


