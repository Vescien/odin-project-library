const add = document.querySelector(".add");
const form = document.querySelector(".form-container");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const addBook = document.querySelector(".add-book");
const shelf = document.querySelector(".shelf");

add.addEventListener("click", () => {
    form.style.display = "block";
})

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        form.style.display = "none";
    }
})

addBook.addEventListener("click", (event) => {
    event.preventDefault();
    if (title.value && author.value && pages.value) {
        addBookToLibrary(title.value, author.value, pages.value);
        displayBook(title.value, author.value, pages.value);
        form.style.display = "none";
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

function displayBook(title, author, pages) {
    const book = document.createElement("div");
    book.classList.add("book");

    const headerTitle = document.createElement("p");
    const headerAuthor = document.createElement("p");
    const headerPages = document.createElement("p");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");

    headerTitle.textContent = "Title";
    headerAuthor.textContent = "Author";
    headerPages.textContent = "Pages";
    bookTitle.textContent = title;
    bookAuthor.textContent = author;
    bookPages.textContent = pages;

    book.append(headerTitle, bookTitle, document.createElement("hr"));
    book.append(headerAuthor, bookAuthor, document.createElement("hr"));
    book.append(headerPages, bookPages);

    shelf.appendChild(book);
}






