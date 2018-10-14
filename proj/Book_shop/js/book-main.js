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
        <td>${book.price}</td>
        <td><img class="thumbnail" src="${book.img}" alt=""></a></td>
        <td> 
        <button type="button" class="btn btn-info" data-toggle="modal" data-target="#infoModal" 
        data-trans="infoBtn" onclick="onInfoBook('${book.id}')">${gTrans['infoBtn'][gCurrLang]}</button>
        <button type="button" class="btn btn-warning" data-toggle="modal" 
        data-target="#infoModal" data-trans="updateBtn" onclick="onUpdateBook('${book.id}')">${gTrans['updateBtn'][gCurrLang]}</button>
        <button type="button" class="btn btn-danger" 
        data-trans="deleteBtn" onclick="onDeleteBook('${book.id}')">${gTrans['deleteBtn'][gCurrLang]}</button>
        </td>
    </tr> `
    })
    $('tbody').html(strHtmls.join(''))
    
}

function onDeleteBook(bookId) {
    var del = confirm("Are you sure you want to delete?");
    if(!del) return;
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
    renderBooks();
}

function onSetLang(lang) {
    setLang(lang);

}
