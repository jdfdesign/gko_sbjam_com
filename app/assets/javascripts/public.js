//= require gko/externals/jquery.elastidegallery


jQuery(document).ready(function ($) {
	if($('.images:first').length > 0) {
		Gallery.init($('.images:first'));
	}
	$('#featured').orbit({ 
		bullets : false, 
		animation : "fade",
		animationSpeed: 800,
		timer: true });
});