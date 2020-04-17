$('body').on('click', '.expand-button', function() {
    $(this).toggleClass('button-close')
    $(this).next('p').toggle()
    if ($(this).text() == 'Expand') {
        $(this).text('Close')
    } else {
        $(this).text('Expand')
    }
});