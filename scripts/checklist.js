/* IIFE */
(function (window){
  'use strict';
  var App = window.App || {};
  var $ = window.jQuery; // '$' pointing to jQuery

  function CheckList(selector) {

    // throws error if no selector is made instantiating a new FormHandler object
    if(!selector){
      throw new Error('No selector provided');
    }
    this.$element = $(selector); // get object that has references to DOM Elements
    // using 'length' to find if any elements were found
    if (this.$element.length === 0){
      throw new Error('Could not find element with selector: ' + selector);
    }
  }

  // listen for a click event and 'bind' the callback to the CheckList instance
  CheckList.prototype.addClickHandler = function (fn) {
    // click event filtered to only 'input' elements
    this.$element.on('click', 'input', function (event) {
      // assign the customer's email address
      var email = event.target.value;
      // call removeRow of that email
      this.removeRow(email);
      // invoke fn and pass it email also
      fn(email);
      // set the context object
    }.bind(this));
  };

  CheckList.prototype.addRow = function (coffeeOrder) {
    // Remove any existing rows that match the email address
    this.removeRow(coffeeOrder.emailAddress);

    // Create a new instance of a row, using the coffee order info
    var rowElement = new Row(coffeeOrder);

    // Add the new row instance's $element property to the checklist
    this.$element.append(rowElement.$element);
  };

  CheckList.prototype.removeRow = function (email) {
    this.$element
    .find('[value="' + email + '"]')
    .closest('[data-coffee-order="checkbox"]')
    .remove();
  };

  // create DOM elements (and their values) to represent coffee orders
  function Row(coffeeOrder) {

    var $div = $('<div></div>', {
      // add their values
      'data-coffee-order': 'checkbox',
      'class': 'checkbox'
    });

    var $label = $('<label></label>');

    var $checkbox = $('<input></input>', {
      type: 'checkbox',
      value: coffeeOrder.emailAddress
    });

    var description = coffeeOrder.size + ' ';
    if (coffeeOrder.flavor) {
      description += coffeeOrder.flavor + ' ';
    }

    description += coffeeOrder.coffee + ', ';
    description += ' (' + coffeeOrder.emailAddress + ')';
    description += ' [' + coffeeOrder.strength + 'x]'

    // connect elements together
    $label.append($checkbox);
    $label.append(description);
    $div.append($label);

    // make element available as property of the instance (return element)
    this.$element = $div;

  }

  App.CheckList = CheckList;
  window.App = App;

})(window);
