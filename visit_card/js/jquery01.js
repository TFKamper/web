(function($) {

    $.slider = {
	defaults: {
	    slideWidth: 0,		// slide width
	    selSlide: 0,		// selected slide
	    noSlides: 0,		// number of slides - this variable is automatically set
	    autoScrollTimer: 0,		// the duration after the slider changes the slide automatically (in seconds)
	    cssSelectedClass: 'on',
	    sliderContainer: '',
	    slideSpeed: 2000,
	    sliderType: 'HORIZONTAL',
	    nextButton: '',
	    prevButton: '',
	    hasNavBar: true,
	    animationType: 'easeOutQuint'
	}
    };


    $.fn.extend({
	slider:function(config) {
	    var config = $.extend({}, $.slider.defaults, config);
	    config.sliderContainer = this.attr('id');
	    initializeSlider(config);
	    return this;
	}
    });


    function initializeSlider(config) {
	config.noSlides = $('#'+config.sliderContainer).find('.slide').length;
	if ( 'HORIZONTAL' == config.sliderType ) {
	    $('#'+config.sliderContainer).css({
		'overflow': 'hidden'
	    });
	    $('#'+config.sliderContainer).wrapInner('<div id="slider-band" />');
	    $('#slider-band').css('width', config.slideWidth * config.noSlides);
	}

	if ( 'FADE' == config.sliderType ) {
	    $('.slider').css('position', 'absolute');
	    var slides = $("#"+config.sliderContainer).find('div.slide');
	    slides.css({
		'position': 'absolute',
		'display': 'none'
	    });
	    slides.eq(config.selSlide).css({
		'display': 'block'
	    })
	}

	if ( '' != config.prevButton && '' != config.nextButton ) {
	    $("#"+config.prevButton).click(function() {
		prevSlide(config);
		return false;
	    });
	    $("#"+config.nextButton).click(function() {
		nextSlide(config);
		return false;
	    });
	}

	startSlider(config);
    }


    function animate(toIndex, config) {
	margin = toIndex * config.slideWidth * (-1);
	$('#slider-band').animate( {
	    marginLeft : margin + 'px'
	}, config.slideSpeed,
	config.animationType);
    }


    function animateFade(toIndex, speed, config) {
	var elem = $("#"+config.sliderContainer).find('div.slide').eq(config.selSlide);
	var toElem = $("#"+config.sliderContainer).find('div.slide').eq(toIndex);
	elem.fadeOut(speed, function() {
	});
	toElem.fadeIn(speed);
    }


    function createNavBar(config) {
	var sliderWrapper = $('#' + config.sliderContainer);
	var noS = config.noSlides;
	var navigator = '<ul id="slider-nav">';

	for ( i = 0 ; i < noS ; i++ ) {
	    navigator += "<li><a href='#' id='link" + i + "'>"+ (i + 1) +"</a></li>";
	}

	navigator += "</ul>";
	sliderWrapper.before(navigator);

	$("#slider-nav").css({
	    'position': 'absolute'
	});
    }


    function startSlider(config) {
	if ( config.hasNavBar == true ) {
	    createNavBar(config);
	}
	var elem = $("#slider-nav").find("li a");
	elem.addClass('png');
	elem.eq(config.selSlide).addClass(config.cssSelectedClass);

	$(elem).click(function() {
	    if (config.selSlide != elem.index($(this))) {
		if ( 'HORIZONTAL' == config.sliderType ) {
		    animate(elem.index($(this)), config);
		} else {
		    animateFade(elem.index($(this)), config);
		}
		elem.eq(config.selSlide).removeClass(config.cssSelectedClass);
		$(this).addClass(config.cssSelectedClass);
		config.selSlide = elem.index($(this));
	    }
	    return false;
	});

	if ( config.autoScrollTimer > 0 ) {
	    setInterval(function() {
		nextSlide(config);
	    }, config.autoScrollTimer * 1000);
	}
    }

    function nextSlide(config) {
	var prev = config.selSlide;
	var next = config.selSlide + 1;
	if ( next > config.noSlides - 1 ) {
	    next = 0;
	    prev = config.noSlides - 1;
	}
	onClick(config, prev, next);
	config.selSlide = next;
    }

    function prevSlide(config) {
	var prev = config.selSlide;
	var next = config.selSlide - 1;
	if ( next < 0 ) {
	    next = config.noSlides - 1;
	    prev = 0;
	}
	onClick(config, prev, next);
	config.selSlide = next;
    }


    function onClick(config, prev, next) {

	if ( 'HORIZONTAL' == config.sliderType ) {
	    animate(next, config);
	} else {
	    animateFade(next, config);
	}
	var elem = $("#slider-nav").find("li a");
	elem.eq(prev).removeClass(config.cssSelectedClass);
	elem.eq(next).addClass(config.cssSelectedClass);
    }


})(jQuery);

