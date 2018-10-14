var gCurrLang = 'en';
var gTrans = {
    storeHeader: {
        en: "Bobo's book shop",
        he: "חנות הספרים של ברוך",
        fr: "some french text",
    },
    addBook: {
        en: "Add a book",
        he: "הוסף ספר",
        fr: "add a book fr",
    },
    bookId: {
        en: "Book ID",
        he: 'מק"ט',
        fr: "id fr",
    },
    bookTitle: {
        en: "Title",
        he: "כותר",
        fr: "Titleee",
    },
    bookPrice: {
        en: "price",
        he: "מחיר",
        fr: "priceee",
    },
    bookCover: {
        en: "Cover",
        he: "תמונה",
        fr: "pic",
    },
    bookActions: {
        en: "Actions",
        he: "פעולות",
        fr: "Actionss",
    },
    infoBtn: {
        en: "Info",
        he: "מידע",
        fr: "informasion",
    },
    updateBtn: {
        en: "Update",
        he: "עדכן",
        fr: "updateox",
    },
    deleteBtn: {
        en: "Delete",
        he: "מחק",
        fr: "deleteue",
    },
    doneBtn: {
        en: "Done",
        he: "סיים",
        fr: "Doeue",
    },
    dismissBtn: {
        en: "Dismiss",
        he: "בטל",
        fr: "Dismiue",
    },
    currency: {
        en: "Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format",
        he: "ILS)",
        fr: "EUR",
    },
    uploadImg: {
        en: "Upload image",
        he: "העלה תמונה",
        fr: "upload image",
    },
}

function setLang(lang) {
    gCurrLang = lang;
    if (lang === 'he') {
        // document.body.classList.add('rtl');
        $('.container').addClass('heb');
        $('.btn-addBook').addClass('heb');
        $('.lang').addClass('heb');
        $('table').addClass('heb');

    }
    else {
        // document.body.classList.remove('rtl');
        $('.container').removeClass('heb');
        $('.btn-addBook').removeClass('heb');
        $('.lang').removeClass('heb');
        $('table').removeClass('heb');
    }
    doTrans()
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (let i = 0; i < els.length; i++) {
        var el = els[i];
        var currKey = el.getAttribute('data-trans')
        var txt = gTrans[currKey][gCurrLang];
        if (!txt) txt = keyTrans['en'];
        el.innerText = txt;
    }
}

function formatPrice() {

    (new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
}

