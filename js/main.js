// scrolling navigation effect
$(function () {
    $(document).scroll(function () {
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

selector(".menu").addEventListener('click', function(){
    this.classList.toggle('Open');
    selector("header").classList.toggle('open');
    selector(".overlay").classList.toggle('open');
});