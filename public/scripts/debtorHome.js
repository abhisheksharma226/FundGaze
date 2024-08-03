const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

// header container
ScrollReveal().reveal(".header__container p", {
  ...scrollRevealOption,
});

ScrollReveal().reveal(".header__container h1", {
  ...scrollRevealOption,
  delay: 500,
});

// about container
ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "left",
});

ScrollReveal().reveal(".about__content .section__subheader", {
  ...scrollRevealOption,
  delay: 500,
});

ScrollReveal().reveal(".about__content .section__header", {
  ...scrollRevealOption,
  delay: 1000,
});

ScrollReveal().reveal(".about__content .section__description", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".about__btn", {
  ...scrollRevealOption,
  delay: 2000,
});

// room container
ScrollReveal().reveal(".room__card", {
  ...scrollRevealOption,
  interval: 500,
});

// service container
ScrollReveal().reveal(".service__list li", {
  ...scrollRevealOption,
  interval: 500,
  origin: "right",
});




//For Calculation
document.getElementById("raise-fund-btn").addEventListener("click", function(event) {
    // Retrieve form values
    var amount = document.querySelector(".amount").value;
    var equity = document.querySelector(".equity").value;

    // Perform the valuation calculation
    var valuation = (amount / equity) * 100;
    var platformFee = (amount * 0.5) / 100;
    var paymentGatewayCharges = (amount * 12) / 100;

    // Update the valuation and breakup details in the HTML
    document.getElementById("valuation-amount").innerHTML = "&#8377;" + valuation.toFixed(2);
    document.getElementById("breakup-details").innerHTML = `
      <p>Want to raise (₹) : ${amount} ₹</p>
      <p>FundGaze platform fee (₹) : ${platformFee.toFixed(2)} ₹</p>
      <p>Payment gateway charges (₹) : ${paymentGatewayCharges.toFixed(2)} ₹</p>
    `;

    // Scroll to the "Estimate your worth" section
    document.getElementById("calculation").scrollIntoView({ behavior: 'smooth' });
  });





  