$(function() {
    var scrolling = false;
    var lastScroll = 0;
    var menu = {"main" : {"number" : 0}, "friday": {"number" : 1}, "saturday": {"number" : 2}, "sunday": { "number" : 3}}
    $(window).bind('mousewheel', function(event, delta) {
      /*if(scrolling) {
        return false;
      }*/
      if(event.originalEvent.wheelDelta <= 0 ) {  scrollNext();  }
      else { scrollPrev(); }

      /*console.log($(".slide.friday").offset().top.toFixed());
      console.log($("body").scrollTop());
      console.log($(".slide.friday").offset().top.toFixed() == $("body").scrollTop())
      if(lastScroll < $(".slide.friday").offset().top.toFixed() && $("body").scrollTop() >= $(".slide.friday").offset().top.toFixed()) {
        console.log("PASSED!");
        var nextSlide = $(".active").nextAll(".slide:first")
        scrolling = true;
        $(".menu-circle").css("opacity", "0.5")
        var currentSlide = $(".active")
        $(".menu-" + nextSlide.data("slide")).css("opacity", "1");
        $("html, body").animate({
          scrollTop: nextSlide.offset().top
          //top: calculatePosition(nextSlide),
        }, 2000, function() {
          nextSlide.addClass("active")
          currentSlide.removeClass("active")
          scrolling = false;
        });
      }

      lastScroll = $("body").scrollTop();*/
      return false;
    });



    $(".menu-circle").on("click", function(e) {
      e.preventDefault();
      scroll($("." + $(e.currentTarget).data("menu-button")));
      return false;
    })


    $(document).on('keypress', scrollKeys);
    $(document).on('keydown', scrollKeys);


    function scrollKeys(e) {
      if(e.keyCode == 40) {
        e.preventDefault();
        scrollNext();
      } else if (e.keyCode == 38) {
        e.preventDefault();
        scrollPrev();
      }
    }



    function scroll(nextSlide) {
      if(!scrolling && nextSlide.length !== 0) {
        scrolling = true;
        $(".menu-circle").css("opacity", "0.5")
        var currentSlide = $(".active")
        $(".menu-" + nextSlide.data("slide")).css("opacity", "1");
        $(".wrapper").animate({
          //scrollTop: nextSlide.offset().top
          top: calculatePosition(nextSlide)
        }, 2000, function() {
          nextSlide.addClass("active")
          currentSlide.removeClass("active")
          scrolling = false;
        });
      }
    }

    function calculatePosition(slide) {
      var slideInfo = menu[slide.data("slide")]
      return "-" + (slideInfo.number * 100 + slideInfo.number *2) + "%"
    }

    function scrollNext() {
      scroll($(".active").nextAll(".slide:first"));
    }

    function scrollPrev() {
      scroll($(".active").prevAll(".slide:first"));
    }
  });
