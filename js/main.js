// Coal Emporium, Inc. site scripts

document.addEventListener("DOMContentLoaded", function () {
  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Highlight the current page in the nav
  var here = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".main-nav a").forEach(function (link) {
    var target = link.getAttribute("href");
    if (target === here) {
      link.classList.add("active");
    }
  });

  // Footer year
  var year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Contact form: front-end confirmation only. No order is transmitted anywhere.
  var form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var success = document.getElementById("form-success");
      var name = form.querySelector("#field-name");
      var firstName = name && name.value ? name.value.trim().split(" ")[0] : "there";
      if (success) {
        success.textContent =
          "Thank you, " + firstName + ". Your inquiry has been logged with our " +
          "Gifting Services team. A coal consultant will respond within two " +
          "business days. Reference number: CE-" +
          String(Math.floor(100000 + Math.random() * 900000)) + ".";
        success.classList.add("visible");
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
      form.reset();
    });
  }

  // Package recommender on the packages page
  var slider = document.getElementById("naughtiness-slider");
  if (slider) {
    var valueOut = document.getElementById("naughtiness-value");
    var resultOut = document.getElementById("recommender-result");
    var recommendations = [
      { max: 2, name: "The Warning Shot", detail: "A single lump states your position without overcommitting. Appropriate for first offenses and minor attitude." },
      { max: 4, name: "The Standard Stocking", detail: "Two pounds of Classic Bituminous. Our most popular package for a reason. The message lands on Christmas morning and holds through New Year's." },
      { max: 6, name: "The Household Correction Bundle", detail: "Ten pounds, split into four labeled sacks. Recommended when the behavior involves more than one child, or one child on more than one occasion." },
      { max: 8, name: "The Full Reckoning", detail: "A forty pound crate with a personalized letter of disappointment. Reserved for sustained, documented naughtiness." },
      { max: 10, name: "The Executive Pallet", detail: "Half a ton, delivered by forklift. At this level we suggest upgrading to Premium Anthracite. Please review our adult gifting terms before ordering." }
    ];
    var update = function () {
      var level = parseInt(slider.value, 10);
      if (valueOut) valueOut.textContent = level;
      var pick = recommendations[recommendations.length - 1];
      for (var i = 0; i < recommendations.length; i++) {
        if (level <= recommendations[i].max) {
          pick = recommendations[i];
          break;
        }
      }
      if (resultOut) {
        resultOut.innerHTML =
          "Recommended package: <strong>" + pick.name + "</strong>. " + pick.detail;
      }
    };
    slider.addEventListener("input", update);
    update();
  }
});
