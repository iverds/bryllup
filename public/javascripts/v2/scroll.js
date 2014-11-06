$(function() {
    var scrolling = false;
    $(".menu-link").on("click", function(e) {
      e.preventDefault();
      scroll($("." + $(e.currentTarget).data("menu-button")));
      return false;
    })

    $(window).bind('mousewheel', function(event, delta) {
      $.each($(".slide"), function(k,v) {
        if($("body").scrollTop() > $(v).offset().top - $(v).height()/2 && $("body").scrollTop() < $(v).offset().top + $(v).height()/2) {
          $(".menu-link").css("opacity", "0.5");
          $(".menu-" + $(v).data("slide")).css("opacity", "1");
        }
      });
    });

    function scroll(nextSlide) {
      if(!scrolling && nextSlide.length !== 0) {
        scrolling = true;
        $(".menu-link").css("opacity", "0.5");
        $(".menu-" + nextSlide.data("slide")).css("opacity", "1");
        $("html, body").animate({
          scrollTop: nextSlide.offset().top
        }, 2000, function() {
          scrolling = false;
        });
      }
    }
  });
