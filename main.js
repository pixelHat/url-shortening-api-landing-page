import "./scss/style.scss";

window.addEventListener("DOMContentLoaded", () => {
  const menus = document.querySelectorAll("[data-menu]");
  menus.forEach((menu) => {
    const targetId = menu.dataset.menu;
    const target = document.getElementById(targetId);
    menu.addEventListener("click", () => target.classList.toggle("open"));
  });
});
