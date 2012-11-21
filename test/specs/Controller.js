/*global jasmine, describe, it, expect, spyOn, mostRecentAjaxRequest */
define(['real/Controller', 'nbd/Class', 'nbd/View', 'nbd/trait/jquery.tmpl'], function(Controller, Class, View, jqtmpl) {
  'use strict';

  describe('Controller', function() {

    it('should exist', function() {
      expect( Controller ).toBeDefined();
    });

    it('should extend Class', function() {
      expect( Controller.inherits(Class) ).toBe(true);
    });

    it('should have prototype methods', function() {
      var instance = new Controller();

      expect( instance.init ).toBeDefined();
      expect( instance.destroy ).toBeDefined();
    });

    it('should have static methods', function() {
      expect( Controller.addTemplate ).toBeDefined();
      expect( Controller.loadTemplate ).toBeDefined();
    });

    describe('Controller.addTemplate', function() {
      var tmpl = Controller.addTemplate( 'test-template', "Hello world" );

      it('should add the test-template', function() {
        expect( tmpl.html() ).toEqual('Hello world');
      });

      it('should have loaded with given id', function() {
        expect( $('#test-template')[0] ).toBe( tmpl[0] );
      });

    });

    describe('Controller.loadTemplate', function() {
      var tmpl = 'load-test-template',
      spies = { template:function(){} },
      now = Date.now(),
      templateResponse = {
        status : 200,
        responseText : JSON.stringify({ html : now })
      },
      promise;
      View = View.extend({},{ TEMPLATE_ID : tmpl }).mixin(jqtmpl);

      it('can load templates', function() {
        expect(function(){ Controller.loadTemplate( View ); }).toThrow("No template found");

        jasmine.Ajax.useMock();
        spyOn( spies, 'template' );
        View.TEMPLATE_URL = "xxx";

        promise = Controller.loadTemplate( View, spies.template )
        .done(function() {
          expect( spies.template ).toHaveBeenCalledWith(tmpl);
          expect( View.prototype.templateScript(false) ).not.toBe(false);
          expect( +View.prototype.templateScript(false).html() ).toEqual(now);
        });

        expect( promise.promise ).toBeDefined();

        mostRecentAjaxRequest().response( templateResponse );
      });
    });

  });

  return Controller;
});
