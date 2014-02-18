//= require jquery_ujs
//= require flexslider/jquery.flexslider.js
//= require jquery.placeholder
//= require jquery.easing
//= require remote_form

// make console.log safe to use
window.console || (console = {
  log: function() {}
});

var map;

jQuery(function($){
  'use strict';
  var THEME = window.THEME || {};

  /* ==================================================
  	Fix
  ================================================== */

  THEME.fix = function(){
    // fix for ie device_width bug 
    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement("style");
      msViewportStyle.appendChild(
      document.createTextNode("@-ms-viewport{width:auto!important}"));
      document.getElementsByTagName("head")[0].
      appendChild(msViewportStyle);
    }
  };
  /* ==================================================
  	Placeholder
  ================================================== */

  THEME.placeholder = function(){
    // enable placeholder fix for old browsers
    $('input, textarea').placeholder();
  };

  /* ==================================================
  	Placeholder
  ================================================== */
  THEME.uniformHeight = function () {
    var maxHeight = 0,
        wrapper,
        wrapperHeight;

    $('.thumbnails.uniform-height').find('.thumbnail').each(function () {

      // Applying a wrapper to the contents of the current element to get reliable height
      wrapper = $(this).wrapInner('<div class="wrapper" />').children('.wrapper');
      wrapperHeight = wrapper.outerHeight();

      maxHeight = Math.max(maxHeight, wrapperHeight);
      
      // Remove the wrapper
      wrapper.children().unwrap();

    }).height(maxHeight);
  }
  /* ==================================================
  	Carousel
  ================================================== */

    THEME.carousel = function() {

  		// The slider being synced must be initialized first
  		  $('#carousel').flexslider({
  		    animation: "slide",
  		    controlNav: false,
  		    animationLoop: false,
  		    slideshow: false,
  		    itemWidth: 125,
  		    itemMargin: 5,
  		    asNavFor: '#slider'
  		  });

  		  $('#slider').flexslider({
  		    animation: "slide",
  		    controlNav: false,
  		    animationLoop: false,
  		    slideshow: false,
  		    sync: "#carousel"
  		  });
    };


/*==================================================
  	Init
==================================================*/

  $(document).ready(function() {
    THEME.fix();
    THEME.placeholder();
    THEME.carousel();
    THEME.uniformHeight();

    $(window).resize(function () {
        THEME.uniformHeight();
    });
  });
}); 
