$(document).ready(function(){

	if ($(window).scrollTop() >= $('.parallax-container').height() - 116) {
		$('nav .brand-logo > img').css("height", "48px");
		$('nav .brand-logo').css("margin", "0 64px");
	} else {
		$('nav .brand-logo > img').css("height", "120px");
		$('nav .brand-logo').css("margin", "24px 64px");
	}

	if ( $(window).scrollTop() >= $('.parallax-container').height() - 64) {
		$('nav').addClass('blue-grey');
		$('nav').addClass('darken-4');
		$('nav').removeClass('transparent');
	} else {
		$('nav').addClass('transparent');
		$('nav').removeClass('blue-grey');
		$('nav').removeClass('darken-4');
	}

	$(".button-collapse").sideNav({
		closeOnClick: true
	});

	$('.parallax').parallax();

	$('a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.click(function(event) {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				event.preventDefault();
				$('html, body').animate({
					scrollTop: target.offset().top
				},
				500,
				function() {
					var $target = $(target);
					$target.focus();
					if ($target.is(":focus")) {
						return false;
					}
					else {
						$target.attr('tabindex','-1');
						$target.focus();
					};
				});
			}
		}
	});

	$(window).scroll(function() {
		if ( $(window).scrollTop() >= $('.parallax-container').height() - 64) {
			$('nav').addClass('blue-grey');
			$('nav').addClass('darken-4');
			$('nav').removeClass('transparent');
		} else {
			$('nav').addClass('transparent');
			$('nav').removeClass('blue-grey');
			$('nav').removeClass('darken-4');
		}

		if ($(window).scrollTop() >= $('.parallax-container').height() - 116) {
			$('nav .brand-logo > img').css("height", "48px");
			$('nav .brand-logo').css("margin", "0 64px");
		} else {
			$('nav .brand-logo > img').css("height", "120px");
			$('nav .brand-logo').css("margin", "24px 64px");
		}
	});

});
