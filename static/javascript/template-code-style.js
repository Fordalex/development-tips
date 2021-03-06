// The style functions

function style_html_element(html_code) {
    var htmlArray = [];

    // push letters for the string into an array
    for (var i = 0; i < html_code.length; i++) {
        var singleLetter = html_code.charAt(i);
        if (singleLetter == '"') {
            htmlArray.push("'")
        } else {
            htmlArray.push(singleLetter)
        }
    }

    var htmlString = '';
    var addSpaceArray = ["=", '"', "'"]

    // convert the symbols into regular expression
    for (var i = 0; i < htmlArray.length; i++) {
        var singleLetter = htmlArray[i]
        if (singleLetter == '<') {
            htmlString = htmlString + ' &lt; ';
        } else if (singleLetter == '>') {
            htmlString = htmlString + ' &gt; ';
        } else if (addSpaceArray.includes(singleLetter)) {
            htmlString = htmlString + ' ' + singleLetter + ' ';
        } else if (singleLetter == '?') {
            htmlString = htmlString + '&emsp;&emsp;';
        } else {
            htmlString = htmlString + singleLetter;
        }
    }

    var wordArray = htmlString.split(" ")
    var styledString = '';

    var htmlTags = ["div", "/div", "p", "/p", "a", "/a", "h1", "/h1", "b", "/b", "select", "/select", "option", "/option", "button", "/button"]
    var htmlAttributes = ["class", "style", "type", "id", "value", "onclick"]

    var inAttribute = false;
    var shouldBreak = 0;
    // style the code
    for (var i = 0; i < wordArray.length; i++) {
        var singleWord = wordArray[i];
        if (inAttribute == true && singleWord == "'") {
            inAttribute = false;
            styledString = styledString + '"';
            shouldBreak = 0;
        } else if (inAttribute == true) {
            styledString = styledString + '<span class="code-value">' + singleWord + '</span>';
            shouldBreak = 0;
        } else if (inAttribute == false && singleWord == "'") {
            inAttribute = true;
            styledString = styledString + '"';
            shouldBreak = 0;
        } else if (singleWord == "↵") {
            styledString = styledString + '\n'
            shouldBreak = 0;
        } else if (htmlTags.includes(singleWord)) {
            styledString = styledString + '<span class="code-tag">' + singleWord + '</span>';
            shouldBreak = 0;
        } else if (htmlAttributes.includes(singleWord)) {
            styledString = styledString + '<span class="code-attribute"> ' + singleWord + '</span>';
            shouldBreak = 0;
        } else if (singleWord == "") {
            shouldBreak++;
            if (shouldBreak == 4) {
                styledString = styledString + '<br>&emsp;&emsp;';
            }
        } else if (singleWord.includes('*')) {
            styledString = styledString + '<br>';
        } else {
            styledString = styledString + singleWord;
            shouldBreak = 0;
        }
    }

    return styledString
}

function style_css_properties(css_code) {
    // converts the string into an array split by letters
    var cssArray = css_code.split('')
    var cssString = '';

    // Adds a space before and after each }
    for (var i = 0; i < cssArray.length; i++) {
        var cssWord = cssArray[i]
        if (cssWord == '}') {
            cssString = cssString + ' ' + cssWord + ' ';
        } else {
            cssString = cssString + cssWord;
        }
    }

    // Converts the new string into an array by words
    var newCssArray = cssString.split(' ')

    var propertyValue = false;
    var styledCssString = '';

    // Styles each word depending on what type of css it is
    for (var i = 0; i < newCssArray.length; i++) {
        var cssWord = newCssArray[i]
        if (propertyValue == true) {
            styledCssString = styledCssString + '<span class="code-value"> ' + cssWord + '</span>';
            if (cssWord.includes(';')) {
                propertyValue = false;
                styledCssString = styledCssString + '<br>'
            }
        } else if (cssWord.includes('.')) {
            styledCssString = styledCssString + '<span class="code-target">' + cssWord + '</span>';
        } else if (cssWord.includes('{')) {
            styledCssString = styledCssString + ' ' + cssWord + '<br>';
        } else if (cssWord.includes(':')) {
            styledCssString = styledCssString + '<span class="code-property">&emsp;&emsp;' + cssWord + '</span>';
            propertyValue = true;
        } else if (cssWord.includes('}')) {
            styledCssString = styledCssString + cssWord + '<br>'
        }
    }
    return styledCssString
}

