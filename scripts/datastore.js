// Data store is not a true database, but works well with coffeerun project

/* IIFE - immediately invoked function expression */
(function(window) {
  'use strict';
  var App = window.App || {}; // if there is an App assign it, else make a new object
  var Promise = window.Promise; // making promise var to work with updated scripts

  function DataStore() { // our function of DataStore
    // making data private through closure
    this.data = function(){
      return {};
    };
  }

  function promiseResolvedWith(value) {
    var promise = new Promise(function (resolve, reject) {
      resolve(value);
    });
    return promise;
  }

// each instance will have access to the function
// Example of adding = ds.('me@email.com', 'coffee')
  DataStore.prototype.add = function (key, val) {  // 'add' property takes two arguments, to change instance's data property

    return promiseResolvedWith(null);
  };

// look up data from specific key value
  DataStore.prototype.get = function (key) {
    return promiseResolvedWith(this.data[key]);
  };

// method for removing information at specific key value
DataStore.prototype.remove = function (key) {
  delete this.data[key];
  return promiseResolvedWith(null);
};

// look up all data
  DataStore.prototype.getAll = function () {
    return promiseResolvedWith(this.data);
  };

  App.DataStore = DataStore; // attached DataStore to the App object
  window.App = App; // reassigned global App property

})(window);
