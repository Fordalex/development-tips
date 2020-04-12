// style HTML
function html_element(start_tag, attribute, value, content, end_tag) {
    // has start tag been used
    if (start_tag == false) {
        var start_tag_input = '';
    } else {
        // has a attribute been used
        if (attribute == false) {
            var start_tag_input = '&lt;' + '<span class="code-tag">' + start_tag + '</span>' + '&gt;';
        } else {
            var start_tag_input = '&lt;' + '<span class="code-tag">' + start_tag + ' </span>' + '<span class="code-attribute">' + attribute + '</span>' + '=' + '"' + '<span class="code-value">' + value + '</span>' + '"' + '</span>' + '&gt;';
        }
    }

    // the content of the element
    if (content == false) {
        var content_input = '';
    } else {
        var content_input = content;
    }

    // has end tag been used
    if (end_tag == false) {
        var end_tag_input = '';
    } else {
        var end_tag_input = '&lt;' + '<span class="code-tag">/' + end_tag + '</span>' + '&gt;';
    }

    var string_output = '<p class="code-font text-gray">' + start_tag_input + '<span class="text-white">' + content_input + '</div>' + '<span class="text-gray">' + end_tag_input + '</span>' + '</span>';

    return string_output;
}

function html_element_tab_one(start_tag, attribute, value, content, end_tag) {
    // has start tag been used
    if (start_tag == false) {
        var start_tag_input = '';
    } else {
        // has a attribute been used
        if (attribute == false) {
            var start_tag_input = '&lt;' + '<span class="code-tag">' + start_tag + '</span>' + '&gt;';
        } else {
            var start_tag_input = '&lt;' + '<span class="code-tag">' + start_tag + ' </span>' + '<span class="code-attribute">' + attribute + '</span>' + '=' + '"' + '<span class="code-value">' + value + '</span>' + '"' + '</span>' + '&gt;';
        }
    }

    // the content of the element
    if (content == false) {
        var content_input = '';
    } else {
        var content_input = content;
    }

    // has end tag been used
    if (end_tag == false) {
        var end_tag_input = '';
    } else {
        var end_tag_input = '&lt;' + '<span class="code-tag">/' + end_tag + '</span>' + '&gt;';
    }

    var string_output = '<p class="code-font text-gray">&emsp;&emsp;' + start_tag_input + '<span class="text-white">' + content_input + '</div>' + '<span class="text-gray">' + end_tag_input + '</span>' + '</span>';

    return string_output;
}

// style CSS
function css_target(target) {
    return `<p class="code-font"><span class="code-target">${target}</span> {</p>`
}

function css_property(property, value) {
    return `<p class="code-font">&emsp;&emsp;<span class="code-property">${property}<span class="text-white">:</span></span> <span class="code-value">${value}</span>;</p>`
}

// style jquery
function jquery(target, method, value, has_function, tabs) {
    if (has_function == false) {
        var output = '<span class="code-value">$(</span><span class="code-css-value">"' + target + '"</span>).<span class="code-value">' + method + '</span>(<span class="code-css-value">"' + value + '"</span>);'
    } else {
        var output = '<span class="code-value">$(</span><span class="code-css-value">"' + target + '"</span>).<span class="code-value">' + method + '</span>(<span class="code-css-value">"' + value + '"</span>,<span class="code-property"> function</span>() {'
    }

    var tabs_input = ''
    for (i = 0; i < tabs; i++) {
        tabs_input = tabs_input + '&emsp;&emsp;'
    }

    var output = '<p class="code-font text-gray">' + tabs_input + output + '</p>'

    return output
}


// first html code
$('#html-code-first').append(html_element('div', false, false, false, false));
$('#html-code-first').append(html_element_tab_one('div', 'class', 'arrow', false, 'div'));
$('#html-code-first').append(html_element_tab_one('div', 'class', 'arrow arrow-mid', false, 'div'));
$('#html-code-first').append(html_element_tab_one('div', 'class', 'arrow arrow-bottom', false, 'div'));
$('#html-code-first').append(html_element(false, false, false, false, 'div'));

// first css code
$('#css-code-first').append(css_target('.arrow'));
$('#css-code-first').append(css_property('width', '10px'));
$('#css-code-first').append(css_property('height', '10px'));
$('#css-code-first').append(css_property('border-right', 'solid 2px'));
$('#css-code-first').append(css_property('border-bottom', 'solid 2px'));
$('#css-code-first').append(css_property('transform', 'rotate(45deg)'));
$('#css-code-first').append(css_property('animation', 'arrows 1.5s ease-in-out infinite'));
$('#css-code-first').append('}');

$('#css-code-first').append(css_target('.arrow-mid'));
$('#css-code-first').append(css_property('animation-delay', '0.5s'));
$('#css-code-first').append('}');

$('#css-code-first').append(css_target('.arrow-bottom'));
$('#css-code-first').append(css_property('animation-delay', '1s'));
$('#css-code-first').append('}');

// second css code
$('#css-code-second').append(css_target('@keyframes arrows'));
$('#css-code-second').append(css_property('transform', 'scaleX(1) translate(0px, 7px) rotateZ(-45deg)'));
$('#css-code-second').append('}');