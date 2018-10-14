'use strict';


function init() {
    createBooks();
    renderBooks();

}

function renderBooks() {
    var books = gBooks
    var strHtmls = books.map(function (book) {
        return `
    <tr>
        <td>${book.id}</td>
        <td>${book.title}</td>
        <td>$${book.price}</td>
        <td><img class="thumbnail" src="${book.img}" alt=""></a></td>
        <td> 
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#infoModal" onclick="onInfoBook('${book.id}')">Info</button>
        <button type="button" class="btn btn-warning" data-toggle="modal" data-target="#infoModal" onclick="onUpdateBook('${book.id}')">Update</button>
        <button type="button" class="btn btn-danger" onclick="onDeleteBook('${book.id}')">Delete</button>
        </td>
    </tr> `
    })
    $('tbody').html(strHtmls.join(''))
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}

function onInfoBook(bookId) {
    showBookInfo(bookId);
}

function onUpdateBook(bookId) {
    updateBook(bookId);
}

function onAddNewBook() {
    getNewBookInfo();
}

function sortByName(){
    gBooks.sort(nameSort);
    renderBooks()
}


function sortByPrice(){
    gBooks.sort(priceSort);
    renderBooks()
}

