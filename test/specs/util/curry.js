/*global jasmine, describe, it, expect, runs, waitsFor, beforeEach, waits */
define(['real/util/curry'], function(curry) {
  'use strict';

  describe('util/curry', function() {
    it('is a function', function() {
      expect(curry).toEqual(jasmine.any(Function));
    });

    it('is its own identity function', function() {
      var fn = function() { return true; };

      expect(curry(curry)(fn)()).toEqual(curry(fn)());
    });

    it('returns a function', function() {
      expect(curry(function() {})).toEqual(jasmine.any(Function));
    });

    it('does not call its passed function until its arity is reached', function() {
      var fn = function greet(a, b, c) {
        return true;
      };

      expect(curry(fn)).toEqual(jasmine.any(Function));
      expect(curry(fn)('a')).toEqual(jasmine.any(Function));
      expect(curry(fn)('a', 'b')).toEqual(jasmine.any(Function));
      expect(curry(fn)('a', 'b', 'c')).toEqual(true);
    });

    describe('returned function', function() {
      it('has the same output as the original function', function() {
        var greet = function greet(greeting) {
          return greeting + ' Human!';
        };

        expect(curry(greet)('Greetings')).toEqual(greet('Greetings'));
      });

      describe('when called one argument at a time', function() {
        it('has the same output as the original function', function() {
          var greet = function greet(greeting, greeter) {
            return greeting + ' Human, from ' + greeter;
          };

          expect(curry(greet)('Greetings')('Mork')).toEqual(greet('Greetings', 'Mork'));
        });
      });

      describe('when called multiple arguments at a time', function() {
        it('has the same output as the original function', function() {
          var greet = function greet(greeting, greeter) {
            return greeting + ' Human, from ' + greeter;
          };

          expect(curry(greet)('Greetings', 'Mork')).toEqual(greet('Greetings', 'Mork'));
        });
      });
    });
  });

  return curry;
});
