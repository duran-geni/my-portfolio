const menuButton = document.getElementById("menu-btn");
const menuPanel = document.getElementById("menu-panel");
const hireForm = document.getElementById("hire-form");
const hireFormNote = document.getElementById("hire-form-note");

menuButton?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (!menuPanel) return;

    const shouldShowPanel = menuPanel.hasAttribute("hidden");
    menuPanel.toggleAttribute("hidden", !shouldShowPanel);
    menuButton.setAttribute("aria-expanded", String(shouldShowPanel));
});

document.addEventListener("click", (event) => {
    if (!menuPanel || menuPanel.hasAttribute("hidden")) return;
    if (menuPanel.contains(event.target) || menuButton?.contains(event.target)) return;

    menuPanel.setAttribute("hidden", "");
    menuButton?.setAttribute("aria-expanded", "false");
});

hireForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    hireFormNote?.removeAttribute("hidden");
    hireForm.reset();
});
