if (barba) {
  barba.use(barbaCss);

  barba.init({
    transitions: [
      {
        name: "fade",
        leave() {},
        enter() {},
      },
    ],
  });
}

if (window.document.querySelector(".menu__wrapper")) {
  // Menu
  var doc = window.document,
    context = doc.querySelector(".menu__wrapper"),
    items = doc.querySelectorAll(".menu__item"),
    clones = [],
    disableScroll = false,
    scrollHeight = 0,
    scrollPos = 0,
    clonesHeight = 0;

  function getScrollPos() {
    return (
      (context.pageYOffset || context.scrollTop) - (context.clientTop || 0)
    );
  }

  function setScrollPos(pos) {
    context.scrollTop = pos;
  }

  function getClonesHeight() {
    clonesHeight = 0;

    Array.from(clones, (clone) => {
      clonesHeight = clonesHeight + clone.offsetHeight;
    });

    return clonesHeight;
  }

  function reCalc() {
    scrollPos = getScrollPos();
    scrollHeight = context.scrollHeight;
    clonesHeight = getClonesHeight();

    if (scrollPos <= 0) {
      setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
    }
  }

  function scrollUpdate() {
    if (!disableScroll) {
      scrollPos = getScrollPos();

      if (clonesHeight + scrollPos >= scrollHeight) {
        // Scroll to the top when you’ve reached the bottom
        setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
        disableScroll = true;
      } else if (scrollPos <= 0) {
        // Scroll to the bottom when you reach the top
        setScrollPos(scrollHeight - clonesHeight);
        disableScroll = true;
      }
    }

    if (disableScroll) {
      // Disable scroll-jumping for a short time to avoid flickering
      window.setTimeout(function () {
        disableScroll = false;
      }, 40);
    }
  }

  function onLoad() {
    Array.from(items, (item) => {
      const clone = item.cloneNode(true);
      context.appendChild(clone);
      clone.classList.add("js-clone");
    });

    clones = context.querySelectorAll(".js-clone");

    reCalc();

    context.addEventListener(
      "scroll",
      function () {
        window.requestAnimationFrame(scrollUpdate);
      },
      false
    );

    window.addEventListener(
      "resize",
      function () {
        window.requestAnimationFrame(reCalc);
      },
      false
    );
  }

  window.onload = onLoad;
}

// Navbar
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links li");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  links.forEach((link) => {
    link.classList.toggle("fade");
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      links.forEach((el) => {
        hamburger.checked = false;
        el.classList.remove("fade");
        el.classList.remove("active");
      });
      navLinks.classList.remove("open");
      link.classList.add("active");
    });
  });
});
