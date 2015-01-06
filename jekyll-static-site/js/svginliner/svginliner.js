(function ($) {
  $.fn.inlineSvg = function () {

    return this.each(function() {
			var image = $(this);
	    var imgID = image.attr('id');
	    var imgClass = image.attr('class');
	    var imgURL = image.attr('src');

	    $.get(imgURL, function(data) {
	        // Get the SVG tag, ignore the rest
	        var $svg = jQuery(data).find('svg');

	        // Add replaced image's ID to the new SVG
	        if(typeof imgID !== 'undefined') {
	            $svg = $svg.attr('id', imgID);
	        }
	        // Add replaced image's classes to the new SVG
	        if(typeof imgClass !== 'undefined') {
	            $svg = $svg.attr('class', imgClass+' replaced-svg');
	        }

	        // Remove any invalid XML tags as per http://validator.w3.org
	        $svg = $svg.removeAttr('xmlns:a');

	        // Replace image with new SVG
	        image.replaceWith($svg);

	    }, 'xml');
    });
  };
}( jQuery ));
