const menuButton = document.getElementById("menu-btn");
const menuPanel = document.getElementById("menu-panel");
const hireForm = document.getElementById("hire-form");
const hireFormNote = document.getElementById("hire-form-note");
const navLinks = document.querySelectorAll(".main-nav .nav-btn[href^='#']");
const pageSections = document.querySelectorAll("#home, #about, #projects, #contact");

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

const setActiveNavLink = (sectionId) => {
    navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
};

if (pageSections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        const visibleSection = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection?.target.id) {
            setActiveNavLink(visibleSection.target.id);
        }
    }, {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.15, 0.35, 0.6]
    });

    pageSections.forEach((section) => sectionObserver.observe(section));
}

const editableSchoolFields = document.querySelectorAll(".editable-school[data-edit-key]");

editableSchoolFields.forEach((field) => {
    const key = field.dataset.editKey;
    if (!key) return;

    const storageKey = `portfolio_${key}`;
    const savedValue = localStorage.getItem(storageKey);
    if (savedValue) {
        field.textContent = savedValue;
    }

    field.addEventListener("blur", () => {
        localStorage.setItem(storageKey, field.textContent.trim());
    });
});
