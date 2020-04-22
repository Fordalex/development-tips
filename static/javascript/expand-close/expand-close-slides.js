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
    console.log(styledString)
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
    console.log(styledCssString)
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
        } else if (jqueryWord.includes('var')) {
            var tabString = '<span class="code-property">';
            for (var t = 0; t < insideBracket; t++) {
                tabString = tabString + '&emsp;&emsp;';
            }
            jqueryStringStyled = jqueryStringStyled + tabString + jqueryWord + ' </span>';
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
const result = `<div class="row m-0 p-0">
<div class="col-12 m-0 p-0 d-flex justify-content-center">
    <button class="expand-button" id="button">Expand</button>
</div>
<div class="col-12 m-0 p-0 d-flex justify-content-center">
    <p class="button-text m-0">Hidden Information!</p>
</div>
</div>
`;

function home_slide(languages, title, description, result) {
    this.languages = languages;
    this.title = title;
    this.description = description;
    this.result = result;
}

//  For the home page add the, (languages) (title) (description) (result) #########################
var home_slide = new home_slide(['html', 'css', 'jquery'], 'Expand to close', 'A simple way to show and hide a message, also to change the button colour and text.', result)

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
                                <p class="text-secondary ml-3 mb-0">${home_slide.description}</p>
                            </div>
                            <div class="col-12 m-0 p-0">
                                <h6 class="mb-0 p-0">Result:</h6>
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
                                <source src=images/expand-close/1.mp4 type="video/mp4" autoplay>
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
                                    <img src="images/expand-close/${languages[0]['image']}" style="width:85%; border: solid black 1px;">
                                </div>
                                <p class="mt-2 mb-0 text-center">This is being shown as a image, to inspect elements please view on desktop.</p>
                            </div>
                        </div>
                        `;
    this.html = lessonSlide;
}


// Create the slides with the information code. ###################### (* = <br>, ? = &emsp;&emsp;)

// First Page
var htmlCodeFirstSlide = `
&lt;<span class="code-tag">button</span><span class="code-attribute"> class</span>="<span class="code-value">expand-button</span>"<span class="code-attribute"> id</span>="<span class="code-value">button</span>"&gt;Expand&lt;<span class="code-tag">/button</span>&gt;<br>&lt;<span class="code-tag">p</span><span class="code-attribute"> class</span>="<span class="code-value">button-text</span>"&gt;Hidden Information!&lt;<span class="code-tag">/p</span>&gt;
`;
var cssCodefirstSlide = `
<span class="code-target">
button:focus</span> {
<br><span class="code-property">&emsp;&emsp;outline:</span><span class="code-value"> none;
</span><br>}<br><span class="code-target">

.expand-button</span> {
<br><span class="code-property">&emsp;&emsp;background-color:</span><span class="code-value"> rgb(24,</span><span class="code-value"> 187,</span><span class="code-value"> 76);
</span><br><span class="code-property">&emsp;&emsp;color:</span><span class="code-value"> white;
</span><br><span class="code-property">&emsp;&emsp;padding:</span><span class="code-value"> 5px</span><span class="code-value"> 10px;
</span><br><span class="code-property">&emsp;&emsp;border-bottom:</span><span class="code-value"> solid</span><span class="code-value"> rgb(21,</span><span class="code-value"> 152,</span><span class="code-value"> 63)</span><span class="code-value"> 4px;
</span><br><span class="code-property">&emsp;&emsp;border-radius:</span><span class="code-value"> 5px;
</span><br><span class="code-property">&emsp;&emsp;cursor:</span><span class="code-value"> pointer;
</span><br><span class="code-property">&emsp;&emsp;font-family:</span><span class="code-value"> 'Pacifico',</span><span class="code-value"> cursive;
</span><br>}<br><span class="code-target">

.button-close</span> {
<br><span class="code-property">&emsp;&emsp;background-color:</span><span class="code-value"> red;
</span><br><span class="code-property">&emsp;&emsp;border-bottom:</span><span class="code-value"> solid</span><span class="code-value"> rgb(162,</span><span class="code-value"> 14,</span><span class="code-value"> 14)</span><span class="code-value"> 4px;
</span><br>}<br><span class="code-target">

.button-text</span> {
<br><span class="code-property">&emsp;&emsp;display:</span><span class="code-value"> none;
</span><br>}<br>
`;
var firstSlide = new informationSlide([{ 'language': 'html', 'code': htmlCodeFirstSlide, 'image': '2.png' }, { 'language': 'css', 'code': cssCodefirstSlide }]);

// Second Page
var jqueryCodeSecondSlide = `
<span class="code-value">
$</span>(<span class="code-css-value">'</span><span class="code-css-value">.expand-button'</span>)<span class="code-value">.on</span>(<span class="code-css-value">'click',</span><span class="code-property">function</span>() {
<br>&emsp;&emsp;<span class="code-value">&emsp;&emsp;$</span>(<span class="code-property">this</span>)<span class="code-value">.toggleClass</span>(<span class="code-css-value">'button-close'</span>);
<br>&emsp;&emsp;<span class="code-property">&emsp;&emsp;var </span><span class="variable-colour">targetElement</span> = <span class="code-css-value">'</span><span class="code-css-value">.'</span><span class="code-value">.concat</span>(<span class="code-property">this</span><span class="code-value">.id,</span><span class="code-css-value">'-text'</span>);
<br>&emsp;&emsp;<span class="code-value">&emsp;&emsp;$</span>(<span class="variable-colour">targetElement</span>)<span class="code-value">.toggle</span>();
<br>&emsp;&emsp;<span class="colour-python">&emsp;&emsp;if&emsp;</span>(<span class="code-value">$</span>(<span class="code-property">this</span>)<span class="code-value">.text</span>() == <span class="code-css-value">'Expand'</span>) {
<br>&emsp;&emsp;<span class="code-value">&emsp;&emsp;&emsp;&emsp;$</span>(<span class="code-property">this</span>)<span class="code-value">.text</span>(<span class="code-css-value">'Close'</span>);
<br>&emsp;&emsp;&emsp;&emsp;}<span class="colour-python">&emsp;else</span> {
<br>&emsp;&emsp;<span class="code-value">&emsp;&emsp;&emsp;&emsp;$</span>(<span class="code-property">this</span>)<span class="code-value">.text</span>(<span class="code-css-value">'Expand'</span>);
<br>&emsp;&emsp;&emsp;&emsp;}
<br>});<br>&emsp;&emsp;
`;
var secondSlide = new informationSlide([{ 'language': 'jquery', 'code': jqueryCodeSecondSlide, 'image': '3.png' }, { 'language': 'Notes:', 'code': '"this" will just mean the element that has been clicked on, which has the class of ".expand-button" and the id of this element is "button", putting ".".concat(this.id,"-text") this returns ".button-text" we are storing this value inside of a variable called "targetElement" and using Jquery to find the element with this class. Finally, we toggle the view of this element using .toggle() which if you take a look at the html elements you will find the p element with this class. By using "this" you dont have to change the javascript file and only have to change the names of the id and class for your chosen elements.' }]);

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