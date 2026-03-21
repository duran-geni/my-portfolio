const hireForm = document.getElementById("hire-form");
const hireFormNote = document.getElementById("hire-form-note");

hireForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    hireFormNote?.removeAttribute("hidden");
    hireForm.reset();
});

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
