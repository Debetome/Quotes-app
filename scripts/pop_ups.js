const edit_popup = document.getElementById('edit-popup');
const delete_popup = document.getElementById('delete-popup');
const delete_all_popup = document.getElementById('delete-all-popup');
const blur = document.getElementById('blur');

const get_quote = (index) => {
    const storage = localStorage.getItem("Quotes");
    let quote = {};

    if (storage == null) return;
    if (storage != null) quote = JSON.parse(storage)[index];

    return quote;
};

const show_edit_popup = (index) => {
    const accept_btn = document.querySelector("#edit-popup .accept-btn");
    const cancel_btn = document.querySelector("#edit-popup .cancel-btn");
    const content_input = document.querySelector("#edit-popup .content-input");
    const author_input = document.querySelector("#edit-popup .author-input");

    const quote = get_quote(index);
    if (!quote) return;

    blur.classList.toggle('active');
    edit_popup.classList.toggle('active');

    author_input.value = quote.Author;
    content_input.value = quote.Content;

    accept_btn.onclick = () => {
        const new_author = author_input.value;
        const new_content = content_input.value;

        if (new_author.length === 0 && new_content.length === 0) return;
        edit_quote(index, {content: new_content, author: new_author});

        blur.classList.toggle('active');
        edit_popup.classList.toggle('active');

        const quote_elements = document.querySelectorAll(".quote-element");
        append_dragging_events(quote_elements);
        set_edit_btn_events();
    };

    cancel_btn.onclick = () => {
        blur.classList.toggle('active');
        edit_popup.classList.toggle('active');
        set_edit_btn_events();
    };
};

const show_delete_popup = (index) => {
    const accept_btn = document.querySelector("#delete-popup .accept-btn");
    const cancel_btn = document.querySelector("#delete-popup .cancel-btn");
    const author_text = document.querySelector("#delete-popup .confirm strong");

    const quote = get_quote(index);
    if (!quote) return;

    blur.classList.toggle('active');
    delete_popup.classList.toggle("active");

    author_text.innerText = quote.Author;

    accept_btn.onclick = () => {
        delete_quote(index);
        blur.classList.toggle('active');
        delete_popup.classList.toggle('active');
    };

    cancel_btn.onclick = () => {
        blur.classList.toggle('active');
        delete_popup.classList.toggle('active');
    };
}

const show_delete_all_popup = () => {
    const accept_btn = document.querySelector("#delete-all-popup .accept-btn");
    const cancel_btn = document.querySelector("#delete-all-popup .cancel-btn");

    blur.classList.toggle("active");
    delete_all_popup.classList.toggle("active");

    accept_btn.onclick = () => {
        delete_all_quotes();
        blur.classList.toggle("active")
        delete_all_popup.classList.toggle("active");
    }

    cancel_btn.onclick = () => {
        blur.classList.toggle("active")
        delete_all_popup.classList.toggle("active");
    }
}