function style_jquery_code(jquery_code) {
    console.log(jquery_code)
    var jqueryArray = jquery_code.split('')
    var jqueryString = '';

    for (var i = 0; i < jqueryArray.length; i++) {
        var jqueryLetter = jqueryArray[i];

        if (jqueryLetter == "(") {
            jqueryString = jqueryString + ' ' + jqueryLetter + ' ';
        } else if (jqueryLetter == ")") {
            jqueryString = jqueryString + ' ' + jqueryLetter;
        } else if (jqueryLetter == ".") {
            jqueryString = jqueryString + ' ' + jqueryLetter;
        } else if (jqueryLetter == "}") {
            jqueryString = jqueryString + ' ' + jqueryLetter;
        } else {
            jqueryString = jqueryString + jqueryLetter;
        }
    }

    var jqueryArray = jqueryString.split(' ')
    var jqueryStringStyled = '';

    // console.log(jqueryString)

    var insideBracket = 0;

    var keyWords = ['if', 'else']

    for (var i = 0; i < jqueryArray.length; i++) {
        var jqueryWord = jqueryArray[i];

        if (jqueryWord.includes('$')) {
            var tabString = '<span class="code-value">';
            for (var t = 0; t < insideBracket; t++) {
                tabString = tabString + '&emsp;&emsp;';
            }
            jqueryStringStyled = jqueryStringStyled + tabString + jqueryWord + '</span>';
        } else if (jqueryWord.includes("'")) {
            jqueryStringStyled = jqueryStringStyled + '<span class="code-css-value">' + jqueryWord + '</span>';
        } else if (jqueryWord.includes(".")) {
            jqueryStringStyled = jqueryStringStyled + '<span class="code-value">' + jqueryWord + '</span>';
        } else if (jqueryWord == 'this') {
            jqueryStringStyled = jqueryStringStyled + '<span class="code-property">' + jqueryWord + '</span>';
        } else if (jqueryWord.includes('{')) {
            jqueryStringStyled = jqueryStringStyled + ' ' + jqueryWord + '<br>' + '&emsp;&emsp;';
            insideBracket++;
        } else if (jqueryWord.includes('}')) {
            if (insideBracket == 1) {
                jqueryStringStyled = jqueryStringStyled + jqueryWord;
            } else {
                jqueryStringStyled = jqueryStringStyled + jqueryWord + '<br>';
                insideBracket--;
            }

        } else if (jqueryWord == 'function') {
            jqueryStringStyled = jqueryStringStyled + '<span class="code-property">' + jqueryWord + '</span>';
        } else if (jqueryWord.includes(';')) {
            jqueryStringStyled = jqueryStringStyled + jqueryWord + '<br>' + '&emsp;&emsp;';
        } else if (keyWords.includes(jqueryWord)) {
            var tabString = '<span class="colour-python">';
            for (var t = 0; t < insideBracket; t++) {
                tabString = tabString + '&emsp;&emsp;'
            }
            jqueryStringStyled = jqueryStringStyled + tabString + jqueryWord + '</span>';
        } else if (jqueryWord == "==") {
            jqueryStringStyled = jqueryStringStyled + ' ' + jqueryWord + ' ';
        } else {
            jqueryStringStyled = jqueryStringStyled + jqueryWord;
        }
    }

    console.log(jqueryStringStyled)
    jqueryStringStyled = '<p class="code-font">' + jqueryStringStyled + '</p>'

    return jqueryStringStyled
}

// The result for the lesson ##################
var result = `
    <p>This is the result</p>
`;

function home_slide(languages, title, description, result) {
    this.languages = languages;
    this.title = title;
    this.description = description;
    this.result = result;
}

//  For the home page add the, (languages) (title) (description) (result) #########################
var home_slide = new home_slide(['html', 'css', 'jquery'], 'Template title', 'This is a test page to speed up development', result)

var lessonLanguages = [];

if (home_slide.languages.includes('html')) {
    lessonLanguages.push('<span class="colour-html">HTML</span>')
}
if (home_slide.languages.includes('css')) {
    lessonLanguages.push('<span class="colour-css">CSS</span>')
}
if (home_slide.languages.includes('javascript')) {
    lessonLanguages.push('<span class="colour-javascript">JavaScript</span>')
}
if (home_slide.languages.includes('jquery')) {
    lessonLanguages.push('<span class="colour-jquery">Jquery</span>')
}

