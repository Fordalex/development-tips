// preview variables
var animateAGradientPreview = `
                            <h1 class="animate-a-gradient-result m-0">Title</h1>
`;

var menuTransitionPreview = `
                            <div class="row m-0 p-0">
                                <div class="col-12 p-0 d-flex justify-content-center mt-4 mb-3">
                                    <div class="burger-container">
                                        <div class="burger-one"></div>
                                        <div class="burger-two"></div>
                                        <div class="burger-three"></div>
                                    </div>
                                </div>
                                <div class="col-12 p-0 d-flex justify-content-center">
                                    <p class="mb-4 text-small">Please click the menu to toggle the transition.</p>
                                </div>
                            </div>
`;

var scrollDownAnimation = `
                        <div>
                            <div class="arrow"></div>
                            <div class="arrow arrow-mid"></div>
                            <div class="arrow arrow-bottom"></div>
                        </div>
`;

// Creating the link objects
function link(title, languages, difficulty, preview, link, created) {
    this.title = title;
    this.languages = languages;
    this.difficulty = difficulty;
    this.preview = preview;
    this.link = link;
    this.created = created;
}

var animate_a_gradient = new link('Animate a gradient', ['html', 'css'], 1, animateAGradientPreview, 'animate-a-gradient.html', '04/04/2020');
var menu_transition = new link('Menu transition', ['html', 'css', 'jquery'], 1.5, menuTransitionPreview, 'menu-transition.html', '11/04/2020');
var scroll_down_animation = new link('Scroll down animation', ['html', 'css'], 1, scrollDownAnimation, 'scroll-down-animation.html', '12/04/2020');

// All the links stored in an array
var allLinks = [animate_a_gradient, menu_transition, scroll_down_animation];

// formats the links ready to be appended to the home page
function appendLinkToPage(linkTitle, linkLanguages, linkDifficulty, linkPreview, link, linkCreated) {
    // styling the languages list
    var languagesArray = [];
    var html = '<span class="colour-html"><b>HTML</b></span>';
    var css = '<span class="colour-css"><b>CSS</b></span>';
    var javascript = '<span class="colour-css"><b>CSS</b></span>';
    var jquery = '<span class="colour-jquery"><b>Jquery</b></span>';
    var python = '<span class="colour-css"><b>CSS</b></span>';

    if (linkLanguages.includes("html") == true) {
        languagesArray.push(html)
    };

    if (linkLanguages.includes("css") == true) {
        languagesArray.push(css)
    };

    if (linkLanguages.includes("javascript") == true) {
        languagesArray.push(javascript)
    };

    if (linkLanguages.includes("jquery") == true) {
        languagesArray.push(jquery)
    };

    if (linkLanguages.includes("python") == true) {
        languagesArray.push(python)
    };

    // creating the stars out of the difficulty rating
    var difficulty = [];
    if (linkDifficulty % 1 == 0) {
        for (let i = 0; i < linkDifficulty; i++) {
            difficulty = difficulty + '<i class="fas fa-star"></i>'
        }
    } else {
        for (let i = 0; i < linkDifficulty - 0.5; i++) {
            difficulty = difficulty + '<i class="fas fa-star"></i>'
        }
        difficulty = difficulty + '<i class="fas fa-star-half-alt"></i>'
    };
    // adding the empty stars
    var remainingStars = 5 - linkDifficulty;
    if (remainingStars % 1 == 0) {
        for (let i = 0; i < remainingStars; i++) {
            difficulty = difficulty + '<i class="far fa-star"></i>'
        }
    } else {
        for (let i = 0; i < remainingStars - 0.5; i++) {
            difficulty = difficulty + '<i class="far fa-star"></i>'
        }
    };

    var table = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 px-0 py-2 p-sm-2 link">
                    <div class="tip-link-container">
                        <div class="white-background p-2">
                            <h5 class="m-0">${linkTitle}</h5>
                        </div>
                        <div class="p-2">
                            <div class="d-flex justify-content-between">
                                <p class="text-secondary text-small p-0 m-0 mb-1">Languages: ${languagesArray}</p>
                                <div class="d-flex justify-content-start align-items-center mb-1">
                                    <p class="m-0 text-small mr-1">Difficulty:</p>
                                    ${difficulty}
                                </div>
                            </div>
                            <div class="result-container-preview d-flex justify-content-center align-items-center">
                                ${linkPreview}
                            </div>
                            <div class="d-flex justify-content-between align-items-center mt-2">
                                <a href="${link}" class="main-button">Learn</a>
                                <p class="text-secondary text-small p-0 m-0">Created: ${linkCreated}</p>
                            </div>
                        </div>
                    </div>
                </div>`;
    return $('#front-end-links-container').append(table);
}

// when the document has loaded the links will be appended to the page.
$(document).ready(function() {

    var sortLinks = allLinks.sort(function(b, a) { return b.difficulty - a.difficulty });

    for (let i = 0; i < sortLinks.length; i++) {
        var title = sortLinks[i]['title'];
        var languages = sortLinks[i]['languages'];
        var difficulty = sortLinks[i]['difficulty'];
        var preview = sortLinks[i]['preview'];
        var link = sortLinks[i]['link']
        var created = sortLinks[i]['created'];
        appendLinkToPage(title, languages, difficulty, preview, link, created)
    }
});

// filter the lessons on the page
function filter() {
    $('.link').remove();

    var sort = $('#sort-links').val()

    if (sort == 'easyHard') {
        var sortLinks = allLinks.sort(function(b, a) { return b.difficulty - a.difficulty });
    } else {
        var sortLinks = allLinks.sort(function(a, b) { return b.difficulty - a.difficulty });
    }

    for (let i = 0; i < sortLinks.length; i++) {
        var title = sortLinks[i]['title'];
        var languages = sortLinks[i]['languages'];
        var difficulty = sortLinks[i]['difficulty'];
        var preview = sortLinks[i]['preview'];
        var link = sortLinks[i]['link']
        var created = sortLinks[i]['created'];
        appendLinkToPage(title, languages, difficulty, preview, link, created)
    }



    // var html = $('#html-checkbox').prop('checked')
    // var css = $('#css-checkbox').prop('checked')
    // var javascript = $('#javascript-checkbox').prop('checked')
    // var jquery = $('#jquery-checkbox').prop('checked')
    // var python = $('#python-checkbox').prop('checked')



    // var searchLanguages = '';

    // if (html == true) {
    //     searchLanguages = searchLanguages + 'html'
    // }

    // if (css == true) {
    //     searchLanguages = searchLanguages + 'css'
    // }

    // if (javascript == true) {
    //     searchLanguages = searchLanguages + 'javascript'
    // }

    // if (jquery == true) {
    //     searchLanguages = searchLanguages + 'jquery'
    // }

    // if (python == true) {
    //     searchLanguages = searchLanguages + 'python'
    // }

    // if (languages.includes(searchLanguages)) {
    //     
    // }

    // }
}