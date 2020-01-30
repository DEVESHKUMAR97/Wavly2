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
    selector(".navigation__nav").classList.toggle('navigation__open');


    // changes
    var navi = $(".navigation");
    if(navi.hasClass('navigation__open-for-height')){
        setTimeout(function() {
            $(".navigation").removeClass('navigation__open-for-height');
        }, 650);
    } else {
        $(".navigation").addClass('navigation__open-for-height');
    }
    
});

$(window).resize(function(){
if ($(window).width() < 768) {
    $('.navigation').addClass('navigation__width-change');
    setTimeout(function() {
        $('.navigation').removeClass('navigation__width-change');
    }, 1000);
    
}
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