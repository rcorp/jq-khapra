(function( $, window ) {
	
	$.fn.sliced = function( options ) {
		var _defaults = {
			x: 2, // number of tiles in x axis
			y: 2, // number of tiles in y axis
			random : true, // animate tiles in random order
			speed: 2000 // time to clear all times
		};

		/**
		* range Get an array of numbers within a range
		* @param min {number} Lowest number in array
		* @param max {number} Highest number in array
		* @param rand {bool} Shuffle array
		* @return {array}
		*/
		function range( min, max, rand ) {
			var arr = ( new Array( ++max - min ) )
			.join('.').split('.')
			.map(function( v,i ){ return min + i })
			return rand
			? arr.map(function( v ) { return [ Math.random(), v ] })
				 .sort().map(function( v ) { return v[ 1 ] })
			: arr
		}

		var settings = $.extend( {}, _defaults, options);

		return this.each(function() {

			var $container = $(this);
			var width = $container.find('img').width(),
			height = $container.find('img').height(),
			$img = $('img', $container),
			n_tiles = settings.x * settings.y,
			tiles = [], $tiles;
			for ( var i = 0; i < n_tiles; i++ ) {
				tiles.push('<div class="khapra-tile"><div class="khapra-card"><div class="khapra-card-front khapra-face"></div><div class="khapra-card-back khapra-face"></div></div></div>');
			}

			$tiles = $( tiles.join('') );

			// Hide original image and insert tiles in DOM
			$img.hide();
			$container.append( $tiles );
			
			// Set background
			$tiles.css({
				width: (100 / settings.x) + '%',
				height: height / settings.y
			});

			//Set the first image as the front side.
			$('.khapra-card-front', $tiles).css('backgroundImage', 'url('+ $($img[0]).attr('src') +')');

			//Set the second image as the back side.
			$('.khapra-card-back', $tiles).css('backgroundImage', 'url('+ $($img[1]).attr('src') +')');

			//Adjust size
			var backgroundSizeX = (settings.x * 100);
			var backgroundSizeY = (settings.y * 100);
			$('.khapra-card-front, .khapra-card-back', this).css( 'backgroundSize', backgroundSizeX +'%'+ backgroundSizeY+'%' );

			// Adjust position
			$tiles.each(function(e) {
				var pos = $(this).position();
				//var translateX = (e % settings.x) * ((width + (37*width)/100) / settings.x);
				var translateX = (e % settings.x) * (100/ (settings.x-1));
				var translateY = Math.floor(e / settings.x) * (height / settings.y);
			
				$('.khapra-card-front, .khapra-card-back', this).css( 'backgroundPosition', translateX +'%'+ -translateY +'px' );
			});

			var tilesArr = range( 0, n_tiles, settings.random )
				tileSpeed = settings.speed / n_tiles; // time to clear a single tile

			// Public method
			$container.on( 'khapra-flip', function() {
				tilesArr.forEach(function( tile, i ) {
					setTimeout(function(){
						$tiles.eq( tile ).toggleClass( 'khapra-tile-flip' );
					}, i * tileSpeed );
				});
			});
		});
	};

	}( jQuery, window ));