var homeSlide = `
                <div class="carousel-item active">
                    <!-- First side (desktop) -->
                    <div class="page-container">
                        <div class="row m-0 p-0">
                            <div class="col-12 m-0 p-0 d-flex align-items-center">
                                <img src="images/last-logo-sm.png" class="float-left" style="width:14%;">
                                <h1 class="m-0 p-0 ml-4">Development Tips</h1>
                            </div>
                            <div class="col-12 m-0 p-0">
                                <h5 class="m-0 language-lession">${lessonLanguages.join(' / ')}</h5>
                            </div>
                            <div class="col-12 top-border"></div>
                            <div class="col-12 m-0 p-0">
                                <h3 class="mt-3">${home_slide.title}</h3>
                            </div>
                            <div class="col-12 m-0 p-0">
                                <p class="text-secondary ml-3">${home_slide.description}</p>
                            </div>
                            <div class="col-12 m-0 p-0">
                                <h6 class="m-0 p-0">Result:</h6>
                            </div>
                        </div>
                        <div class="result-container pt-3">
                           ${home_slide.result}
                        </div>

                        <footer>
                            <div class="row m-0 p-0">
                                <div class="col-12 m-0 p-0 d-flex justify-content-between">
                                    <p class="m-0 p-0">fordsdevelopment@gmail.com</p>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <i class="fab fa-github mr-1"></i>
                                        <p class="m-0 p-0">github.com/Fordalex</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row m-0 p-0">
                                <div class="col-12 d-flex justify-content-between m-0 p-0">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <i class="fab fa-instagram mr-1 main-colour"></i>
                                        <p class="m-0 p-0">fordsdevelopment</p>
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <i class="fab fa-facebook-square mr-1 main-colour"></i>
                                        <p class="m-0 p-0">Fords development</p>
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <i class="fab fa-twitter-square mr-1 main-colour"></i>
                                        <p class="m-0 p-0">fordsdevelopment</p>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                    <!-- First side (mobile) -->
                    <div class="page-container-mobile">
                        <div class="container-fluid d-flex justify-content-center p-0">
                            <video width="85%" controls autoplay muted loop>
                                <source src=images/menu-transition/1.mp4 type="video/mp4" autoplay>
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <p class="mt-2 mb-0 text-center">This is being shown as a video, to inspect elements please view on desktop.</p>
                    </div>
                </div>
`;

var endSlide = `
                <div class="carousel-item">
                    <!-- Last side -->
                    <div class="page-container">
                        <div class="row m-0 p-0">
                            <div class="col-12 m-0 p-0 d-flex align-items-center">
                                <img src="images/last-logo-sm.png" class="float-left" style="width:14%;">
                                <h1 class="m-0 p-0 ml-4">Development Tips</h1>
                            </div>
                            <div class="col-12 top-border"></div>
                            <div class="col-12 m-0 p-0">
                                <h2 class="my-3">Hope This Helped Someone</h2>
                            </div>
                            <div class="col-12 m-0 p-0 my-2">
                                <p class="text-secondary big-text m-0">Please message me if you have any questions about this tip <b>or</b> requests for future posts.</p>
                            </div>

                            <div class="col-12 m-0 p-0 my-2">
                                <p class="m-0 text-secondary big-text">All the current tips can be found on <a href="https://fordalex.github.io/development-tips/">Development Tips</a>,
                                    <b>also</b> the link can be found in my bio.</p>
                            </div>
                            <div class="col-12 m-0 p-0 my-2">
                                <p class="big-text m-0 p-0  text-secondary">Visit the site if you want to copy and paste the code as I can only post these as PNG on social media.</p>
                            </div>
                            <div class="col-12 m-0 mt-3">
                                <p class="text-center"><u class="text-primary">https://fordalex.github.io/development-tips</u></p>
                            </div>
                        </div>
                        <footer>
                            <div class="row m-0 p-0">
                                <div class="col-12 m-0 p-0 d-flex justify-content-between">
                                    <p class="m-0 p-0">fordsdevelopment@gmail.com</p>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <i class="fab fa-github mr-1"></i>
                                        <p class="m-0 p-0">github.com/Fordalex</p>
                                    </div>
                                </div>
                            </div>
                            <div class="row m-0 p-0">
                                <div class="col-12 d-flex justify-content-between m-0 p-0">
                                    <div class="d-flex justify-content-center align-items-center">
                                        <i class="fab fa-instagram mr-1 main-colour"></i>
                                        <p class="m-0 p-0">fordsdevelopment</p>
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <i class="fab fa-facebook-square mr-1 main-colour"></i>
                                        <p class="m-0 p-0">Fords development</p>
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <i class="fab fa-twitter-square mr-1 main-colour"></i>
                                        <p class="m-0 p-0">fordsdevelopment</p>
                                    </div>
                                </div>
                            </div>
                        </footer>
                    </div>
                    <!-- Forth side (mobile) -->
                    <div class="page-container-mobile">
                        <div class="container-fluid d-flex justify-content-center p-0">
                            <img src="images/last-slide.png" style="width:85%; border: solid black 1px;">
                        </div>
                        <p class="mt-2 mb-0 text-center">This is being shown as a image, to inspect elements please view on desktop.</p>
                    </div>
                </div>
`;

