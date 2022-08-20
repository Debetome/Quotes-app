const toggling_elements = [
    ...document.querySelectorAll(".pop-up"),
    document.querySelector('body'),
    document.getElementById('formulario'),
    document.getElementById('frases'),
    document.getElementById('switcher-box'),
    document.getElementById("no-quotes"),
    document.getElementById("emoji-pick-frame")
];

const clear_btn = document.getElementById('clear-btn');
const dark_btn = document.getElementById('dark-btn');

let dark = false;

const toggle_all = () => {
    toggling_elements.forEach(element => {
        element.classList.toggle('dark')
    });
}

const load_theme = () => {
    const storage = localStorage.getItem("Saved_theme");

    if (storage == null) return;
    if (storage != null) dark = JSON.parse(storage);
    if (dark) toggle_all();
};

const toggle_theme = () => {
    dark = !dark;
    toggle_all();
    localStorage.setItem("Saved_theme", dark);
};

clear_btn.addEventListener("click", () => {
    if (!dark) return;
    toggle_theme();
});

dark_btn.addEventListener("click", () => {
    if (dark) return;
    toggle_theme();
});

load_theme();