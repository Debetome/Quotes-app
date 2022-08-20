const input_content = document.querySelector(".input-field .content-input");
const input_author = document.querySelector(".input-field .author-input");
const add_button = document.getElementById('add-quote');
const delete_all = document.getElementById('delete-all-btn');

const delete_button = document.querySelector(".delete");
const edit_button = document.querySelector(".edit");

const quote_list = document.querySelector(".frases .lista-frases");
const no_quotes = document.getElementById('no-quotes');

add_button.addEventListener("click", () => {
    const storage = localStorage.getItem("Quotes");
    const content = input_content.value;
    const author = input_author.value;

    let quotes = [];

    if (content.length === 0 || author.length === 0) return;
    if (storage != null) quotes = JSON.parse(storage);

    const new_quote = {
        Content: content,
        Author: author
    };

    quotes.push(new_quote);
    localStorage.setItem("Quotes", JSON.stringify(quotes));
    display_quotes();
    clean_fields();
});

delete_all.addEventListener("click", () => {
    const storage = localStorage.getItem("Quotes");
    if (storage === null) return;
    if (JSON.parse(storage).length === 0) return;
    
    show_delete_all_popup();
});

const edit_quote = (index, {content = "", author = ""} = {}) => {
    const storage = localStorage.getItem("Quotes");

    if (content.length == 0 || author.length == 0) return;
    if (storage == null) return;

    let quotes = JSON.parse(storage);

    quotes[index].Content = content;
    quotes[index].Author = author;
    localStorage.setItem("Quotes", JSON.stringify(quotes));
    display_quotes();
}

const delete_quote = (index) => {
    const storage = localStorage.getItem("Quotes");
    if (storage == null) return;
    
    let quotes = JSON.parse(storage);

    quotes.splice(index, 1);
    localStorage.setItem("Quotes", JSON.stringify(quotes));
    display_quotes();
}

const display_quotes = () => {
    const storage = localStorage.getItem("Quotes");

    let quotes = [];

    if (storage == null) no_quotes.classList.add('active');
    if (storage != null) quotes = JSON.parse(storage);
    if (quotes.length == 0) no_quotes.classList.add('active');
    if (quotes.length != 0) no_quotes.classList.remove('active');

    const new_quote_list = quotes.map((quote, index) => {
        const quote_element = `
            <li id=${index + 1} class="quote-element" draggable="true">
            <div class="content">
                <div class="quote">
                    <header>\"<i>${quote.Content}</i>\"</header>
                </div>
                <div class="author">
                    <strong> - ${quote.Author}</strong>
                </div>
            </div>
            <span class="delete" onclick="show_delete_popup(${index})">
                <i class="fas fa-trash"></i>
            </span>
            <span class="edit" onclick="show_edit_popup(${index})">
                <i class="fas fa-pen"></i>
            </span>
            </li>
        `;

        return quote_element;
    });

    quote_list.innerHTML = new_quote_list.join('\n');
}

const delete_all_quotes = () => {
    const storage = localStorage.getItem("Quotes");
    if (storage == null) return;
    localStorage.removeItem("Quotes");
    display_quotes();
}

const clean_fields = () => {
    if (input_content.value.length == 0 && input_author.value.length == 0) return;
    input_content.value = "";
    input_author.value = "";
};

display_quotes();