$('#carousel-list-container').append('<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li');
$('#carousel-container').append(homeSlide);

// styles the code sections 
function informationSlide(languages) {
    this.languages = languages;
    var codeSectionArray = []
    for (let i = 0; i < languages.length; i++) {
        codeSectionArray.push(` <div class="row m-0 p-0">
                                    <div class="col-12 m-0 p-0">
                                        <h6 class="code-section-label">${languages[i]['language']}</h6>
                                        <div class="result-container-code">
                                           ${languages[i]['code']}
                                        </div>
                                    </div>
                                </div>`)
    }
    var lessonSlide = `
                        <div class="carousel-item">
                            <!-- Second side (desktop) -->
                            <div class="page-container">
                               ${codeSectionArray.join('')}
                                <footer>
                                    <div class="row m-0 p-0">
                                        <div class="col-12 m-0 p-0 d-flex justify-content-between">
                                            <p class="m-0 p-0">fordsdevelopment@gmail.com</p>
                                            <div class="d-flex justify-content-center align-items-center">
                                                <i class="fab fa-github mr-1"></i>
                                                <p class="m-0 p-0">github.com/Fordalex</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row m-0 p-0">
                                        <div class="col-12 d-flex justify-content-between m-0 p-0">
                                            <div class="d-flex justify-content-center align-items-center">
                                                <i class="fab fa-instagram mr-1 main-colour"></i>
                                                <p class="m-0 p-0">fordsdevelopment</p>
                                            </div>
                                            <div class="d-flex justify-content-center align-items-center">
                                                <i class="fab fa-facebook-square mr-1 main-colour"></i>
                                                <p class="m-0 p-0">Fords development</p>
                                            </div>
                                            <div class="d-flex justify-content-center align-items-center">
                                                <i class="fab fa-twitter-square mr-1 main-colour"></i>
                                                <p class="m-0 p-0">fordsdevelopment</p>
                                            </div>
                                        </div>
                                    </div>
                                </footer>
                            </div>
                            <!-- Second side (mobile) -->
                            <div class="page-container-mobile">
                                <div class="container-fluid d-flex justify-content-center p-0">
                                    <img src="images/menu-transition/2.png" style="width:85%; border: solid black 1px;">
                                </div>
                                <p class="mt-2 mb-0 text-center">This is being shown as a image, to inspect elements please view on desktop.</p>
                            </div>
                        </div>
                        `;
    this.html = lessonSlide;
}


// Create the slides with the information code. ###################### (* = <br>, ? = &emsp;&emsp;)

// First Page
var htmlCodeFirstSlide = style_html_element(`
<div class="container-fluid d-flex justify-content-between mt-2">
    <select class="form-control mr-2" id="sort-links">
        <option value="easyHard">Easy to Hard</option>
        <option value="hardEasy">Hard to Easy</option>
    </select>
    <button class="main-button float-right" onclick="filter()">Search</button>
</div>
`);
var cssCodefirstSlide = style_css_properties(`
.expand-button {
    background-color: rgb(24, 187, 76);
    color: white;
    padding: 5px 10px;
    border-bottom: solid rgb(21, 152, 63) 4px;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Pacifico', cursive;
}

.button-close {
    background-color: red;
    border-bottom: solid rgb(162, 14, 14) 4px;
}

.hidden-text {
    display: none;
}
`);
var firstSlide = new informationSlide([{ 'language': 'html', 'code': htmlCodeFirstSlide }, { 'language': 'css', 'code': cssCodefirstSlide }]);

// Second Page
var jqueryCodeSecondSlide = style_jquery_code(`
$('body').on('click', '.expand-button', function() {
    $(this).toggleClass('button-close');
    $(this).next('p').toggle();
});
`);
var secondSlide = new informationSlide([{ 'language': 'jquery', 'code': jqueryCodeSecondSlide }, { 'language': 'Notes:', 'code': '.toggleClass() is used to toggle the CSS class called "button-close"<br> .next() will find the next p element under .expand-button' }]);

// Each slide
var totalSlides = [firstSlide, secondSlide]

// Populates the page with the sildes
for (let i = 0; i < totalSlides.length + 1; i++) {
    if (i < totalSlides.length) {
        $('#carousel-list-container').append(`<li data-target="#carouselExampleIndicators" data-slide-to="${i + 1}"></li`);
        $('#carousel-container').append(totalSlides[i]['html']);
    } else {
        $('#carousel-list-container').append(`<li data-target="#carouselExampleIndicators" data-slide-to="${i + 1}"></li`);
        $('#carousel-container').append(endSlide);
    }
};