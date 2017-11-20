
/** Zepto smooth scroll with ease courtesy of pearofducks
 * https://gist.github.com/pearofducks/257832974ea0ed0e63abcfd9172b74ed
 **/
function easeInOutQuart( t ) {
  const t1 = t - 1;
  return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * t1 * t1 * t1 * t1;
}

function smoothScroll(el, to, duration) {
  var initial = $(window).scrollTop()
  var dest = to - initial
  var start = null
  function step (timestamp) {
    if (!start) start = timestamp
    var progress = timestamp - start
    var percentage = progress / duration
    var tick = (easeInOutQuart(percentage) * dest) + initial
    window.scrollTo(0, tick)
    if (progress < duration) { window.requestAnimationFrame(step) }
    else { return }
  }
  window.requestAnimationFrame(step)
}

// Site support
var DAVE_LANG = DAVE_LANG || {

  init : function() {
    // Scroll on demand
    $('.scrollTo').on('click', function(e) {
        e.preventDefault();
        smoothScroll($(window), $($(e.currentTarget).attr('href')).offset().top, 600);
    });
  }
  
}

$(DAVE_LANG.init());
