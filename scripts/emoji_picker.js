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

const emojis = [
    "&#128512",
    "&#128513",
    "&#128514",
    "&#128515",
    "&#128516",
    "&#128517",
    "&#128518",
    "&#128519",
    "&#128520",
    "&#128521",
    "&#128522",
    "&#128523",
    "&#128524",
    "&#128525",
    "&#128526",
    "&#128527",
    "&#128528",
    "&#128529",
    "&#128530",
    "&#128531",
    "&#128532",
    "&#128533",
    "&#128534",
    "&#128535",
    "&#128536",
    "&#128537",
    "&#128538",
    "&#128539",
    "&#128540",
    "&#128541",
    "&#128542",
    "&#128543",
    "&#128544",
    "&#128545",
    "&#128546",
    "&#128547",
    "&#128548",
    "&#128549",
    "&#128550",
    "&#128551",
    "&#128552",
    "&#128553",
    "&#128554",
    "&#128555",
    "&#128556",
    "&#128557",
    "&#128558",
    "&#128559",
    "&#128560",
    "&#128561",
    "&#128562",
    "&#128563",
    "&#128564",
    "&#128565",
    "&#128566",
    "&#128567",
    "&#128577",
    "&#128578",
    "&#128579",
    "&#128580",
    "&#129296",
    "&#129297",
    "&#129298",
    "&#129299",
    "&#129300",
    "&#129301",
    "&#129302",
    "&#129303",
    "&#129312",
    "&#129313",
    "&#129314",
    "&#129315",
    "&#129316",
    "&#129317",
    "&#129319",
    "&#129320",
    "&#129321",
    "&#129322",
    "&#129323",
    "&#129324",
    "&#129325",
    "&#129326",
    "&#129327",
    "&#129488",
    "&#128568",
    "&#128569",
    "&#128570",
    "&#128571",
    "&#128572",
    "&#128573",
    "&#128574",
    "&#128575",
    "&#128576",
    "&#128169",
    "&#9994",
    "&#9995",
    "&#128070",
    "&#128071",
    "&#128072",
    "&#128073",
    "&#128074",
    "&#128075",
    "&#128076",
    "&#128077",
    "&#128078",
    "&#128079",
    "&#128080",
    "&#128170",
    "&#128064",
    "&#128065",
    "&#128066",
    "&#128067",
    "&#128068",
    "&#128069"
];

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