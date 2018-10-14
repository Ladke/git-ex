var gBooks;

function createBooks() {
    gBooks = [createBook('Grapes of wrath', '9.90', 'img/grapes.jpg'),
    createBook('Baruch the Chair', '8.90', 'img/baruch.jpg'),
    createBook('Animal Farm', '7.90', 'img/animal-farm.jpg')]
}

function createBook(title, price, imgURL) {
    return {
        id: makeId(),
        title: title,
        price: price,
        img: imgURL,
        rating: 0
    }
}

function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return book.id === bookId
    })
    gBooks.splice(bookIdx, 1);
}

function getBookById(bookId) {
    return gBooks.find(function (book) {
        return book.id === bookId
    })
}

function showBookInfo(bookId) {
    var book = getBookById(bookId);
    var strHtml = `
    <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${book.img}" alt="Book cover image">
        <div class="card-body">
    <h5 class="card-title">${book.title}</h5>
    <p class="card-text">Price: $${book.price}</p>

    <div class="btn-group" role="group" aria-label="Basic example">
    <button type="button" class="btn btn-secondary" autocomplete="off" id="minus" onclick="rateMinus('${book.id}')">-</button>
    <button type="button" class="btn btn-secondary" autocomplete="off" id="rating">${book.rating}</button>
    <button type="button" class="btn btn-secondary" autocomplete="off" id="plus" onclick="ratePlus('${book.id}')">+</button>
  </div>

    <button type="button" class="btn btn-secondary" data-dismiss="modal"> Done </button>
  </div>
</div>
    `
    $('.modal-title').html('More Details');
    $('.modal-body').html(strHtml);
}

function updateBook(bookId) {
    var book = getBookById(bookId);
    var strHtml = `
    <form>
    <label for="bookTitle">Book's name: ${book.title}</label>
    <div class="form-group">
    <label for="bookTitle">Update price</label>
        <input type="text" class="form-control" id="inputPrice" placeholder="was $${book.price}">
    </div>
      <!-- <button type="submit" class="btn btn-primary">Submit</button> -->
    </form>
    <button type="button" class="btn btn-secondary" data-dismiss="modal"> Dismiss </button>
    <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="updatePrice('${book.id}')" >Update</button>
    `

    $('.modal-title').html('Update Book');
    $('.modal-body').html(strHtml)

}

function getNewBookInfo() {
    var strHtml = `
    <form>
    <div class="form-group">
        <label for="bookTitle">Book's Title</label>
        <input type="text" class="form-control" id="inputName" aria-describedby="emailHelp"
            placeholder="e.g. Harry Potter">
    </div>
    <div class="form-group">
    <label for="bookprice">Price</label>
        <input type="text" class="form-control" id="inputPrice" placeholder="e.g. 9.97">
    </div>

    <div class="form-group">
        <label for="FormControlFile1">Upload image</label>
        <input type="file" class="form-control-file" id="FormControlFile1">
    </div>

    </form>
    <button type="button" class="btn btn-secondary" data-dismiss="modal"> Dismiss </button>
    <button type="button" class="btn btn-primary" onclick="addBook()" data-dismiss="modal">Update</button>
    `
    $('.modal-title').html('Add a Book');
    $('.modal-body').html(strHtml);
}

function addBook() {
    var newTitle = $('#inputName').val();
    var newPrice = $('#inputPrice').val()
    var newImage = $('#FormControlFile1').val()
    gBooks.push(createBook(newTitle, newPrice, newImage));
    renderBooks();
}

function updatePrice(bookId) {
    var book = getBookById(bookId);
    var newPrice = $('#inputPrice').val()
    book.price = newPrice;
    renderBooks();
}

function rateMinus(bookId) {
    console.log('minus hit');
    var book = getBookById(bookId);
    if (book.rating === 0) return
    book.rating--;
    $('#rating').html(book.rating)
    renderBooks();

}

function ratePlus(bookId) {
    console.log('plus hit');
    var book = getBookById(bookId);
    if (book.rating === 10) return
    book.rating++;
    $('#rating').html(book.rating)
    renderBooks();
}


function nameSort(a, b) {
    var aName = a.title.toLowerCase();
    var bName = b.title.toLowerCase();
    if (aName < bName)
        return -1;
    if (aName > bName)
        return 1;
    return 0;
}

function priceSort(a, b) {
    var aPrice = a.price.toLowerCase();
    var bPrice = b.price.toLowerCase();
    if (aPrice < bPrice)
        return -1;
    if (aPrice > bPrice)
        return 1;
    return 0;
}