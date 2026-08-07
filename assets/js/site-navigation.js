document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".mobile-nav-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const menus = Array.from(document.querySelectorAll(".nav-menu"));

  if (!toggle || !navigation) {
    return;
  }

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";

    toggle.setAttribute("aria-expanded", String(!expanded));
    navigation.classList.toggle("site-nav-custom--open", !expanded);
  });

  menus.forEach((menu) => {
    menu.addEventListener("toggle", () => {
      if (!menu.open) {
        return;
      }

      menus.forEach((otherMenu) => {
        if (otherMenu !== menu) {
          otherMenu.open = false;
        }
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".site-header")) {
      return;
    }

    menus.forEach((menu) => {
      menu.open = false;
    });

    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("site-nav-custom--open");
  });

  navigation.addEventListener("click", (event) => {
    if (!event.target.closest("a")) {
      return;
    }

    menus.forEach((menu) => {
      menu.open = false;
    });

    toggle.setAttribute("aria-expanded", "false");
    navigation.classList.remove("site-nav-custom--open");
  });
});