//= require gko/jquery.elastidegallery
//= require zurb/foundation/modernizr.foundation.js 
//= require zurb/foundation/jquery.orbit-1.4.0.js 
	
$(document).ready(function() {
	if($('.images:first').length > 0) {
		Gallery.init($('.images:first'));
	}
  
	$("div.custom.dropdown").each(function () {
    $(this).css('width', '260px').find('ul').css('width', '260px');
  });
	
	$('.carousel').carousel();

});