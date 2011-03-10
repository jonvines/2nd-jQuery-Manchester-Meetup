/* Author: Jon Vines
   Description: A small script to introduce the fundamentals of jQuery
*/

// Check to make sure the DOM is loaded and ready
$(document).ready(function () {
  
	// Pop our jQuery selectors into a variable. Means we only ping the DOM once = faster
	var $navLi = $('#mainNav').find('li')
	, $navA = $navLi.find('a')

	// This will check the current page and apply a class
  , currentPage = function(url) {
    $navA.each( function() {
      var $this = $(this);
      if ($this.attr('href') === url) {
        $this.parent()
             .addClass('active')
             .siblings()                     // Select it's siblings (i.e. all other li elements in the nav)
             .removeClass('active'); // Return to the previous selection i.e. The parent li element of our passed in url
      }
    });
  }
  
	, loadPage = function(incurl) {
		$.ajax({ url: incurl })
    // Added in jQuery 1.5.1
    // If our ajax request is a success then we run the following code
    .success(function(data) {
      changePage(data);
    })
    // If it fails, then we can run this (404 anybody?)
    .error(function() {
      var data = "<h1>404</h1>" +
          "<p>This page doesn't appear to exist!</p>" +
          "<p>Return to the <a href=\"/jqnav\">home page</a></p>";
      changePage(data);
      })
  }
  
  // Built in effect, here we're using slideUp()
  // We can also use fadeOut() or hide()
  , changePage = function(incoming) {
    $('#main').stop(true,true).slideUp('fast', function() {
      // Once the slideUp() effect is completed, we slideDown() the new content
      // We use html() to set the content
      $(this).html(incoming).slideDown('fast');
    })
	}
  ;
  
  // Set the initial opacity of all navigation elements to 50%
  $navLi.css({
		opacity: 0.5
	})
	// alternate the opacity on the navigation element when hovered over
	// This is also the first example of chaining methods in jQuery
	.hover( function() {
		$(this).animate({ opacity : 1 });
	}, function() {
		$(this).animate({ opacity : 0.5 });
	});
  
	// On click, grab the link and load via ajax loadPage method
	$navA.click( function(event) {
		// Stop the default behaviour of the click and run our custom code
		event.preventDefault();
    // set the hash to the page we're loading
    window.location.hash = '!' + $(this).data('who');
	});
  
  // Watch for the hash changing, load page accordingly
  $(window).bind('hashchange', function () {
    // We need to give a default for our page load call
    // In this case we are giving our home page gandalf.html
    var hash = window.location.hash ? 'pages/' + window.location.hash.split('!')[1] + '.html' : 'pages/gandalf.html';
    loadPage(hash);
    currentPage(hash);
  });
  
  $(window).trigger("hashchange");
  
});