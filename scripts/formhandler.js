/* IIFE */
(function (window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery; // '$' pointing to jQuery

  function FormHandler(selector) {

    // throws error if no selector is made instantiating a new FormHandler object
    if(!selector){
      throw new Error('No selector provided');
    }
    this.$formElement = $(selector); // get object that has references to DOM Elements
    // using 'length' to find if any elements were found
    if (this.$formElement.length === 0){
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  // submit listener that will call the function
  FormHandler.prototype.addSubmitHandler = function (fn) { // uses function parameter for callback
    console.log('Setting sumbit handler for form');
    // when submit button is clicked in the form
    this.$formElement.on('submit', function (event) {
      event.preventDefault(); // prevents user to be taken away from the page

      // serializeArray gets values from the form, called using jQuery $(this)
      var data = {};
      // serializeArray return objects
      $(this).serializeArray().forEach(function(item){ // forEach goes through array of objects,
        data[item.name] = item.value; // data is made into a single object, object names are assigned to their values
        console.log(item.name + ' is ' + item.value)
      });
      console.log(data);
      fn(data); // callback invoked with passed data
      this.reset(); // resets form on submit
      this.elements[0].focus(); // focus on first element after reset
    });
  };

  App.FormHandler = FormHandler;
  window.App = App;

})(window);
