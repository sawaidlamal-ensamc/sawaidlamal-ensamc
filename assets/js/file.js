// NAVBAR-------------------------------------------------------

const nav = document.querySelector(".nav"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});

$(document).ready(function () {
  $(window).on("scroll resize", function () {
    $(".fade-in").each(function () {
      var position = $(this).offset().top;
      var scrollPosition = $(window).scrollTop();
      var windowHeight = $(window).height();

      if (position < scrollPosition + windowHeight - 100) {
        $(this).addClass("visible");
      } else {
        $(this).removeClass("visible");
      }
    });
  });


  $(window).trigger("scroll");
});

// data speed -------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const parallaxElements = document.querySelectorAll("[data-speed]");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  parallaxElements.forEach((el) => {
    observer.observe(el);
  });
});

// timeline -------------------------------------------------------
(function () {
  "use strict";

  var items = document.querySelectorAll(".timeline li");

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();

carousel();

// events -------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".event-card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
    });
  });
});








