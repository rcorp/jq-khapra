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
		
		var o = $.extend( {}, _defaults, options);

		return this.each(function() {

			var $container = $(this);
			var width = $container.find('img').width(),
			height = $container.find('img').height(),//,o.img_height,
			$img = $('img', $container),
			n_tiles = o.x * o.y,
			tiles = [], $tiles;
			for ( var i = 0; i < n_tiles; i++ ) {
				tiles.push('<div class="tile"><div class="card"><div class="card-front face"></div><div class="card-back face"></div></div></div>');
			}

			$tiles = $( tiles.join('') );

			// Hide original image and insert tiles in DOM
			$img.hide();
			$container.append( $tiles );
			
			// Set background
			$tiles.css({
				width: (100 / o.x) + '%',
				height: height / o.y
			});

			//Set the first image as the front side.
			$('.card-front', $tiles).css('backgroundImage', 'url('+ $($img[0]).attr('src') +')');

			//Set the second image as the back side.
			$('.card-back', $tiles).css('backgroundImage', 'url('+ $($img[1]).attr('src') +')');

			//Adjust size
			var backgroundSizeX = (o.x * 100);
			var backgroundSizeY = (o.y * 100);
			$('.card-front, .card-back', this).css( 'backgroundSize', backgroundSizeX +'%'+ backgroundSizeY+'%' );

			// Adjust position
			$tiles.each(function(e) {
				var pos = $(this).position();
				//var translateX = (e % o.x) * ((width + (37*width)/100) / o.x);
				var translateX = (e % o.x) * (100/ (o.x-1));
				var translateY = Math.floor(e / o.x) * (height / o.y);
			
				$('.card-front, .card-back', this).css( 'backgroundPosition', translateX +'%'+ -translateY +'px' );
			});

			var tilesArr = range( 0, n_tiles, o.random )
				tileSpeed = o.speed / n_tiles; // time to clear a single tile

			// Public method
			$container.on( 'animate', function() {
				tilesArr.forEach(function( tile, i ) {
					setTimeout(function(){
						$tiles.eq( tile ).toggleClass( 'tile-flip' );
					}, i * tileSpeed );
				});
			});
		});
	};

	}( jQuery, window ));