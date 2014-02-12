jQuery(document).ready(function() { 

  /* Validation Form with AJAX while typing for inputs */
  jQuery('input').bind('input propertychange', function() {
    jQuery(this).parent().find('.error').remove();
    jQuery(this).parent().find('.valid').remove();
    if (jQuery(this).attr('id') == 'email') {
      var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (jQuery(this).val() == "" || jQuery(this).val() == " ") {
        jQuery(this).after("<span class='error'></span>");
        jQuery(this).parent().find('.error').fadeIn('slow');
      } else if (!checkEmail.test(jQuery(this).val())) {
        jQuery(this).after("<span class='error'></span>");
        jQuery(this).parent().find('.error').fadeIn('slow');
      } else {
        jQuery(this).after("<span class='valid'></span>");
        jQuery(this).parent().find('.valid').fadeIn('slow');
      }
    } else {
      if (jQuery(this).val() == "" || jQuery(this).val() == " ") {
        jQuery(this).after("<span class='error'></span>");
        jQuery(this).parent().find('.error').fadeIn('slow');
      } else {
        jQuery(this).after("<span class='valid'></span>");
        jQuery(this).parent().find('.valid').fadeIn('slow');
      }
    }
  });

  /* Validation Form with AJAX while typing for textarea */
  jQuery('textarea').bind('input propertychange', function() {
    jQuery(this).parent().find('.error').remove();
    jQuery(this).parent().find('.valid').remove();
    if (jQuery(this).val() == "" || jQuery(this).val() == " ") {
      jQuery(this).after("<span class='error'></span>");
      jQuery(this).parent().find('.error').fadeIn('slow');
    } else {
      jQuery(this).after("<span class='valid'></span>");
      jQuery(this).parent().find('.valid').fadeIn('slow');
    }
  });


  /* Validation Form with AJAX on Submit */

  jQuery('#contact-form')
  .on("ajax:beforeSend", function(evt, xhr, settings) {
    jQuery('span.error').fadeOut('slow');
    jQuery('span.valid').fadeOut('slow');
    jQuery('#thanks').hide();
    jQuery('#error').hide();
    jQuery('#timedout').hide();
    jQuery('#state').hide();

    var error = false;

    var name = jQuery('#inquiry_name').val();
    if (name == "" || name == " ") {
      jQuery('#inquiry_name').after("<span class='error'></span>");
      jQuery('#inquiry_name').parent().find('.error').fadeIn('slow');
      error = true;
    } else {
      jQuery('#inquiry_name').after("<span class='valid'></span>");
      jQuery('#inquiry_name').parent().find('.valid').fadeIn('slow');
    }

    var checkEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    var email = jQuery('#inquiry_email').val();
    if (email == "" || email == " ") {
      jQuery('#inquiry_email').after("<span class='error'></span>");
      jQuery('#inquiry_email').parent().find('.error').fadeIn('slow');
      error = true;
    } else if (!checkEmail.test(email)) {
      jQuery('#inquiry_email').after("<span class='error'></span>");
      jQuery('#inquiry_email').parent().find('.error').fadeIn('slow');
      error = true;
    } else {
      jQuery('#inquiry_email').after("<span class='valid'></span>");
      jQuery('#inquiry_email').parent().find('.valid').fadeIn('slow');
    }

    var message = jQuery('#inquiry_message').val();
    if (message == "" || message == " ") {
      jQuery('#inquiry_message').after("<span class='error'></span>");
      jQuery('#inquiry_message').parent().find('.error').fadeIn('slow');
      error = true;
    } else {
      jQuery('#inquiry_message').after("<span class='valid'></span>");
      jQuery('#inquiry_message').parent().find('.valid').fadeIn('slow');
    }

    if (error == true) {
      jQuery('#error').fadeIn('slow');
      setTimeout(function() {
        jQuery('#error').fadeOut('slow');
      }, 3000);
      return false;
    }
  })
  .on("ajax:error", function(evt, xhr, status, error) {
    if (error == "timeout") {
      jQuery('#timedout').fadeIn('slow');
      setTimeout(function() {
        jQuery('#timedout').fadeOut('slow');
      }, 3000);
    } else {
      jQuery('#state').fadeIn('slow');
      jQuery("#state").html('The following error occured: ' + error + '');
      setTimeout(function() {
        jQuery('#state').fadeOut('slow');
      }, 3000);
    }
	})
	.on("ajax:success", function(evt, data, status, xhr) {
    jQuery('span.valid').remove();
    jQuery('#thanks').fadeIn('slow');
    jQuery('input').val('');
    jQuery('textarea').val('');
    setTimeout(function() {
      jQuery('#thanks').fadeOut('slow');
    }, 3000);
  })
});
