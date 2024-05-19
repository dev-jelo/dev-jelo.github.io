"use strict";

//// Function for typing effect
const myName = document.querySelector("#my-name-text");
const cursor = document.querySelector(".cursor");

let i = 0;
const typingText = "Jeremy" + String.fromCharCode(160) + "Lo";
function typing() {
  if (i < typingText.length) {
    myName.innerHTML += typingText[i];
    i++;
    setTimeout(typing, 80);
  } else {
    cursor.classList.add("blink");
  }
}
setTimeout(typing, 500);

//// Make nav bar stick to top of page when scrolled down, and move theme toggle to navbar
const navBar = document.querySelector(".navbar");
let navBarCoordsTop =
  navBar.getBoundingClientRect().top + document.documentElement.scrollTop;
let myNameCoords = myName.getBoundingClientRect();
let myNameCoordsTop = myNameCoords.top + document.documentElement.scrollTop;
const spacer = document.querySelector(".spacer");
const arrow = document.querySelector(".arrow");

// Recalculate positions on window resize
window.addEventListener("resize", () => {
  if (!navBar.classList.contains("navbar-stick")) {
    navBarCoordsTop =
      navBar.getBoundingClientRect().top + document.documentElement.scrollTop;
  } else {
    navBarCoordsTop =
      myName.getBoundingClientRect().bottom +
      document.documentElement.scrollTop +
      13;
  }
  myNameCoordsTop =
    myName.getBoundingClientRect().top + document.documentElement.scrollTop;
});

// Scroll event to check when to stick the navbar to top of page
document.addEventListener("scroll", () => {
  // Stick navbar to top when scrolling past
  if (document.documentElement.scrollTop >= navBarCoordsTop) {
    navBar.classList.add("navbar-stick");
  } else {
    navBar.classList.remove("navbar-stick");
  }
  // Move theme toggle to navbar when scrolled down
  if (document.documentElement.scrollTop >= myNameCoordsTop - 25) {
    toggle.classList.add("hidden");
    toggleNav.classList.remove("hidden");
    spacer.classList.remove("hidden");
  } else {
    toggle.classList.remove("hidden");
    toggleNav.classList.add("hidden");
    spacer.classList.add("hidden");
  }
  // Remove bottom arrow when scrolled down
  if (document.documentElement.scrollTop > 0 && arrow.style.opacity != "0") {
    arrow.style.opacity = "0";
  } else if (
    document.documentElement.scrollTop === 0 &&
    arrow.style.opacity != "1"
  ) {
    arrow.style.opacity = "1";
  }
});

//// Make dark and light theme toggle
const toggle = document.querySelector("#theme-toggle");
const toggleNav = document.querySelector("#theme-toggle-nav");
let theme = "light";

const listOfClassesToTheme = [
  "about-bracket",
  "about-tag",
  "about-attribute",
  "about-attribute-value",
  "about-section",
  "about-backdrop",
  "about-text",
  "project-link",
  "project-card",
  "project-card-img-container",
  "contact-section",
];

// Check if theme has been set already in the session, then check user's default system theme setting
let sessionTheme = sessionStorage.getItem("theme");
if (sessionTheme) {
  sessionTheme === "dark" ? setDarkTheme() : setLightTheme();
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  setDarkTheme();
}

function toggleDarkThemeOnClasses(addDark) {
  if (addDark) {
    for (let i = 0; i < listOfClassesToTheme.length; i++) {
      document
        .querySelectorAll(`.${listOfClassesToTheme[i]}`)
        .forEach((elem) => {
          elem.classList.add(`${listOfClassesToTheme[i]}-dark`);
        });
    }
  } else {
    for (let i = 0; i < listOfClassesToTheme.length; i++) {
      document
        .querySelectorAll(`.${listOfClassesToTheme[i]}`)
        .forEach((elem) => {
          elem.classList.remove(`${listOfClassesToTheme[i]}-dark`);
        });
    }
  }
}

function setDarkTheme() {
  theme = "dark";
  sessionStorage.setItem("theme", "dark");
  toggle.src = "./public/moon.svg";
  toggleNav.src = "./public/moon.svg";
  document.body.classList.add("dark-theme");
  document.querySelector("html").classList.add("html-dark");
  navBar.classList.add("dark-theme");
  cursor.classList.add("cursor-dark-theme");
  arrow.classList.add("arrow-dark-theme");
  toggleDarkThemeOnClasses(true);
  document.querySelectorAll(".contact-icon").forEach((elem) => {
    if (elem.alt === "email icon") {
      elem.src = "./public/email-dark.svg";
    } else if (elem.alt === "github icon") {
      elem.src = "./public/github-dark.svg";
    } else {
      elem.src = "./public/linkedin-dark.svg";
    }
  });
}

function setLightTheme() {
  theme = "light";
  sessionStorage.setItem("theme", "light");
  toggle.src = "./public/sun.svg";
  toggleNav.src = "./public/sun.svg";
  document.body.classList.remove("dark-theme");
  document.querySelector("html").classList.remove("html-dark");
  navBar.classList.remove("dark-theme");
  cursor.classList.remove("cursor-dark-theme");
  arrow.classList.remove("arrow-dark-theme");
  toggleDarkThemeOnClasses(false);
  document.querySelectorAll(".contact-icon").forEach((elem) => {
    if (elem.alt === "email icon") {
      elem.src = "./public/email.svg";
    } else if (elem.alt === "github icon") {
      elem.src = "./public/github.svg";
    } else {
      elem.src = "./public/linkedin.svg";
    }
  });
}

toggle.addEventListener("click", () => {
  theme === "dark" ? setLightTheme() : setDarkTheme();
});
toggleNav.addEventListener("click", () => {
  theme === "dark" ? setLightTheme() : setDarkTheme();
});

//// Prevent transition effect on page load, and check if refreshing a page that has scrolled down (prevent fade in animation of navbar)
window.addEventListener("load", () => {
  // Loop through all 'preload' elements to remove 'preload' class
  document.querySelectorAll(".preload").forEach((elem) => {
    elem.classList.remove("preload");
  });

  setTimeout(() => {
    toggle.classList.remove("fade-in-animation");
    arrow.classList.remove("fade-in-animation");
  }, 2000);

  // Prevent navbar and arrow animation if scrolled down
  if (
    document.documentElement.scrollTop >=
    myNameCoords.bottom + document.documentElement.scrollTop
  ) {
    navBar.classList.remove("fade-in-animation");
    toggle.classList.remove("fade-in-animation");
  }
  if (
    window.scrollY + self.innerHeight ===
    document.documentElement.scrollHeight
  ) {
    navBar.classList.remove("fade-in-animation");
  }
  if (document.documentElement.scrollTop > 0) {
    arrow.classList.remove("fade-in-animation");
  }
});

//// Click to animate typing gif
const typingImage = document.querySelector(".project-card-img-typing");
typingImage.addEventListener("click", () => {
  typingImage.classList.toggle("project-card-img-typing-gif");
});

// Pre load the gif so there is no pause when clicked
let img = new Image();
img.src = "./public/typing.gif";

//// Update year in footer to current year
const year = document.querySelector("#copyright-year");
const currentYear = new Date().getFullYear();
year.innerText = currentYear;
