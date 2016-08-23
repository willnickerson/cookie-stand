'use strict';

//This is the object constructor for a store. The salesArray is instaciated as an empty array but will be filled with the hourly and total sales.
function Store(name, min, max, avg) {
  this.name = name;
  this.minCust = min;
  this.maxCust = max;
  this.avgSale = avg;
  this.total = 0;
  this.salesArray = [];
}

//calculates the # of customers at a given hour.
Store.prototype.generateRandom = function() {
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
};

//calculates # of cookies sold during a given hour based off of the # of customers during that hour.
Store.prototype.salesPerHour = function() {
  return this.avgSale * this.generateRandom();
};

//Loads the sales array with times of the day in which sales are made.
Store.prototype.loadHours = function() {
  var hour;
  var tableHours = [];
  for(var i = 0; i <= 14; i++) {
    if(i < 6){
      hour = i + 6 + 'AM';
    } else if(i === 6) {
      hour = '12PM';
    } else if(i < 14){
      hour = i - 6 + 'PM';
    } else {
      hour = 'Total';
    }
    this.salesArray[i] = [hour];
    tableHours[i + 1] = hour;
  }
  return tableHours;
};

//calculates total sales per day and loads sales per hour into salesArray.
Store.prototype.salesPerDay = function() {
  this.total = 0;
  this.loadHours();
  for(var i = 0; i < 14; i++) {
    this.salesArray[i][1] = Math.floor(this.salesPerHour());
    this.total += this.salesArray[i][1];
  }
  this.salesArray[(this.salesArray.length - 1)][1] = this.total;
};

//renders sales data onto page in list form.
Store.prototype.render = function() {
  this.salesPerDay();
  var ul = document.createElement('ul');
  var h2 = document.createElement('h2');
  var main = document.getElementById('store_info');

  //while(main.firstChild) {
    //main.removeChild(main.firstChild);
  //} // firstChild remove borrowed from stackoverflow: http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript

  h2.textContent = this.name;
  ul.appendChild(h2);

  for(var i = 0; i < this.salesArray.length; i++) {
    var li = document.createElement('li');
    li.textContent = this.salesArray[i][0] + ': ' + this.salesArray[i][1] + ' cookies';
    ul.appendChild(li);
  }
  main.appendChild(ul);
};

Store.prototype.renderToTable = function() {
  this.salesPerDay();
  var tr = document.createElement('tr');
  for (var i = 0; i <= this.salesArray.length; i++) {
    if(i === 0){
      var th = document.createElement('th');
      th.textContent = this.name;
      tr.appendChild(th);
    } else {
      var j = i - 1;
      var td = document.createElement('td');
      td.textContent = this.salesArray[j][1];
      tr.appendChild(td);
    }
  }
  tableBody.appendChild(tr);
};

var pike = new Store('Pike Place', 23, 65, 6.3);

//creating table and table head elts
var salesTable = document.createElement('table');
var headerContent = pike.loadHours();
var salesHead = document.createElement('thead');
var headerRow = document.createElement('tr');

//creating a appending table head content
for(var i = 0; i < headerContent.length; i++){
  var th = document.createElement('th');
  th.textContent = headerContent[i];
  headerRow.appendChild(th);
}

//appending table head to table
salesHead.appendChild(headerRow);
salesTable.appendChild(salesHead);

//creating body elts.
var tableBody = document.createElement('tbody');
salesTable.appendChild(tableBody);

pike.renderToTable();

var seaTac = new Store('SeaTac', 3, 24, 1.2);
seaTac.renderToTable();

var center = new Store('Seattle Center', 11, 38, 3.7);
center.renderToTable();

var capHill = new Store('Capitol Hill', 20, 38, 2.3);
capHill.renderToTable();

var alki = new Store('alki', 2, 16, 4.6);
alki.renderToTable();




//appending table to main.
var main = document.getElementById('store_info');
main.appendChild(salesTable);
