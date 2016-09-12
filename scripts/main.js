(function (window) {
  'use strict';
  var FORM_SELECTOR = '[data-coffee-order="form"]';
  var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';

  var App = window.App;
  var Truck = App.Truck;
  var DataStore = App.DataStore;
  var FormHandler = App.FormHandler;
  var Validation = App.Validation;
  var CheckList = App.CheckList;

  var myTruck = new Truck('HAL', new DataStore());
  window.myTruck = myTruck; // global namespace

  var checkList = new CheckList(CHECKLIST_SELECTOR);
  checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
  var formHandler = new FormHandler(FORM_SELECTOR); // makes FormHandler work with DOM element

  // 'call' myTruck.createOrder and checkList.addRow through an anonymous function
  formHandler.addSubmitHandler(function (data) {
    myTruck.createOrder.call(myTruck, data);
    checkList.addRow.call(checkList, data);
  }); // sets up sumbit listener
  console.log(formHandler);

  // call listener from formHandler and checks with the Validation method
  formHandler.addInputHandler(Validation.isCompanyEmail);

})(window);
