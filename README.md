observe.js
==========
Observable Array in Javascript as they should be.

I found myself stuck with the way JS work with array so I code this library to allow observation of arrays properties.

This library allow you to observe an Object / array and his properties.

First create an Array :

    var testObject = 
    {
    	location 	: 'airport',
    	country 	: 'bielorussia',
    	city	 	: 'minsk',
    	age 		: 21
    };
    
Second observe It passing a setter and getter. Both will received in parameter the key asked and actual value of propertie.

  	observe(
  		testObject,
  		function (key, value)
  		{
  			console.log('get : ' + key + '(' + value + ')');
  			return value;
  		},
  		function (key, value)
  		{
  			console.log('set : ' + key + ' to ' + value);
  			return value;
  		}
  	);

You can then ninteract with your object

  	testObject.age++;

Will log in console :
    set : age to 22

If you add new key to your object they will get observed next time your object is used :
  
      testObject.locationString = testObject.location + '.' + testObject.country + '.'+testObject.city;
      testObject.location;
      console.log('I am in : ' + testObject.locationString);

Will log in console :
      get : location(airport)
      get : country(bielorussia)
      get : city(minsk)
      get : location(airport)
      get : locationString(airport.bielorussia.minsk)
      I am in : airport.bielorussia.minsk

This library by itself is useless, but can become usefull if you try to build an ORM or this kind of stuff.

Enjoy :-D
