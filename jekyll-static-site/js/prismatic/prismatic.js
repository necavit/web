(function ($) {
  $.fn.prismatic = function () {

    return this.each(function() {
			//build language box
			var language = $(this).find('[data-lang]').attr('data-lang');
			var languageBox = $('<div class="prismatic-code-lang">' + language + '</div>');

			//get <pre> container
			var container = $(this).find('pre');
			container.addClass('prismatic-code');

			//build wrapper
			var wrapper = $('<div class="prismatic-wrapper"></div>');
			wrapper.append(container.clone());

			//swap container with wrapper
			container.replaceWith(wrapper);

			//add language box
			wrapper.prepend(languageBox);
    });
  };
}( jQuery ));
