// 1. scrolling navigation effect
$(function () {
    $(window).on("scroll load", function () {
        var $nav = $(".navigation__nav");
        var $box = $(".navigation__logo-box")
        $nav.toggleClass("scrolled-nav", $(this).scrollTop() > ($nav.height()) / 2);
        $box.toggleClass("scrolled-logo-box", $(this).scrollTop() > ($nav.height()) / 2);
    });
});




// 2. responsive navbar
function selector(s) {
    return document.querySelector(s);
}
selector(".navigation__menu").addEventListener('click', function(){
    this.classList.toggle('navigation__open');
    selector(".navigation").classList.toggle('navigation__open');
    selector(".navigation__overlay").classList.toggle('navigation__open');
    selector(".navigation__nav").classList.toggle('navigation__open');
});


// 3. accrodion
// $(document).ready(function(){
	$('.accordion__link').click(function(){
		$(this).next('.accordion__answer-box').slideToggle();
		$(this).parent().toggleClass('active');
		$(this).parent().siblings().children('.accordion__answer-box').slideUp();
		$(this).parent().siblings().removeClass('active');
	});
// });





// 4. active navbar list
// Cache selectors
var lastId,
    topMenu = $("#top-menu"),
    topMenuHeight = topMenu.outerHeight() + 15 - 103,
    // All list items
    menuItems = topMenu.find('a[href^="#"]'),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
// menuItems.click(function(e){
//     var href = $(this).attr("href"),
//         // offsetTop = (href === "#head" || href === "index.html") ? 0 : $(href).offset().top-topMenuHeight+1;  
//         offsetTop = $(href).offset().top-topMenuHeight+1;

//     $('html, body').stop().animate({ 
//         scrollTop: offsetTop
//     }, 100);
//     e.preventDefault();
// });

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : "";
   
   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass("active")
         .end().filter("[href='#"+id+"']").parent().addClass("active");
   }                   
});

// 6.jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $(document).on('click', 'a.page-scroll', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 100, 'easeInOutExpo');
        event.preventDefault();
    });
});


// 7. popups
const openPopupButtons = document.querySelectorAll('[data-popup-target]');
const closePopupButtons = document.querySelectorAll('[data-close-button]');
const popupOverlay = document.getElementsByClassName('popup__overlay')[0];

openPopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = document.querySelector(button.dataset.popupTarget);
      openPopup(popup);
    });
  });
  
  popupOverlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.popup__active');
    popups.forEach(popup => {
      closePopup(popup);
    });
  });
  
  closePopupButtons.forEach(button => {
    button.addEventListener('click', () => {
      const popup = button.closest('.popup');
      closePopup(popup);
    });
  });
  
  function openPopup(popup) {
    if (popup == null) return;
    popup.classList.add('popup__active');
    popupOverlay.classList.add('popup__active');
  }
  
  function closePopup(popup) {
    if (popup == null) return;
    popup.classList.remove('popup__active');
    popupOverlay.classList.remove('popup__active');
  }