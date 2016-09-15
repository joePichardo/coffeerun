(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
  var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var RemoteDataStore = App.RemoteDataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var remoteDS = new RemoteDataStore(SERVER_URL);
  var myTruck = new Truck('HAL', new DataStore());
  window.myTruck = myTruck; // global namespace

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR); // makes FormHandler work with DOM element

  // 'call' myTruck.createOrder and checkList.addRow through an anonymous function
  formHandler.addSubmitHandler(function (data) {
    return myTruck.createOrder.call(myTruck, data)
      .then(function () { //chaining the 'then' function
        checkList.addRow.call(checkList, data);
      }/*,
      // 'then' accepts a second argument when Deferred shifts to the rejected state
      function () {
        alert('Server unreachable. Try again later.');
      }*/
      );
  }); // sets up sumbit listener
  console.log(formHandler);

  // call listener from formHandler and checks with the Validation method
  formHandler.addInputHandler(Validation.isCompanyEmail);

  myTruck.printOrders(checkList.addRow.bind(checkList));

})(window);
