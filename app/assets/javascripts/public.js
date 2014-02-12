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
      
      // start the carousel if there is more than one image
      // else hide controls
      $('.carousel').each(function(index) {
        var _self = $(this);
        if (_self.find('.item').length > 1) {
          _self.carousel({
            interval: 3000
          });
        } else {
          _self.find('.carousel-control').each(function(index) {
            $(this).css({
              display: 'none'
            })
          })
          _self.find('.carousel-indicators').each(function(index) {
            $(this).css({
              display: 'none'
            })
          })
        }
      })
      
  		// The slider being synced must be initialized first
  		  $('#carousel').flexslider({
  		    animation: "slide",
  		    controlNav: false,
  		    animationLoop: false,
  		    slideshow: false,
  		    itemWidth: 210,
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


    /* ==================================================
      	Gmap
      ================================================== */

      THEME.gmap = function() {
        var styles = [
      				{ stylers: [{ saturation: -100 }, { gamma: 1 }] },
      				{ elementType: "labels.text.stroke", stylers: [{ visibility: "off" }] },
      				{ featureType: "poi.business", elementType: "labels.text", stylers: [{ visibility: "off" }] },
      				{ featureType: "poi.business", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      				{ featureType: "poi.place_of_worship", elementType: "labels.text", stylers: [{ visibility: "off" }] },
      				{ featureType: "poi.place_of_worship", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
      				{ featureType: "road", elementType: "geometry", stylers: [{ visibility: "simplified" }] },
      				{ featureType: "water", stylers: [{ visibility: "on" }, { saturation: 50 }, { gamma: 0 }, { hue: "#50a5d1" }] },
      				{ featureType: "administrative.neighborhood", elementType: "labels.text.fill", stylers: [{ color: "#333333" }] },
      				{ featureType: "road.local", elementType: "labels.text", stylers: [{ weight: 0.5 }, { color: "#333333" }] },
      				{ featureType: "transit.station", elementType: "labels.icon", stylers: [{ gamma: 1 }, { saturation: 50 }] }
      			],
            styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  			var myOptions = {
  				disableDefaultUI: true,
  				zoomControl: true,
  				streetViewControl: true,
  				zoomControlOptions: {
  					style: google.maps.ZoomControlStyle.SMALL,
  					position: google.maps.ControlPosition.LEFT_TOP
  				},
  				mapTypeControlOptions: {
  					mapTypeId: [google.maps.MapTypeId.ROADMAP, 'map_style']
  				},
  				zoom: 14,
  				center: new google.maps.LatLng(17.909719,-62.845877),
  				mapTypeId: google.maps.MapTypeId.ROADMAP,
  				scrollwheel: false
  			}

        map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
  			map.mapTypes.set('map_style', styledMap);
  			map.setMapTypeId('map_style');

  			var marker_1 = new google.maps.Marker({
          position: new google.maps.LatLng(17.909719,-62.845877),
          map: map
        });

        google.maps.event.addListener(marker_1, 'click', function() {
          infowindow_1.open(map,marker_1);
        });
      }
/*==================================================
  	Init
==================================================*/

  $(document).ready(function() {
    THEME.fix();
    THEME.placeholder();
    THEME.carousel();
    if(typeof(google) != 'undefined'){
      THEME.gmap();
    }
    THEME.uniformHeight();

    $(window).resize(function () {
        THEME.uniformHeight();
    });
  });
}); 
