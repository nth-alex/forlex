$(document).ready(function () {
    svg4everybody();

    $('#hero-slider').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        const headerClass = $(slick.$slides[nextSlide]).find('.slide-bg--two').length ? 'white' : 'black';
        const arrowColor = $(slick.$slides[nextSlide]).find('.slide-bg--one').length ? 'white' : 'black';
        $('#header').removeClass().toggleClass(headerClass);
        $('.slider-controls')
            .removeClass()
            .addClass('slider-controls')
            .toggleClass(arrowColor);
    }).slick({
        prevArrow: slick_prev('arrow-left'),
        nextArrow: slick_next('arrow-right'),
        rows: 0,
        autoplay: true,
        speed: 800,
        autoplaySpeed: 5000,
        pauseOnHover: false,
        dots: true,
        fade: true,
        appendArrows: $('.slider-controls .slick-arrows'),
        appendDots: $('.slider-controls .slider-dots')
    });

    $('.hamburger').on('click', function () {
        $('body').addClass('menu-active');
        $(this).addClass('is-active');
    });
    $('.mobile-menu-overlay').on('click', function () {
        $('body').removeClass('menu-active');
        $('.hamburger').removeClass('is-active');
    });
    $('.menu-item').on('click', function () {
        $('.hamburger').removeClass('is-active');
        $('body').removeClass('menu-active');
    });

    // insert span inside button form hover effect
    $('.button-1').wrapInner('<span></span>');

    // select2 plugin
    $('.select-1').select2({
        dropdownPosition: 'below',
        minimumResultsForSearch: Infinity,
        theme: 'drp'
    });

    // select2 plugin
    $('.select-2').select2({
        dropdownPosition: 'below',
        minimumResultsForSearch: Infinity,
        theme: 'dd'
    });

    // magnific popup plugin
    $('.open-modal').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        mainClass: 'mfp-zoom-in',
        callbacks: mp_callbacks
    });

    // accordion
    $('.accordion-item__title').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).next().slideUp();
            return;
        }
        let items = $(this).parents('.accordion-group').find('.accordion-item');
        items.find('.accordion-item__title').removeClass('active');
        items.find('.accordion-item__body').slideUp();
        $(this).addClass('active');
        $(this).next().slideDown();
    });

    // form
    $('.empty-check').each(function () {
        let input = $(this).find('.form-item input');
        let button = $(this).find('button[type="submit"]');
        let inputFilled = false;


        input.on('keyup', function () {
            input.each(function () {
                inputFilled = $(this).val().length !== 0;
            });
            if (inputFilled) {
                button.attr('disabled', false);
            } else {
                button.attr('disabled', 'disabled');
            }
        });
    });

    // tabs
    $('.tabs').each(function () {
        let tabContent = $(this).find('.tab-content');

        $('.tabs__tab').on('click', function (e) {
            e.preventDefault();
            tabContent.removeClass('active');
            $('.tabs__tab').removeClass('active');

            $(this).addClass('active');
            $($(this).attr('href')).addClass('active');
        });
    });

    // show password
    $('.password-item').on('click', '.toggle-icon', function () {
        let icon = $(this);
        let input = icon.parent().find('input');
        let inputType = input.attr('type');

        input
            .attr('type', inputType === 'password' ? 'text' : 'password');
        icon
            .find('use')
            .attr('xlink:href', 'img/sprite.svg#' + (inputType === 'text' ? 'eye-hide' : 'eye'));
    });

    // copy ref to clipboard
    $('button.copy-ref').on('click', function () {
        let copyText = document.getElementById('ref-input');
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        document.execCommand("copy");
    });


    // add new input field
    let fieldCounter = 1;
    $('.add-field').on('click', function () {
        let parent = $(this).parent();
        let fieldName = parent.find('input').attr('name');
        let number = fieldName + '-' + fieldCounter++;

        parent.after('<div class="input-plus">' +
            '<input type="text" class="form-input" name="' + number + '">' +
            '<button type="button" class="remove-field">+</button>' +
            '</div>');
    });
    $(document).on('click', '.remove-field', function () {
        fieldCounter = 0;
        $(this).parent().remove();
    });

    // call button
    $(document).on('scroll', function () {
        if ($(this).scrollTop() > $(window).outerHeight()) {
            $('.call-pulse').addClass('visible');
        } else {
            $('.call-pulse').removeClass('visible');
        }
    });
    $('.call-pulse__close').on('click', function () {
        $(this).parent().remove();
    });

    // request form steps
    $('#request-form').each(function () {
        let form = $(this);
        let next_button = form.find('.btn-change-step');

        next_button.on('click', function () {
            let id = $(this).data('stepid');
            form.removeClass();
            form.addClass('step-' + id);
        });
    });

    // drop right select
    $('.drop-right').each(function () {
        let self = $(this);
        let current = self.find('.drop-right__current');
        let checked = self.find('input:checked').parent().text().trim();
        let options = self.find('.drop-right__options');
        let labels = self.find('label');
        let paddingLeft = 75;
        let paddingRight = 30;

        // set initial value
        current.text(checked);

        // set on click value
        self.find('label').on('click', function () {
            current.text($(this).text().trim());
            options.css('padding-left', 0).removeClass('active');
            options.stop().animate({
                width: '93px'
            }, 100);
        });

        // handle hover
        self.on('mouseenter', function () {
            let width = labels.toArray().reduce((acc, item) => {
                return acc + item.offsetWidth;
            }, 0);
            options.css('padding-left', paddingLeft).addClass('active');
            options.stop().animate({
                width: width + paddingLeft + paddingRight
            }, 150);
        });
        self.on('mouseleave', function () {
            options.css('padding-left', 0).removeClass('active');
            options.stop().animate({
                width: '93px'
            }, 150);
        });
    });

    // file upload
    $('.upload-1').each(function () {
        const self = $(this);
        const input = self.find('input[type="file"]');
        const status = self.find('.upload-1__status');

        input.on('change', function (e) {
            const files = e.target.files;
            if (files && files[0]) {
                self.addClass('uploaded');
                self.find('.filename').text(files[0].name);
                status.text(status.data('text'));
            }
        });
    });

    // leaflet map
    $.getJSON('js/world.geo.json', function (data) {
        const countries = {
            'Mexico': 'Мексика',
            'United Kingdom': 'Вликобритания',
            'Singapore': 'Сингапур',
            'Estonia': 'Эстония',
            'Gibraltar': 'Гибралтар',
            'Sweden': 'Швейцария',
            'Poland': 'Польша',
            'Belize': 'Белиз',
            'Bulgaria': 'Болгария',
            'Hungary': 'Венгрия',
            'Virgin Islands': 'Виргинские Острова',
            'Hong Kong': 'Гонког',
            'Georgia': 'Грузия',
            'Dominicana': 'Доминикана',
            'Ireland': 'Ирландия',
            'Cayman Islands': 'Каймановы Острова',
            'Cyprus': 'Кипр',
            'Lithuania': 'Латвия',
            'Malta': 'Мальта',
            'Netherlands': 'Нидерланды',
            'New Zealand': 'Новая Зеландия',
            'Panama': 'Панама',
            'Portugal': 'Португалия',
            'Seychelles': 'Сейшелы',
            'Slovakia': 'Словакия',
            'United States': 'США',
            'Czech Rep.': 'Чехия',
        };
        const map = L.map('map', {
            center: [36.914764, 4.464844],
            zoom: 2,
            zoomControl: false,
            dragging: false,
            keyboard: false,
            scrollWheelZoom: false,
        });

        const geojson = L.geoJson(data, {
            style: {
                stroke: true,
                color: '#fff',
                weight: 1,
                fill: true,
                fillColor: '#ddd',
                fillOpacity: 1
            },
            onEachFeature: function (feature, layer) {
                const name = feature.properties.name;
                if (Object.keys(countries).includes(name)) {
                    const loc_name = countries[name];
                    $('.countries').append('<button value="' + name + '" class="countries__item">' + loc_name + '</button>');
                }
                layer._leaflet_id = name;
            }
        }).addTo(map);

        $(document)
            .on('mouseenter', '.countries__item', function (e) {
                const layer = geojson.getLayer(e.target.value);
                layer.setStyle({
                    stroke: false,
                    fill: true,
                    fillColor: '#7747bc',
                    fillOpacity: 1
                });
            })
            .on('mouseout', function () {
                geojson.resetStyle();
            });

    });
});
