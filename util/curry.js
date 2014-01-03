if (typeof define !== 'function') { var define = require('amdefine')(module); }
define(function() {
  'use strict';

  var slice = Array.prototype.slice;

  return function curry(fn) {
    var arity = fn.length;

    function provided(argsPreviouslyProvided) {
      return function middleman() {
        var argsProvidedSoFar = argsPreviouslyProvided.concat(slice.apply(arguments));

        if (argsProvidedSoFar.length >= arity) {
          return fn.apply(fn, argsProvidedSoFar);
        }
        else {
          return provided(argsProvidedSoFar);
        }
      };
    }

    return provided([]);
  };
});
