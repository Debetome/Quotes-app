const list_container = document.querySelector('.lista-frases');

const save_quote_position = (quote_elements) => {
    if (quote_elements === null && [...quote_elements].length === 0) return;

    const quotes = [...quote_elements].map((item, _) => {
        const filter_char = (array, char) => array.filter(c => c != char).join("");
        const quote = filter_char(item.querySelector(".content .quote").innerText.split(""), '"');
        const author = filter_char(item.querySelector(".content .author").innerText.split(""), "-");

        return { Content: quote, Author: author };
    });

    localStorage.setItem("Quotes", JSON.stringify(quotes));

    display_quotes();
    append_dragging_events(document.querySelectorAll(".quote-element"));
};

const append_dragging_events = (quote_elements) => {
    quote_elements.forEach(quote => {
        quote.ondragstart = () => {
            quote.classList.add('dragging');
        };
        quote.ondragend = () => {
            quote.classList.remove('dragging');
        };
    });
};

const get_next_quote = (y_pos) => {
    const other_quotes = [...list_container.querySelectorAll('.quote-element:not(.dragging)')];

    return other_quotes.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y_pos - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) return { offset: offset, element: child };
        return closest;

    }, { offset: Number.NEGATIVE_INFINITY }).element;
};

const setup = () => {
    const accept_btns = document.querySelectorAll(".accept-btn");
    const cancel_btns = document.querySelectorAll(".cancel-btn");
    const quote_elements = document.querySelectorAll(".quote-element");

    append_dragging_events(quote_elements);

    add_button.addEventListener("click", () => {
        const quote_elements = document.querySelectorAll(".quote-element");
        append_dragging_events(quote_elements);
    });
};

list_container.addEventListener("dragover", event => {
    event.preventDefault();
    const after_quote = get_next_quote(event.clientY);
    const quote = document.querySelector(".dragging");

    if (after_quote == null) {
        list_container.appendChild(quote);
        return;
    }
        
    list_container.insertBefore(quote, after_quote);
});

list_container.addEventListener("drop", event => {
    event.preventDefault();
    const quote_elements = document.querySelectorAll(".quote-element");
    save_quote_position(quote_elements);
});

setup();

