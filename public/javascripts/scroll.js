$(function() {
    var scrolling = false;

    $(window).bind('mousewheel', function(event, delta) {

      if(!scrolling) {
        scrolling = true;
        if(event.originalEvent.wheelDelta >= 0) {
          if($(".slide.active").data("slide") !== $(".slide:first").data("slide")) {
            $(".menu-circle").css("opacity", "0.5")
            var currentActive = $(".active")
            var nextActive = currentActive.prevAll(".slide:first")
            $(".wrapper").animate({
              top: "+=102%",
            }, 2000, function() {
              nextActive.addClass("active")
              currentActive.removeClass("active")
              $(".menu-" + nextActive.data("slide")).css("opacity", "1");
              scrolling = false;
            });
          } else {
            scrolling = false;
          }

        } else {
          if($(".slide.active").data("slide") !== $(".slide:last").data("slide")) {
            $(".menu-circle").css("opacity", "0.5")
            var currentActive = $(".active")
            var nextActive = $(".active").nextAll(".slide:first")
            $(".wrapper").animate({
              top: "-=102%",
            }, 2000, function() {
              nextActive.addClass("active")
              currentActive.removeClass("active")
              $(".menu-" + nextActive.data("slide")).css("opacity", "1");
              scrolling = false;
            });
          }
          else {
            scrolling = false;
          }
        }
      }
      return false;
    });

    var menu = {"friday": {"number" : 1}, "saturday": {"number" : 2}, "sunday": { "number" : 3}}

    $(".menu-circle").on("click", function(e) {
      e.preventDefault();
      if(!scrolling) {
        scrolling = true;
        var clickedDay = $(e.currentTarget).data("menu-button");
        var some = menu[clickedDay]
        $(".menu-circle").css("opacity", "0.5")
        $(".wrapper").animate({
          top: "-" + (some.number * 100 + some.number *2) + "%",
        }, 2000, function() {
          scrolling = false;
          $(e.currentTarget).css("opacity", "1");
          });
      }
      return false;
    })

  });
