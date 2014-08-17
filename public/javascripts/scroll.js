$(function() {
    var scrolling = false;

    $(window).bind('mousewheel', function(event, delta) {

      if(!scrolling) {
        scrolling = true;
        console.log(event.originalEvent.wheelDelta);

        if(event.originalEvent.wheelDelta >= 0) {
          if($(".wrapper").css("top") !== "0px" && $(".wrapper").css("top") !== "auto") {
            $(".wrapper").animate({
              top: "+=100%",
            }, 2000, function() {
              scrolling = false;
            });
          } else {
            scrolling = false;
          }

        } else {
          $(".wrapper").animate({
            top: "-=100%",
          }, 2000, function() {
            scrolling = false;
            $(".menu-friday").css("opacity", "1");
          });
        }
      }
      return false;
    });

    $(".menu-friday").on("click", function(e) {
      e.preventDefault();
      if(!scrolling) {
        scrolling = true;
        $(".wrapper").animate({
          top: "-100%",
        }, 2000, function() {
          scrolling = false;
          $(".menu-friday").css("opacity", "1");
          });
      }
      return false;
    })
  });
