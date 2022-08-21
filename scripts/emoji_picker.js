import { emojis } from './emojis.js';

const emojis_frame = document.getElementById("emoji-pick-frame");
const form_input = document.querySelectorAll(".formulario .input-field input");
const edit_input = document.querySelectorAll("#edit-popup .edit-field");
const form_emoji_btn = document.querySelector(".formulario .input-field .emoji-btn");
const edit_emoji_btn = document.querySelector("#edit-popup .emoji-btn");

const row_length = 6;

let focus_dict = {
    form_focused: [...form_input][0],
    edit_focused: [...edit_input][0]
};

function append_emojis() {
    const emoji_container = emojis_frame.querySelector(".emoji-container");   
    let emoji_matrix = [];
    let count = 0;

    const round_number = (number) => {
        let rounded = Math.round(number);
        return (rounded > number) ? rounded : rounded + 1;
    };

    for (let y = 0; y < round_number(emojis.length / row_length); ++y) {
        emoji_matrix[y] = [];
        for (let x = 0; x < row_length; ++x) {
            if (emojis.length === count) break;
            emoji_matrix[y][x] = emojis[count];
            count++;
        }
    }

    emoji_matrix.forEach(row => {
        emoji_container.innerHTML += "<div class=\"row\"></div>";
        const row_element = [...emoji_container.querySelectorAll(".row")].pop();
        row.forEach(emoji => {
            row_element.innerHTML += `<span class="emoji">${emoji}</span>`;
        });
    });
}

function setup_emojis(focused) {
    const emoji_elements = document.querySelectorAll(".emoji");

    emoji_elements.forEach(emoji => {
        emoji.onclick = () => {
            if (focus_dict[focused] !== null) focus_dict[focused].value = focus_dict[focused].value + emoji.innerText;
        };
    });
}

form_input.forEach(input_field => {
    input_field.addEventListener("focus", () => {
        focus_dict.form_focused = input_field;
    });
});

edit_input.forEach(input_field => {
    input_field.addEventListener("focus", () => {
        focus_dict.edit_focused = input_field;
    })
});

form_emoji_btn.addEventListener("click", event => {
    emojis_frame.style.left = 40 + "%";
    emojis_frame.style.top = 40 + "%";
    emojis_frame.classList.toggle('active');
    setup_emojis("form_focused");
});

edit_emoji_btn.addEventListener("click", () => {
    emojis_frame.style.left = 72 + "%";
    emojis_frame.style.top = 45 + "%";
    emojis_frame.classList.toggle('active');
    setup_emojis("edit_focused");
})

document.addEventListener("click", event => {
    if (event.target.closest(".emoji-btn")) return;
    if (event.target.closest(".emoji-pick-frame")) return;
    emojis_frame.classList.remove("active");
});

append_emojis();
append_emoji_events();