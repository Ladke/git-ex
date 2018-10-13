console.log('Starting up');

var gProjs = [{
    id: "sokoban",
    name: "Sokoban",
    title: "Better push those boxes",
    desc: "Play beginner, intermediate and expert games of Minesweeper",
    img: "img/portfolio/small/minesweeper.jpg",
    url: "proj/minesweeper/index.html", 
    publishedAt: 1448693940000,
    date: "May 2017",
    category: "Web-Dev",
    labels: ["Matrixes",
        "keyboard events"],
}, {
    id: "Minesweeper",
    name: "Minesweeper",
    title: "Minesweeper",
    desc: "Play beginner, intermediate and expert games of Minesweeper",
    img: "img/portfolio/small/zelig.jpg",
    url: "proj/minesweeper/index.html",
    date: "May 2017",
    publishedAt: 1448693940000,
    category: "Web-Dev",
    labels: ["Matrixes",
        "keyboard events"],
}, {
    id: "ReSymmetry",
    name: "ReSymmetry",
    title: "Mechanical Chair Prototype",
    desc: "Dynamic chair for disabled kids",
    img: "img/portfolio/small/resymmetry.jpg",
    url: "proj/minesweeper/index.html",
    date: "May 2017",
    publishedAt: 1448693940000,
    category: "Industrial Design",
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
                        <li onclick="window.open('${proj.url}')">link to project</li>
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

    $('#portfolioModal').html(strHtml)
}

function submitForm(){
    var email = $('#FormEmailInput1').val();
    var subject = $('#FormSubjectTextarea1').val();
    var message = $('#FormMessageTextarea1').val();
    var strContaceForm = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`
    clearForm();
    window.location.assign(strContaceForm)

}
function clearForm(){
    $('#FormEmailInput1').val('');
    $('#FormSubjectTextarea1').val('');
    $('#FormMessageTextarea1').va('');
    renderProjs();

}
