$(document).ready(function() {
    var cache = new Array();
    preloadImages('images/back-to-menu-over.png', 'images/controller-option-over.png', 'images/button-left-over.png', 'images/button-right-over.png');
    Cufon.replace('#root .controller-links li a span, #big-screen .page h2');
    screenAnimation();
    workInit();
    lightboxInit();
    contactFormInit();
    function preloadImages() {
	var arg = arguments.length, img;
	for ( var i = 0; i < arg ; i++ ) {
	    img = document.createElement('img');
	    img.src = arguments[i];
	    cache.push(img);
	}
    }
});

function workInit() {
    $("#slider-wrapper").slider({
	slideWidth: 600,
	slideSpeed: 1500,
	autoScrollTimer: 0,
	hasNavBar: true
    });
}

function screenAnimation() {
    $('#website-controller ul.controller-links li a').click(function(e) {
	e.preventDefault();
	var selPage = $(this).attr('title');
	openScreen(selPage);
    });

    $('#big-screen a.back-to-menu').click(function(e) {
	e.preventDefault();
	closeScreen();
    });
}

function openScreen(pageName) {
    $('#big-screen').animate({
	top: 86 + 'px'
    }, 600, 'easeOutQuart', function() {
	$('#big-screen .page#'+ pageName).fadeIn(300);
    });
}

function closeScreen() {
    $('#big-screen').animate({
	top: -640 + 'px'
    }, 700, 'easeInQuart');
    $('#big-screen .page').fadeOut(300);
}


function contactFormInit() {
    $('#contact-name').focusin(function() {
	if ( $(this).val() == 'Name (required)' ) {
	    $(this).val('');
	}
    });
    $('#contact-name').focusout(function() {
	if ( $(this).val().trim() == '' ) {
	    $(this).val('Name (required)');
	}
    });
    $('#contact-email').focusin(function() {
	if ( $(this).val() == 'Email (required)' ) {
	    $(this).val('');
	}
    });
    $('#contact-email').focusout(function() {
	if ( $(this).val().trim() == '' ) {
	    $(this).val('Email (required)');
	}
    });
    $('#contact-subject').focusin(function() {
	if ( $(this).val() == 'Subject (required)' ) {
	    $(this).val('');
	}
    });
    $('#contact-subject').focusout(function() {
	if ( $(this).val().trim() == '' ) {
	    $(this).val('Subject (required)');
	}
    });
    $('#contact-message').focusin(function() {
	if ( $(this).val() == 'Message (required)' ) {
	    $(this).val('');
	}
    });
    $('#contact-message').focusout(function() {
	if ( $(this).val().trim() == '' ) {
	    $(this).val('Message (required)');
	}
    });

    $('#send-email-button').click(function(e) {
	e.preventDefault();
	$.post('email.php', {
	    name: $('#contact-name').val(),
	    email: $('#contact-email').val(),
	    subject: $('#contact-subject').val(),
	    message: $('#contact-message').val()
	}, function(data) {
	    var response = '<div class="output-messages">'+ data +'</div>';
	    $('#contact-form div.output-messages').remove();
	    $('#contact-form').prepend(response);
	    $('#contact-form div.output-messages').hide().fadeIn(500);
	})
    });
}


function lightboxInit() {
    $('a[rel*=lightbox]').lightBox();
}


String.prototype.trim = function() {
    a = this.replace(/^\s+/, '');
    return a.replace(/\s+$/, '');
};