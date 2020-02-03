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
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function(){
      var item = $($(this).attr("href"));
      if (item.length) { return item; }
    });

// // Bind click handler to menu items
// // so we can get a fancy scroll animation
// menuItems.click(function(e){
//   var href = $(this).attr("href"),
//       offsetTop = (href === "#head" || href === "index.html") ? 0 : $(href).offset().top-topMenuHeight+1;
//     // offsetTop = 0;
//   $('html, body').stop().animate({ 
//       scrollTop: offsetTop
//   }, 300);
//   e.preventDefault();
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