// preview variables
var animateAGradientPreview = `
                            <h1 class="animate-a-gradient-result m-0">Title</h1>
`;

var menuTransitionPreview = `
                        <div class="burger-container">
                            <div class="burger-one"></div>
                            <div class="burger-two"></div>
                            <div class="burger-three"></div>
                        </div>  
`;

// All the link stored in a dictionary
var allLinks = {
    'animate-a-gradient': {
        'title': 'Animate a gradient',
        'languages': ['html', 'css'],
        'difficulty': 1,
        'preview': animateAGradientPreview,
        'created': '04/04/2020'
    },
    'menu-transition': {
        'title': 'Menu transition',
        'languages': ['Html', 'Css', 'Jquery'],
        'difficulty': 1.5,
        'preview': menuTransitionPreview,
        'created': '11/04/2020'
    }
}

// formats the links ready to be appended to the home page
function appendLinkToPage(linkTitle, linkLanguages, linkDifficulty, linkPreview, linkCreated) {
    var table = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 p-0 p-md-2">
                    <div class="tip-link-container">
                        <div class="white-background p-2">
                            <h5 class="m-0">${linkTitle}</h5>
                        </div>
                        <div class="p-2">
                            <div class="d-flex justify-content-between">
                                <p class="text-secondary text-small p-0 m-0 mb-1">Languages: ${linkLanguages}</p>
                                <div class="d-flex justify-content-start align-items-center mb-1">
                                    <p class="m-0 text-small mr-1">Difficulty:</p>
                                    ${linkDifficulty}
                                </div>
                            </div>
                            <div class="result-container-preview d-flex justify-content-center align-items-center">
                                ${linkPreview}
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <a href="animate-a-gradient.html" class="main-button">Learn</a>
                                <p class="text-secondary text-small p-0 m-0">Created: ${linkCreated}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    return $('#front-end-links-container').append(table);
}


for (var i in allLinks) {
    var title = allLinks[i]['title'];
    var languages = allLinks[i]['languages'];
    var difficulty = allLinks[i]['difficulty'];
    var preview = allLinks[i]['preview'];
    var created = allLinks[i]['created'];
    appendLinkToPage(title, languages, difficulty, preview, created)
}