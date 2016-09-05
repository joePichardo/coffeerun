/* IIFE */
(function (window) {
  'use strict';
  var App = window.App || {};

// declared parameters, they are assigned each as properties to new constructed instance
// Ex. var myTruck = new App.Truck('007', new App.DataStore());
  function Truck(truckId, db) {
    this.truckId = truckId;
    this.db = db;
  }
// adds orders through objects. Ex. myTruck.createOrder({ emailAddress: 'me@email.com', coffee: 'decaf' });
  Truck.prototype.createOrder = function (order) {
    // message console, and use 'add' method from DataStore
    console.log('Adding order for ' + order.emailAddress);
    this.db.add(order.emailAddress, order); // db is the DataStore instance, which helps call the 'add' function
  };

// retrieve all the coffee orders from db object
Truck.prototype.printOrders = function () {
  // create array of all items in the db object
  var customerIdArray = Object.keys(this.db.getAll());

  console.log('Truck #' + this.truckId + ' has pending orders:');
  // go through array and print the array
  customerIdArray.forEach(function (id) {
    console.log(this.db.get(id)); // print array using the 'get' function from DataStore
  }.bind(this)); // this is undefined b/c callback has no owner, bind fixes this
};

// customerId is the emailAddress of customer, passed in to remove that order
  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    this.db.remove(customerId);
  };

  App.Truck = Truck;
  window.App = App;

})(window);
