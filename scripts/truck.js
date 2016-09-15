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
    // since 'RemoteDataStore' methods return Deffereds, Truck methods are updated with 'return'
    return this.db.add(order.emailAddress, order); // db is the DataStore instance, which helps call the 'add' function
  };

// retrieve all the coffee orders from db object
Truck.prototype.printOrders = function (printFn) {
  return this.db.getAll()
  .then(function (orders){
    // create array of all items in the db object
    var customerIdArray = Object.keys(orders);

    console.log('Truck #' + this.truckId + ' has pending orders:');
    // go through array and print the array
    customerIdArray.forEach(function (id) {
      console.log(orders[id]); // print array using the 'get' function from DataStore
      if(printFn){
        printFn(orders[id]);
      }
    }.bind(this)); // this is undefined b/c callback has no owner, bind fixes this
  }.bind(this));

};

// customerId is the emailAddress of customer, passed in to remove that order
  Truck.prototype.deliverOrder = function (customerId) {
    console.log('Delivering order for ' + customerId);
    return this.db.remove(customerId);
  };

  App.Truck = Truck;
  window.App = App;

})(window);
