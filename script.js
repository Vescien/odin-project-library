const add = document.querySelector(".add");
const form = document.querySelector(".form-container");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const addBook = document.querySelector(".add-book");
const shelf = document.querySelector(".shelf");

const myLibrary = [
    { title: 'The Hobbit', author: 'J. R. R. Tolkien', pages: '200', id: '17a29217-a893-4072-a656-2b5df81e6c4f' },
    { title: 'A Song of Ice and Fire', author: 'George R. R. Martin', pages: '300', id: 'cc39c743-221b-4a3e-8d99-6f6cdd243563' },
 ];

function Book(title, author, pages, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
}

function addBookToLibrary(title, author, pages, id) {
    const book = new Book(title, author, pages, id);
    myLibrary.push(book);
    console.log(myLibrary);
}

function getBook(library) {
    for (const book of library) {
        displayBook(book.title, book.author, book.pages, book.id);
    }
}

function displayBook(title, author, pages, id) {
    const bookHTML = `
        <div class="book-container" data-id="${id}">
            <div class="book">
                <p>Title</p>
                <p>${title}</p>
                <hr>

                <p>Author</p>
                <p>${author}</p>
                <hr>
                
                <p>Pages</p>
                <p>${pages}</p>
            </div>
            <button class="delete">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" /></svg>
            </button>
        </div>
    `;
    shelf.insertAdjacentHTML("beforeend", bookHTML);
}

add.addEventListener("click", () => {
    form.style.display = "block";
})

form.addEventListener("click", (event) => {
    const isCloseButton = event.target.closest(".close-form");
    if (isCloseButton) {
        form.style.display = "none";
    }
})

addBook.addEventListener("click", (event) => {
    event.preventDefault();
    if (title.value && author.value && pages.value) {
        let newID = crypto.randomUUID();
        addBookToLibrary(title.value, author.value, pages.value, newID);
        displayBook(title.value, author.value, pages.value, newID);
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
});

getBook(myLibrary);
console.log(myLibrary);



