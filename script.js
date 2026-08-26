const add = document.querySelector(".add");
const form = document.querySelector(".form-container");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const addBook = document.querySelector(".add-book");


addBook.addEventListener("click", (event) => {
    event.preventDefault();
    if (title.value && author.value && pages.value) {
        addBookToLibrary(title.value, author.value, pages.value);
        console.log(myLibrary);
    }
})

const myLibrary = [];

function Book(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
}

function addBookToLibrary(title, author, pages) {
    const book = new Book(title, author, pages);
    myLibrary.push(book);
}

function showHideForm() {
    add.addEventListener("click", () => {
        form.style.display = "block";
    })

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            form.style.display = "none";
        }
    })
}

showHideForm();



