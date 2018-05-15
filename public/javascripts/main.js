$(document).ready(function(){

	var date = new Date(2018, 5, 18);
	var now = new Date();
	var diff = (date.getTime()/1000) - (now.getTime()/1000);

	console.log(diff);

	$('.counter').FlipClock(diff, {
		clockFace: 'DailyCounter',
		countdown: true,
		language: 'spanish'
	});

	$(".flip > ul > li > a").attr("disabled", "disabled");

	if ($(window).scrollTop() >= $('.parallax-container').height() - 140) {
		$('nav .brand-logo > img').css("height", "48px");
		$('nav .brand-logo').css({"margin": "0 64px", "height": "64px"});
	} else {
		$('nav .brand-logo > img').css("height", "120px");
		$('nav .brand-logo').css({"margin": "	24px 64px", "height": "auto"});
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

	$(".sidenav").sidenav({
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

		if ($(window).scrollTop() >= $('.parallax-container').height() - 140) {
			$('nav .brand-logo > img').css("height", "48px");
			$('nav .brand-logo').css({"margin": "0 64px", "height": "64px"});
		} else {
			$('nav .brand-logo > img').css("height", "120px");
			$('nav .brand-logo').css({"margin": "24px 64px", "height": "auto"});
		}
	});

});

$( window ).on('load', function() {

	$(".loader-background").fadeOut("slow", function () {
	});

});
