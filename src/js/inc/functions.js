function slick_prev(name) {
    if (name) {
        return (
            '<button type="button" class="slick-prev"><svg class="svgicon ' +
            name +
            '"><use xlink:href="img/sprite.svg#' +
            name +
            '"></use></svg></button>'
        );
    } else {
        return '<button type="button" class="slick-prev"></button>';
    }
}

function slick_next(name) {
    if (name) {
        return (
            '<button type="button" class="slick-next"><svg class="svgicon ' +
            name +
            '"><use xlink:href="img/sprite.svg#' +
            name +
            '"></use></svg></button>'
        );
    } else {
        return '<button type="button" class="slick-next"></button>';
    }
}

// detect scrollbar width
function scrollbar_measure() {
    // Create the measurement node
    let scrollDiv = document.createElement("div");
    scrollDiv.className = "scrollbar-measure";
    document.body.appendChild(scrollDiv);

    // Get the scrollbar width
    let scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;

    // Delete the DIV
    document.body.removeChild(scrollDiv);

    return scrollbarWidth;
}

// callbacks for magnificPopup to control fixed header
let mp_callbacks = {
    open: function () {
        if (scrollbar_measure() !== 0) {
            $('#header').css('right', 15);
        }
    },
    close: function () {
        if (scrollbar_measure() !== 0) {
            $('#header').removeAttr('style');
        }
    }
};
