/* IIFE - immediately invoked function expression */
(function(window) {
  'use strict';
  var App = window.App || {}; // if there is an App assign it, else make a new object
  var $ = window.jQuery;

  function RemoteDataStore(url){
    if(!url){
      throw new Error('No remote URL supplied.');
    }

    this.serverUrl = url;
  }

  // Add function for the remote server
  RemoteDataStore.prototype.add = function (key, val) {
    $.post(this.serverUrl, val, function (serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function(cb) {
    $.get(this.serverUrl, function(serverResponse){
      console.log(serverResponse);
      // passing a function in getAll gives you the ability to call the function inside the $.get callback, having accessing to both function and server response
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverUrl + '/' + key, function (serverResponse){
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    $.ajax(this.serverUrl + '/' + key, {
      type: 'DELETE'
    });
  };


  App.RemoteDataStore = RemoteDataStore; // attached RemoteDataStore to the App object
  window.App = App; // reassigned global App property

})(window);
