(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;

  var myTruck = new Truck('HAL', new DataStore());
  var formHandler = new FormHandler(FORM_SELECTOR); // makes FormHandler work with DOM element

  // binds myTruck instance to guarantee it is the same owner
  formHandler.addSubmitHandler(myTruck.createOrder.bind(myTruck)); // sets up sumbit listener
  console.log(formHandler);

  window.myTruck = myTruck; // global namespace
})(window);
