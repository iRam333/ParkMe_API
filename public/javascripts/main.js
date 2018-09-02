$(document).ready(function(){

	/*Scroll Reveal items*/
	ScrollReveal({distance: '80px', delay: 150});

	ScrollReveal().reveal('.izq');
	ScrollReveal().reveal('.der');
	ScrollReveal().reveal('.what-description');
	ScrollReveal().reveal('.what-feature', {interval: 300, delay: 300});

	ScrollReveal().reveal($('.func-section img'));
	ScrollReveal().reveal($('.func-section .right-align'), {origin: 'left'});
	ScrollReveal().reveal($('.func-section .left-align'), {origin: 'right'});

	ScrollReveal().reveal($('.how-section .phone'));
	ScrollReveal().reveal($('.how-section .how-features'), {interval: 300, delay: 300});

	ScrollReveal().reveal($('.who-section .photo'));

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

});
