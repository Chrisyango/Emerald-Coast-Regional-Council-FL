/*-----------------------------------------------------------------------------------

	Theme Name: Emerald Coast Regional Council, FL
	Front-end Developer: Chris Yang
	Author Design: Samir Alley @samiralley | Tom Gooden @good3n
	Author URI: http://www.revize.com/
	Date: February 28, 2019

-----------------------------------------------------------------------------------*/

(function($) {

	'use strict';

	var $window = $(window),
		$body = $('body');

	/*!
	 * IE10 viewport hack for Surface/desktop Windows 8 bug
	 * Copyright 2014-2015 Twitter, Inc.
	 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
	 */

	// See the Getting Started docs for more information:
	// http://getbootstrap.com/getting-started/#support-ie10-width
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style');
		msViewportStyle.appendChild(
			document.createTextNode(
			  '@-ms-viewport{width:auto!important}'
			)
		); document.querySelector('head').appendChild(msViewportStyle);
	}

	/*
	* E-Notify Auto submit
	*/
	$.urlParam=function(n){var e=new RegExp("[?&]"+n+"=([^]*)").exec(window.location.href);return null==e?null:e[1]||0};
	var $enotify = $('iframe[src*="/revize/plugins/notify/notify.jsp"]');
	if( $enotify.length > 0 ){
		var emailStr = $.urlParam("email");
		if( emailStr != null ){
			$enotify.attr("src", $enotify.attr("src") + "&email=" + emailStr);
		}
	}

	// RZ Class
	if(typeof RZ !== "undefined"){
	 if(RZ.login){
	  $body.addClass("user-logged-in");
	 } else{
		 $body.addClass("user-not-logged-in");
	 }
	}

	// Keyboard Navigation: Nav, flyout
	var isClick = false;
	$("#nav li a, #flyout  li a, a, button, .toggle, .toggle2").on('focusin', function(e) {
		console.log(isClick);
		if( isClick === false ) {
			$(".focused").removeClass("focused");
			$(e.currentTarget).parents("#nav li, #flyout li").addClass("focused");
			// $(".opened:not(.focused) ul:visible,.opened2:not(.focused) ul:visible").slideUp().parent().removeClass("opened opened2");
			$('.opened:not(.focused) ul:visible, .opened2:not(.focused) ul:visible').slideUp().removeClass('opened opened2');
		} else {
			$(".focused").removeClass("focused");
			isClick = false;
		}
	});
	// prevent focused class changes on click - This way arrows wont pop when clicking nav links
	$("#nav a,#flyout a").on('mousedown',function(){
		isClick = true;
	});

	// Search Toggle
	$('#search-toggle-mobile').on('click',function(e){
		$('#search').stop().slideToggle(200);
		$(this).toggleClass('fa-search fa-close');
	});

	// Navigation Toggle
	$("#nav-toggle").on("click", function(){
		$("#nav").stop().slideToggle();
		$(this).toggleClass("active");
	});

	$("#nav >li>ul,#flyout >li>ul").addClass('first-level').attr({'aria-labelledby': 'dropdown-toggle'});
		$("#nav  li ul ul").addClass('second-level');
		$("#nav>li:has(ul)").each(function(){
			$('<a href="#" class="fa fa-angle-down toggle" tabindex="0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Show Dropdown for '+ $(this).find('a:first').text() +'"></a>').insertAfter($(this).find('a:first'));
		});
		$('#nav li li:has(ul)').each(function() {
			$('<a href="#" class="fa fa-angle-down toggle2" tabindex="0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Show Dropdown for '+ $(this).find('a:first').text() +'"></a>').insertAfter($(this).find('a:first'));
		});
		$('#flyout >li:has(ul)').each(function() {
			$('<a href="#" class="fa fa-angle-down toggle" tabindex="0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Show Flyout for '+ $(this).find('a:first').text() +'"></a>').insertAfter($(this).find('a:first'));
		});
		function addNavClass() {
			if ($window.width() < 992) {
				$("body").addClass('mobile');
				$("body").removeClass('desktop');
			} else{
				$("body").addClass('mobile');
				$("body").removeClass('desktop');
			}
		}
		addNavClass();
		$window.resize(addNavClass);
		$(".toggle").on("click keydown",function(e) {
			if (e.keyCode === 13 || e.type === 'click') {
					e.preventDefault();
					var $parent = $(this).parent();
					var $parentLi = $parent.parent();
					$parent.toggleClass('opened');
					console.log($parent.addClass('active').next('.first-level').is(':visible'));
					if($parent.addClass('active') && $(this).next('.first-level').is(':visible')){
						$(this).next('.first-level').slideUp();
						$parent.removeClass('active');
						$(this).attr({'aria-expanded': 'false'});
					} else {
						$(this).attr({'aria-expanded': 'true'});
						$('.first-level').slideUp('slow');
						$parent.addClass('active');
						$(this).next('.first-level').slideToggle();
					}
				}
			});
	    $(".toggle2").on("click keydown",function(e) {
				if (e.keyCode === 13 || e.type === 'click') {
					e.preventDefault();
					var $parent = $(this).parent();
					var $parentLi = $parent.parent();
					$parent.toggleClass('opened2');
					if($parent.addClass('active') && $(this).next('.second-level').is(":visible")){
						$(this).next('.second-level').slideUp();
						$parent.removeClass('active');
						$(this).attr({'aria-expanded': 'false'});
					} else {
						$(this).attr({'aria-expanded': 'true'});
						$(".second-level").slideUp("slow");
						$parent.addClass('active');
						$(this).next('.second-level').slideToggle();
					}
				}
			});
	// Flyout
	var flyout = $('#flyout'),
		flyoutwrap = $('#flyout-wrap');

	if (flyout.text().length){
		flyoutwrap.prepend('<div id="flyout-toggle"><i class="fa fa-bars"></i> Sub Menu</div>');
	}

	$("#flyout-toggle").on("click", function(){
		flyout.slideToggle();
		$(this).toggleClass("active");
	});

	// start calendar resize handler
	function resizeIframe(height) {
		var iFrameID = document.getElementById('calendar');
		if(iFrameID) {
				// here you can set the height, I delete it first, then I set it again
				iFrameID.height = "";
				iFrameID.height = height;
		}
		console.log("height to: " + height);
	}
	var eventMethod = window.addEventListener
	? "addEventListener"
	: "attachEvent";
	var eventHandler = window[eventMethod];
	var messageEvent = eventMethod === "attachEvent"
		? "onmessage"
		: "message";
	eventHandler(messageEvent, function (e) {

		if( e.data && e.data[0] === "setCalHeight" )
		{
			if(typeof resizeIframe === 'function'){
				resizeIframe(e.data[1]);
			}

		}

	});
	// end calendar resize handler

	// bxSlider
	if(typeof $.fn.bxSlider !== "undefined"){
		$('.bxslider').bxSlider({
			mode:'fade',
			auto:($('.bxslider').children().length < 2) ? false : true,
			pager: false
		});
	}

	// Owl Slider
	if(typeof $.fn.owlCarousel !== "undefined"){
		let quickLinkCount = $('.quick-link').length;
		const quickLinkItem = function(num) {
			return (quickLinkCount >= num ? num : quickLinkCount);
		}
		$("#quick-links").owlCarousel({
			loop: quickLinkCount > 1 ? true : false,
			responsiveClass: true,
			nav: true,
			navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
			margin: 20,
			responsive: {
				0: {
					items: quickLinkItem(1),
				},
				600: {
					items: quickLinkItem(2),
					
				},
				1200: {
					items: quickLinkItem(3),
					loop: false,
					nav: false,
				}
			}
		});
	}

	$window.ready(function(){
		$('#nav>li>ul').addClass('mega-menu clearfix');
		$("#nav>li>ul").addClass('mega-menu clearfix');
	$('#nav-images>.nav-image').each(function() {
		$(this).clone().prependTo($('.mega-menu').eq($(this).index()).addClass('withImage')).wrap('<li class="nav-img-wrapper"></li>');
	});
		

		$('#video-player').prepend('<img class="btn-scroll" src="_assets_/images/scroll.png" alt="Scroll button">');

		$('#video-player .btn-scroll').click(function(){
			$('html, body').stop();
		    $('html, body').animate({
		        scrollTop: $("#welcome").offset().top - 180
		    }, 1500);
		});

		// Video Background
		if ( typeof $.fn.YTPlayer !== "undefined"){
			$(function(){
				$("#video-bg").YTPlayer();
			});
		}

		$('.translation-links span').on('keydown click', function(e){
			if (e.keyCode === 13 || e.type === 'click') {
				$('.translation-links ul').stop().fadeToggle();
			}
		});

		$('.translation-links ul').on('mouseleave',function(){
			$(this).fadeOut();
		});

		var translateURL = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

		 // Translate Script
		$.getScript(translateURL);
		console.log(translateURL);
		$('.translation-links a').click(function() {
			var lang = $(this).data('lang');
			console.log(lang);
			var $frame = $('.goog-te-menu-frame:first');
			if (!$frame.size()) {
				return false;
			}
			$frame.contents().find('.goog-te-menu2-item span.text:contains(' + lang + ')').get(0).click();
			return false;
		});

		if ( typeof $.fn.socialfeed !== "undefined"){
			$('#social-feed').socialfeed({
					// Facebook
					facebook:{
							accounts: ['@spanishforklibrary'],
							limit: 1,
							access_token: 'EAAMkcCLFBs8BAEnpzLa3fg98gku0FhSwmvKZAujQ5m6RLRlHnIUnPaAexISWwIMA4VEoHuFUEWufVXIsasnQFRaDys2613NJUqt5sE5FqAr1sYrgnLZBPgeDmP8cZAkv7sFZBQOxUdrz2B7udHItF8tNMWiZC5iJfqkmWWK06BQZDZD'
					},
					template: "_assets_/templates/template.html",
					length: 70,
					show_media: true
			});
		}

		// matchHeight
		if(typeof $.fn.matchHeight !== "undefined"){
			$('.equal').matchHeight({
				//defaults
				byRow: true,
				property: 'height', // height or min-height
				target: null,
				remove: false
			});
		}

		// Animations http://www.oxygenna.com/tutorials/scroll-animations-using-waypoints-js-animate-css
		function onScrollInit( items, trigger ) {
			items.each( function() {
				var osElement = $(this),
					osAnimationClass = osElement.data('os-animation'),
					osAnimationDelay = osElement.data('os-animation-delay');

				osElement.css({
					'-moz-animation-delay':     osAnimationDelay,
					'animation-delay':          osAnimationDelay,
					'-webkit-animation-delay':  osAnimationDelay
				});

				var osTrigger = ( trigger ) ? trigger : osElement;

				if(typeof $.fn.waypoint !== "undefined"){
					osTrigger.waypoint(function() {
						osElement.addClass('animated').addClass(osAnimationClass);
					},{
						triggerOnce: true,
						offset: '100%'
					});
				}
			});
		}
		onScrollInit($('.os-animation'));

		//#Smooth Scrolling
		$('a[href*=#]:not([href=#],[href*="#collapse"])').click(function() {
			if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
				if (target.length) {
					$('html,body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});

		/*global jQuery */
		/*!
		* FlexVerticalCenter.js 1.0
		*
		* Copyright 2011, Paul Sprangers http://paulsprangers.com
		* Released under the WTFPL license
		* http://sam.zoy.org/wtfpl/
		*
		* Date: Fri Oct 28 19:12:00 2011 +0100
		*/
		$.fn.flexVerticalCenter = function( options ) {
			var settings = $.extend({
				cssAttribute:   'margin-top', // the attribute to apply the calculated value to
				verticalOffset: 0,            // the number of pixels to offset the vertical alignment by
				parentSelector: null,         // a selector representing the parent to vertically center this element within
				debounceTimeout: 25,          // a default debounce timeout in milliseconds
				deferTilWindowLoad: false     // if true, nothing will take effect until the $(window).load event
			}, options || {});

			return this.each(function(){
				var $this   = $(this); // store the object
				var debounce;

				// recalculate the distance to the top of the element to keep it centered
				var resizer = function () {

					var parentHeight = (settings.parentSelector && $this.parents(settings.parentSelector).length) ?
						$this.parents(settings.parentSelector).first().height() : $this.parent().height();

					$this.css(
						settings.cssAttribute, ( ( ( parentHeight - $this.height() ) / 2 ) + parseInt(settings.verticalOffset) )
					);
				};

				// Call on resize. Opera debounces their resize by default.
				$(window).resize(function () {
					clearTimeout(debounce);
					debounce = setTimeout(resizer, settings.debounceTimeout);
				});

				if (!settings.deferTilWindowLoad) {
					// call it once, immediately.
					resizer();
				}

				// Call again to set after window (frames, images, etc) loads.
				$(window).load(function () {
					resizer();
				});

			});

		};
		$('.v-align').flexVerticalCenter();


		// Remove matchHeight on document center pages
		if($('#RZdocument_center').length){
			$('.aside,.entry').matchHeight({remove:true});

			if(window.matchMedia("(min-width: 992px)").matches){
				setInterval(function(){
					if($('.post').outerHeight() + 300 > $('.entry').outerHeight()){
						$('.aside').css('height',$('.entry').outerHeight() + 'px');
					}
				}, 200);
			}
		}


	}); // Ready

})(jQuery);
