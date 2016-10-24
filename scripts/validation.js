/* IIFE - immediately invoked function expression */
(function(window) {
  'use strict';
  var App = window.App || {}; // if there is an App assign it, else make a new object

  var Validation = {
    isCompanyEmail: function (email) {
      return /.+@example\.com$/.test(email);
    }
  };

  App.Validation = Validation; // attached Validation to the App object
  window.App = App; // reassigned global App property
})(window);
