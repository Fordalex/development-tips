$('body').on('click', '.expand-button', function() {
    $(this).toggleClass('button-close');
    var targetElement = '.'.concat(this.id, '-text')
    $(targetElement).toggle();
    if ($(this).text() == 'Expand') {
        $(this).text('Close');
    } else {
        $(this).text('Expand');
    }
});