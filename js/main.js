// scrolling navigation effect
$(function () {
    $(window).on("scroll load", function () {
        var $nav = $(".navigation__nav");
        var $box = $(".navigation__logo-box")
        $nav.toggleClass("scrolled-nav", $(this).scrollTop() > ($nav.height()) / 2);
        $box.toggleClass("scrolled-logo-box", $(this).scrollTop() > ($nav.height()) / 2);
    });
});

// responsive navbar
function selector(s) {
    return document.querySelector(s);
}

selector(".navigation__menu").addEventListener('click', function(){
    this.classList.toggle('navigation__open');
    selector(".navigation").classList.toggle('navigation__open');
    selector(".navigation__overlay").classList.toggle('navigation__open');
});



// accrodion
// $(document).ready(function(){
	$('.accordion__link').click(function(){
		$(this).next('.accordion__answer-box').slideToggle();
		$(this).parent().toggleClass('active');
		$(this).parent().siblings().children('.accordion__answer-box').slideUp();
		$(this).parent().siblings().removeClass('active');
	});
// });