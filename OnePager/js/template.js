//plugin
jQuery.fn.topLink = function(settings) {
	settings = jQuery.extend({
		min: 1,
		fadeSpeed: 200
	}, settings);
	return this.each(function() {
		//listen for scroll
		var el = $(this);
		el.hide(); //in case the user forgot
		$(window).scroll(function() {
			if ($(window).scrollTop() >= settings.min) {
				el.fadeIn(settings.fadeSpeed);
			} else {
				el.fadeOut(settings.fadeSpeed);
			}
		});
	});
};

function hide() {

	var scrollPosition = $(window).scrollTop();
	$('.logo_container').css('opacity', ((120 - scrollPosition / 2) * 0.01));

}

$(document).ready(function() {

	$(window).on('scroll', function(e) {
		hide();
	});

	jQuery(function($) {
		"use strict";

		// Background Parallax
		var $window = $(window);
		$('section[data-type="parallax"]').each(function() {

			var $obj = $(this);
			var offset = $obj.offset().top;

			$(window).scroll(function() {
				offset = $obj.offset().top;

				if ($window.scrollTop() > (offset - window.innerHeight)) {
					var yPos = -(($window.scrollTop() - offset) / 3);
					var coords = '50% ' + (yPos) + 'px';
					$obj.css({
						backgroundPosition: coords
					});
				}
			});
			$(window).resize(function() {
				offset = $obj.offset().top;
			});
		});


	});

	/*	Waypoints
	================================================== */

	var lastId,
	topMenu = $('.navbar-collapse :not([data-toggle="dropdown"]):not([data-toggle="collapse"])'),
		topMenuHeight = topMenu.outerHeight() - 1,
		menuItems = topMenu.find('a'),
		scrollItems = menuItems.map(function() {
			var item = $($(this).attr("href"));
			if (item.length) {
				return item;
			}
		});

	menuItems.click(function(e) {
		var href = $(this).attr("href"),
			offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
		$('html, body').stop().animate({
			scrollTop: offsetTop
		}, 500);
		e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function() {
		var fromTop = $(this).scrollTop() + topMenuHeight;

		var cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop) return this;
		});
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			menuItems.parent().removeClass("active")
				.end().filter("[href=#" + id + "]").parent().addClass("active");
		}
	});

	/*	Progress-Bars
	================================================== */

	$(window).scroll(function() {
		var progress = $('.progress');
		var progressbar = $('.progress-bar');
		var position = progressbar.offset().top;
		var topOfWindow = $(window).scrollTop();

		if (position < topOfWindow + 320) {
			progress.css({
				visibility: 'visible'
			});
			progressbar.css({
				visibility: 'visible'
			});
			progressbar.addClass('animateBar');
		}
	});

	/*	ToTop Link
	================================================== */
	$('#top-link').topLink({
		min: 1000,
		fadeSpeed: 500
	});
	// smoothscroll
	$('#top-link').click(function(e) {
		e.preventDefault();
		$('body,html').animate({
			scrollTop: 0
		}, 600);
	});

	/*	Animate.css
	================================================== */
	jQuery(function($) {
		$("[data-animation]").each(function() {
			var $this = $(this);
			$this.addClass("animation");
			if ($(window).width() > 767) {
				$this.appear(function() {
					var delay = ($this.attr("data-animation-delay") ? $this.attr("data-animation-delay") : 1);
					if (delay > 1) $this.css("animation-delay", delay + "ms");
					$this.addClass($this.attr("data-animation"));
					setTimeout(function() {
						$this.addClass("animation-visible");
					}, delay);
				});
			} else {
				$this.addClass("animation-visible");
			}
		});
	});

});