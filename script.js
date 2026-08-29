const add = document.querySelector(".add");
const form = document.querySelector(".form-container");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const addBook = document.querySelector(".add-book");
const shelf = document.querySelector(".shelf");
const formInputs = document.querySelector("form");
const formStatus = document.querySelector("#status");

const myLibrary = [
    { title: 'The Hobbit', author: 'J. R. R. Tolkien', pages: '200', id: '17a29217-a893-4072-a656-2b5df81e6c4f', status: true },
    { title: 'A Song of Ice and Fire', author: 'George R. R. Martin', pages: '300', id: 'cc39c743-221b-4a3e-8d99-6f6cdd243563', status: false },
 ]

function Book(title, author, pages, id, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
    this.status = status;
}

function addBookToLibrary(title, author, pages, id, status) {
    const book = new Book(title, author, pages, id, status);
    myLibrary.push(book);
    console.log(myLibrary);
    return book;
}

function getBook(library) {
    for (const book of library) {
        displayBook(book);
    }
}

function displayBook(book) {
    const bookContainer = document.createElement("div");
    const bookLayout = document.createElement("div");
    const statusContainer = document.createElement("div");
    const deleteBtn = document.createElement("button");
    const headerTitle = document.createElement("p");
    const headerAuthor = document.createElement("p");
    const headerPages = document.createElement("p");
    const bookTitle = document.createElement("p");
    const bookAuthor = document.createElement("p");
    const bookPages = document.createElement("p");

    bookContainer.classList.add("book-container");
    bookLayout.classList.add("book");
    statusContainer.classList.add("status-container");
    deleteBtn.classList.add("delete");
    headerTitle.textContent = "Title";
    headerAuthor.textContent = "Author";
    headerPages.textContent = "Pages";
    bookTitle.textContent = book.title;
    bookAuthor.textContent = book.author;
    bookPages.textContent = book.pages;
    bookContainer.dataset.id = book.id;
    statusContainer.innerHTML = bookStatusStyle(bookContainer, book.status);
    deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>`;

    statusContainer.addEventListener("click", () => {
        book.status = !book.status;
        console.log(book.title, book.status);
        statusContainer.innerHTML = bookStatusStyle(statusContainer, book.status);
    });

    bookLayout.append(
        headerTitle, bookTitle, document.createElement("hr"),
        headerAuthor, bookAuthor, document.createElement("hr"),
        headerPages, bookPages
     );

    bookContainer.append(bookLayout, deleteBtn, statusContainer);
    shelf.append(bookContainer);
}

function bookStatusStyle(statusContainer, formStatus) {
    if (formStatus === true) {
        statusContainer.style.backgroundColor = "#00ff40";
        return `<svg xmlns = "http://www.w3.org/2000/svg" viewBox = "0 0 24 24" ><title>check-all</title><path d="M0.41,13.41L6,19L7.41,17.58L1.83,12M22.24,5.58L11.66,16.17L7.5,12L6.07,13.41L11.66,19L23.66,7M18,7L16.59,5.58L10.24,11.93L11.66,13.34L18,7Z" /></svg >`;
    } else {
        statusContainer.style.backgroundColor = "#ff1010";
        return "Unread";
    }
}

add.addEventListener("click", () => {
    form.style.display = "block";
    title.focus();
})

form.addEventListener("click", (event) => {
    const isCloseButton = event.target.closest(".close-form");
    if (isCloseButton) {
        formInputs.reset();
        form.style.display = "none";
    }
})

addBook.addEventListener("click", () => {
    if (title.value && author.value && pages.value) {
        let newID = crypto.randomUUID();
        const newBook = addBookToLibrary(title.value, author.value, pages.value, newID, formStatus.checked);
        displayBook(newBook);
        formInputs.reset();
        form.style.display = "none";
    }
})

shelf.addEventListener("click", (event) => {
    const isDeleteButton = event.target.closest(".delete");
    if (isDeleteButton) {
        const bookToRemove = isDeleteButton.closest(".book-container");
        const idToFind = bookToRemove.dataset.id;
        const targetIndex = myLibrary.findIndex((item) => {
            return item.id === idToFind;
        })
        console.log(targetIndex);
        myLibrary.splice(targetIndex, 1);
        bookToRemove.remove();
        console.log(myLibrary);
    }
})

getBook(myLibrary);
console.log(myLibrary);
