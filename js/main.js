console.log('Starting up');

var gProjs = [{
    id: "zelig",
    name: "Zelig & Zelda",
    title: "Playful furniture for kids",
    desc: "Kid's chairs in minimalistic yet playful design",
    img: "img/portfolio/small/zelig.jpg",
    url: 0,
    publishedAt: 1448693940000,
    date: "May 2007",
    category: "Industrial Design",
    labels: ["funiture",
        "kids", "design"],
    }, {
        id: "bookstore",
        name: "Book Store",
        title: "Book Store Managing tool",
        desc: "coming soon",
        img: "img/portfolio/small/minesweep.jpg",
        url: "/git-ex/proj/Book_shop/index.html",
        date: "september 2018",
        publishedAt: 1448693940000,
        category: "Web-Dev",
        labels: ["Matrixes",
            "keyboard events"],
}, {
    id: "minesweeper",
    name: "Minesweeper",
    title: "Minesweeper online game",
    desc: "Play beginner, intermediate and expert games of Minesweeper",
    img: "img/portfolio/small/minesweep.jpg",
    url: "/git-ex/proj/minesweeper/index.html",
    date: "september 2018",
    publishedAt: 1448693940000,
    category: "Web-Dev",
    labels: ["Matrixes",
        "keyboard events"],
}, {
    id: "resymmetry",
    name: "ReSymmetry",
    title: "Mechanical Chair Prototype",
    desc: "Dynamic chair for disabled kids",
    img: "img/portfolio/small/resymmetry.jpg",
    url: "http://www.resymmetry.com/",
    date: "May 2017",
    publishedAt: 1448693940000,
    category: "Industrial Design",
    labels: ["engeneering",
        "medical equpment"],
}, {
    id: "beast-box",
    name: "Beast Box",
    title: "Storage/Pencil Box",
    desc: "DESIGNED WITH THE ZIPIT TEAM - A series of hard-case storage boxes ",
    img: "img/portfolio/small/beastbox.jpg",
    url: `https://www.amazon.com/ZIPIT-Beast-Pencil-Case-Storage/dp/B00RXHRQGY/
    ref=sr_1_5?ie=UTF8&qid=1521915566&sr=8-5&keywords=beast%2Bbox&dpID=51Hj-VTxq
    KL&preST=_SX300_QL70_&dpSrc=srch&th=1`,
    date: "May 2017",
    publishedAt: 1448693940000,
    category: "Industrial Design",
    labels: ["storage",
        "pencil case"],
}, {
    id: "puffer",
    name: "Insulated Lunch-Bag",
    title: "",
    desc: `DESIGNED WITH THE ZIPIT TEAM
    A series of lunch bags inspired by Down Jackets
    The excellent properties of the isolating material helps keep the food cold`,
    img: "img/portfolio/small/puffer.jpg",
    url: "https://just-zipit.com/collections/lunch-bags/products/puffer-lunch-bag",
    date: "May 2017",
    publishedAt: 1448693940000,
    category: "Industrial Design",
    labels: ["textile",
        "lunch bag"],
}, {
    id: "cutlery",
    name: "Cutlery",
    title: "Single-use, plastic cutlery",
    desc: `Plastic cutlery with the minimum use of plastic. 
    The handles are shell-like, creating a lightweight, yet strong structure`,
    img: "img/portfolio/small/cutlery.jpg",
    url: 0,
    date: "June 2015",
    publishedAt: 1448693940000,
    category: "Industrial Design",
    labels: ["plastic",
        "industrial design"],
    }, {
        id: "wheelchair",
        name: "Wheelchair",
        title: "extreme-sports wheelchair",
        desc: `comming soon..`,
        img: "img/portfolio/small/wheelchair.png",
        url: 0,
        date: "June 2007",
        publishedAt: 1448693940000,
        category: "Industrial Design",
        labels: ["plastic",
            "industrial design"],
    }]

initPage()

function initPage() {
    renderProjs();
}

function getProjById(projId) {
    return gProjs.find(function (proj) {
        return proj.id === projId
    });
}

function renderProjs() {
    var strHtml = '';
    //render cards
    gProjs.forEach(function (proj) {
        strHtml += `
           <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" onclick="updateModal('${proj.id}')" data-toggle="modal"  href="#portfolioModal" >
            <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
                </div>
            </div>
            <div >
            <img class="img-fluid" src="${proj.img}" alt="">
            </div>
            </a>
            <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
            </div>
        </div>
        `});
    $('#porfolio-grid').html(strHtml)
}


function updateModal(projId) {
    var proj = getProjById(projId)
    // var loc = window.location.hostname;
    var linkBtn = `<span></span>`;
    // if (proj.url) linkBtn = `<li onclick="window.open('${loc+proj.url}')">
    if (proj.url) linkBtn = `<li onclick="window.open('${proj.url}')">
        <button type="button" class="btn btn-secondary">link to project</button>
    </li>`
    var strHtml = '';
    strHtml += `
        <div class="modal-dialog">
            <div class="modal-content">
           
            <div class="container">
                <div class="row">
                <div class="col-lg-8 mx-auto">
                    <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">${proj.title}</p>
                    <img class="img-fluid d-block mx-auto" src="${proj.img}" alt="">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                        <li>Date: ${proj.date}</li>
                        <li>Category: ${proj.category}</li>
                        ${linkBtn}
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                        <i class="fa fa-times"></i>
                        Close Project</button>
                    </div>
                </div>
                </div>
            </div>
            <div class="close-modal" data-dismiss="modal">
            <div class="lr">
            <div class="rl"></div>
            </div>
        </div>
            </div>
        </div>`

    $('#portfolioModal').html(strHtml)
}

function submitForm() {
    var email = $('#FormEmailInput1').val();
    var subject = $('#FormSubjectTextarea1').val();
    var message = $('#FormMessageTextarea1').val();
    var strContaceForm = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`
    window.location.assign(strContaceForm)
    // clearForm();

}
function clearForm() {
    $('#FormEmailInput1').val('');
    $('#FormSubjectTextarea1').val('');
    $('#FormMessageTextarea1').va('');
    renderProjs();

}
