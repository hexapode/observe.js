/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" (Revision 42):
 * <pierre@doulcet.fr> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Pierre-Loic Doulcet
 * ----------------------------------------------------------------------------
 */

(
	function(window)
	{
		var __data = [];
	    var __objectMapping = [];
	    var __getters = [];
	    var __setters = [];

	    /*
	     * Try to detect new object properties
	     */
	    function __update(index)
	    {
	    	var _local = __objectMapping[index];
	    	var keys = Object.keys(_local);

	    	keys.map(function(key){
	    		if (__data[index][key] === undefined)
	    		{
	    			__data[index][key] = _local[key];
	    			__bind(_local, index, key);
	    		}
	    	});
	    }

	    /*
	    * Bind Getter / Setter to object
	    */
	    function __bind(local, index, key)
	    {
	    	console.log('bind obj n : ' + index + ', key : ' + key);
	    	local.__defineGetter__
			(
	 			key,
	 			function () 
	 			{
	 				__update(index);
	 				var v = __getters[index](key, __data[index][key]);
	 				if (v !== undefined)
    	 				return v;
					return __data[index][key];
	 			}
	 		);

	 		local.__defineSetter__
	 		(
	 			key,
	 			function (value)
	 			{
	 				__update(index);
	 				var v = __setters[index](key, value);
	 				if (v !== undefined)
    	 				__data[index][key] = v;
					else
						__data[index][key] = value;
	 				return __data[index][key];
	 			}
	 		);
	    }

	    /*
	    *	Observe an Array
	    */
	    function observe(array, get, set)
	    {
	    	var keys = Object.keys(array);
	    	__objectMapping.push(array);
	    	var index = __objectMapping.length - 1;
	    	__data[index] = [];
	    	__getters[index] = get;
	    	__setters[index] = set;
	    	keys.map
	    	(
	    		function(key) 
	    		{
	    			__data[index][key] = array[key];
	    			__bind(array, index, key);
	    	 	}
	    	);
	    }

		window.observe = observe;
	}
)(window);