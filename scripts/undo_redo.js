const undo_btn = document.getElementById("undo");
const redo_btn = document.getElementById("redo");
const clear_off_btn = document.getElementById("clear");

const accept_edit = document.querySelector("#edit-popup .accept-btn");
const cancel_edit = document.querySelector("#edit-popup .cancel-btn");

var done = {};
var timeout = null;
var edit_focus = null;

undo_btn.addEventListener("click", () => {
    if (done === null) return;
    if (edit_focus === null) return;
    if (done[edit_focus.name].index !== 0) done[edit_focus.name].index--;
    if (done[edit_focus.name].actions[done[edit_focus.name].index] === null) return;

    edit_focus.value = done[edit_focus.name].actions[done[edit_focus.name].index];
});

redo_btn.addEventListener("click", () => {
    if (done === null) return;
    if (edit_focus === null) return;
    if (done[edit_focus.name].index !== done[edit_focus.name].actions.length - 1) done[edit_focus.name].index++;
    if (done[edit_focus.name].actions[done[edit_focus.name].index] === null) return;

    edit_focus.value = done[edit_focus.name].actions[done[edit_focus.name].index];
});

clear_off_btn.addEventListener("click", () => {
    if (edit_focus === null) return;
    if (edit_focus.value.length === 0) return;
    edit_focus.value = "";

    done[edit_focus.name].actions.push("");
    done[edit_focus.name].index++;
});

const append_emoji_events = () => {
    document.querySelectorAll("#emoji-pick-frame .emoji-container .emoji").forEach(emoji => {
        emoji.addEventListener("click", () => {
            if (!document.getElementById("edit-popup").classList.contains("active")) return;
            done[edit_focus.name].actions.push(edit_focus.value + emoji.innerText);
            done[edit_focus.name].index++;
        })
    });
};

const append_action = (field) => {
    if (done[field.name].actions[done[field.name].actions.length - 1] === field.value) return;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
        done[field.name].actions.push(field.value);
        done[field.name].index++;
    }, 600);
};

const set_done_defaults = () => {
    const edit_fields = document.querySelectorAll("#edit-popup .edit-field");

    done = {};
    edit_focus = [...edit_fields][0];

    edit_fields.forEach(field => {
        done[field.name] = {};
        done[field.name].actions = [];
        done[field.name].index = 0;
        console.log(done)

        if (done[field.name].actions.length !== 0) return;
        done[field.name].actions.push(field.value);

        field.addEventListener("focus", () => {
            if (edit_focus !== field) edit_focus = field;
            if (done !== null && done[field.name] !== null) return;
            set_done_defaults(field);
        });

        ["keyup", "paste", "cut"].forEach(event => {
            field.addEventListener(event, () => {
                append_action(field);
            })
        });
    });
}

const set_edit_btn_events = () => {
    const edit_btns = document.querySelectorAll(".quote-element .edit");
    edit_btns.forEach(edit => {
        edit.addEventListener("click", () => {
            set_done_defaults();
        });
    });
};

add_button.addEventListener("click", () => {
    set_edit_btn_events();
});

set_edit_btn_events();
