//= require gko/jquery.elastidegallery
	
$(document).ready(function() {
	function init() {
		if($('.images:first').length > 0) {
			Gallery.init($('.images:first'));
		} 
		$("body").fadeIn(3000).css("display", "block");
		$('.carousel').each(function(index) {
			var _self = $(this);
			console.log(_self.find('.item').length);
			if(_self.find('.item').length > 1) {
				_self.carousel();
			}
		}); 
	}

	init();

});