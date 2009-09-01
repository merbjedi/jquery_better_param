jQuery.extend({
	// Serialize an array of form elements or a set of
	// key/values into a query string
	param: function( a ) {
		var s = [];

		function add( key, value ){
			s[ s.length ] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
		}

		// If an array was passed in, assume that it is an array
		// of form elements
		if ( jQuery.isArray(a) || a.jquery ) {
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			});
		} else {
			// Recursively encode parameters from object, 
			// building a prefix path as we go down
			function buildParams(obj, prefix)
			{
				if ( jQuery.isArray(obj) ) {
					for ( var i = 0, length = obj.length; i < length; i++ ) {
						buildParams( obj[i], prefix );
					};
				} else if( typeof(obj) == "object" ) {
					for ( var j in obj ) {
						var postfix = ((j.indexOf("[]") > 0) ? "[]" : ""); // move the brackets to the end (if applicable)
						buildParams(obj[j], (prefix ? (prefix+"["+j.replace("[]", "")+"]"+postfix) : j) );
					}
				} else {
					add( prefix, jQuery.isFunction(obj) ? obj() : obj );
				}
			}
			buildParams(a);
		}

		// Return the resulting serialization
		return s.join("&").replace(/%20/g, "+");
	}
});
