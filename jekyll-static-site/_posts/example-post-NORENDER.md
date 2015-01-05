**THIS DOCUMENT IS NOT RENDERED BY JEKYLL, BECAUSE NO YAML FRONT MATTER
IS SET ON THE FILE START**

# Image inclusion
<img src="/img/parallax_1.jpeg" class="materialboxed responsive-img" />

# Code syntax highlighting
```javascript
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
```
# Nested lists
1. One
	1. One plus
	2. One two
2. Two
3. Three
	1. Threeeeeeee
