console.log('Starting up');

var gProjs = [{
    id: "sokoban",
    name: "Sokoban",
    title: "Better push those boxes",
    desc: "lorem ipsum lorem ipsum lorem ipsum",
    url: "img/portfolio/03-full.jpg",
    publishedAt: 1448693940000,
    labels: ["Matrixes",
        "keyboard events"],
}, {
    id: "minesweeper",
    name: "minesweeper",
    title: "minesweeper",
    desc: "minesweeper game",
    url: "img/portfolio/02-full.jpg",
    publishedAt: 1448693940000,
    labels: ["Matrixes",
        "keyboard events"],
}, {
    id: "ReSymmetry",
    name: "ReSymmetry",
    title: "another project",
    desc: "Dynamic ReSymmetry chair",
    url: "img/portfolio/04-full.jpg",
    publishedAt: 1448693940000,
    labels: ["Matrixes",
        "keyboard events"],
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
    gProjs.forEach(function (proj) {
        strHtml += `
           <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" onclick="openModal('${proj.id}')" href="#portfolioModal">
            <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                <i class="fa fa-plus fa-3x"></i>
                </div>
            </div>
            <img class="img-fluid" src="${proj.url}" alt="">
            </a>
            <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
            </div>
        </div>
        `});
    $('#porfolio-grid').html(strHtml)
}


function openModal(projId) {
    proj = getProjById(projId)
    var strHtml = '';

    strHtml += `
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="close-modal" data-dismiss="modal">
                <div class="lr">
                <div class="rl"></div>
                </div>
            </div>
            <div class="container">
                <div class="row">
                <div class="col-lg-8 mx-auto">
                    <div class="modal-body">
                    <!-- Project Details Go Here -->
                    <h2>${proj.name}</h2>
                    <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                    <img class="img-fluid d-block mx-auto" src="${proj.img}" alt="">
                    <p>${proj.desc}</p>
                    <ul class="list-inline">
                        <li>Date: January 2017</li>
                        <li>Client: Threads</li>
                        <li>Category: Illustration</li>
                    </ul>
                    <button class="btn btn-primary" data-dismiss="modal" type="button">
                        <i class="fa fa-times"></i>
                        Close Project</button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>`

        $('#portfolioModal').html(strHtml);
}