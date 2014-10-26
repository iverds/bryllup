$(function() {
    var scrolling = false;
    var menu = {"main" : {"number" : 0}, "friday": {"number" : 1}, "saturday": {"number" : 2}, "sunday": { "number" : 3}}
    $(window).bind('mousewheel', function(event, delta) {
      if(event.originalEvent.wheelDelta <= 0 ) {
        scrollNext();
      }
      else {
        scrollPrev();
      }
      return false;
    });



    $(".menu-circle").on("click", function(e) {
      e.preventDefault();
      scroll($("." + $(e.currentTarget).data("menu-button")));
      return false;
    })


    $(document).on('keypress',scrollKeys);
    $(document).on('keydown',scrollKeys);


    function scrollKeys(e) {
      e.preventDefault();
      if(e.keyCode == 40) {
        scrollNext();
      } else if (e.keyCode == 38) {
        scrollPrev();
      }
    }
    
    function calculatePosition(slide) {
      return "-" + (slide.number * 100 + slide.number *2) + "%"
    }

    function scroll(nextActive) {
      if(!scrolling) {
        scrolling = true;
        $(".menu-circle").css("opacity", "0.5")
        var currentActive = $(".active")
        var slide = menu[nextActive.data("slide")];
        $(".wrapper").animate({
          top: calculatePosition(slide),
        }, 2000, function() {
          nextActive.addClass("active")
          currentActive.removeClass("active")
          $(".menu-" + nextActive.data("slide")).css("opacity", "1");
          scrolling = false;
        });
      }
    }

    function scrollNext() {
      if(!isBottomSlide()) {
          scroll($(".active").nextAll(".slide:first"));
      }
    }

    function scrollPrev() {
      if(!isTopSlide()) {
          scroll($(".active").prevAll(".slide:first"));
      }
    }

    function isTopSlide() {
      return $(".slide.active").data("slide") === $(".slide:first").data("slide");
    }

    function isBottomSlide() {
      return $(".slide.active").data("slide") === $(".slide:last").data("slide");
    }

  });
