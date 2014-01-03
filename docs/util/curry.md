# nbd/util/curry

* [()](#-fn-)

`curry` is a utility function that allows for arbitrarily [currying](http://en.wikipedia.org/wiki/Currying) a function that is passed to it.

## `( fn )`

```javascript
require(['nbd/util/curry'], function(curry) {
  var greet = curry(function(greeter, greeting, recipient) {
    return greeting + ', ' + recipient + '! I am ' + greeter + '.';
  });

  var alienGreeting = greet('an Alien', 'Zork Bork');
  var humanGreeting = greet('Sean', 'Hello There');

  alienGreeting('Sean'); // Zork Bork, Sean! I am an Alien.
  humanGreeting('Alien'); // Hello There, Alien! I am Sean.
});
```
