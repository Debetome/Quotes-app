const list_container = document.querySelector('.lista-frases');

const save_quote_position = () => {
    const quote_elements = document.querySelectorAll(".quote-element");   
    if (quote_elements === null && [...quote_elements].length === 0) return;

    const quotes = [...quote_elements].map((item, _) => {
        const filter_char = (array, char) => array.filter(c => c != char).join("");
        const quote = filter_char(item.querySelector(".content .quote").innerText.split(""), '"');
        const author = filter_char(item.querySelector(".content .author").innerText.split(""), "-");

        return { Content: quote, Author: author };
    });

    localStorage.setItem("Quotes", JSON.stringify(quotes));
};

const append_dragging_events = () => {
    const get_updated_quotes = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const quote_elements = document.querySelectorAll(".quote-element");
                resolve(quote_elements);
            }, 350);
        });
    };

    get_updated_quotes().then(quote_elements => {
        quote_elements.forEach(quote => {
            quote.ondragstart = () => {
                quote.classList.add('dragging');
            };

            quote.ondragend = () => {
                quote.classList.remove('dragging');
            };
        });
    }).catch(err => {
        console.error(err);
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

    add_button.addEventListener("click", () => {
        append_dragging_events();
    });

    accept_btns.forEach(btn => {
        btn.addEventListener("click", () => {
            append_dragging_events();
        });
    });

    cancel_btns.forEach(btn => {
        btn.addEventListener("click", () => {
            append_dragging_events();
        });
    });
};

list_container.addEventListener("dragover", event => {
    event.preventDefault();

    append_dragging_events();
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
    save_quote_position();
});

append_dragging_events();
setup();

