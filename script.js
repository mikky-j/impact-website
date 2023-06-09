let header = document.getElementById("header");
let links = document.querySelectorAll("#main-body nav div div ul a");
let sections = document.querySelectorAll("section");
let scrollToTop = document.getElementById("scroll-to-top");
let portfolioNavs = document.querySelectorAll("#portfolio .nav-link");
let porfolioProducts = document.querySelectorAll("#portfolio .col");

$("#offcanvasNavbar a").click(function () {
  if ($("button.navbar-toggler").css("display") == "block") {
    $("button.navbar-toggler").click();
  }
});

portfolioNavs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    let tag = nav.textContent.toLowerCase();
    // Change the products
    porfolioProducts.forEach((product) => {
      if (product.getAttribute("aria-tag") != tag && tag != "all") {
        product.classList.remove("active");
        if (!product.classList.contains("inactive")) {
          product.classList.add("inactive");
        }
      } else {
        product.classList.remove("inactive");
        if (!product.classList.contains("active")) {
          product.classList.add("active");
        }
      }
    });

    // Remove all other links
    portfolioNavs.forEach((other) => {
      if (nav.textContent != other.textContent) {
        other.classList.remove("active");
      } else {
        if (!nav.classList.contains("active")) {
          other.classList.add("active");
        }
      }
    });
  });
});

const getId = (anchorElement) => {
  let match = anchorElement.href.match(/#.*/);
  if (match) {
    return match[0];
  }
  return "";
};

const updateActive = (currentSectionId) => {
  links.forEach((link) => {
    let id = getId(link);
    let classList = link.classList;

    if (id === currentSectionId) {
      if (!classList.contains("active")) {
        classList.add("active");
      }
    } else {
      classList.remove("active");
    }
  });
};

const getCurrentSectionId = () => {
  let inViewSections = [];
  for (const section of sections) {
    let rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0 && section.id != "") {
      inViewSections.push(section);
    }
  }
  let sortedSections = inViewSections.sort(
    (section) => window.innerHeight - section.getBoundingClientRect().top
  );
  return "#" + sortedSections.pop().id;
};

const toTheTop = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
};

window.addEventListener("scroll", (e) => {
  if (header.getBoundingClientRect().top <= 0) {
    if (!header.classList.contains("fixed-top")) {
      header.classList.add("fixed-top");
    }
  }
  if (window.scrollY < 15) {
    header.classList.remove("fixed-top");
  }
  let currentId = getCurrentSectionId();
  if (currentId != "#main-body" && currentId != "#main") {
    scrollToTop.classList.remove("disappear");
    if (!scrollToTop.classList.contains("appear")) {
      scrollToTop.classList.add("appear");
    }
  } else {
    scrollToTop.classList.remove("appear");
    if (!scrollToTop.classList.contains("disappear")) {
      scrollToTop.classList.add("disappear");
    }
  }
  updateActive(currentId);
});
