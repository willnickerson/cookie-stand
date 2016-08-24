'use strict';

var storeArray = [];
//This is the object constructor for a store. The salesArray is instaciated as an empty array but will be filled with the hourly and total sales.
function Store(name, min, max, avg) {
  this.name = name;
  this.minCust = min;
  this.maxCust = max;
  this.avgSale = avg;
  this.total = 0;
  this.salesArray = [];
  storeArray.push(this);
}

//insatanctiating stores
var pike = new Store('Pike Place', 23, 65, 6.3);
var seaTac = new Store('SeaTac', 3, 24, 1.2);
var center = new Store('Seattle Center', 11, 38, 3.7);
var capHill = new Store('Capitol Hill', 20, 38, 2.3);
var alki = new Store('Alki', 2, 16, 4.6);



//calculates the # of customers at a given hour.
Store.prototype.generateRandom = function() {
  return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
};

//calculates # of cookies sold during a given hour based off of the # of customers during that hour.
Store.prototype.salesPerHour = function() {
  return this.avgSale * this.generateRandom();
};

//calculates total sales per day and loads sales per hour into salesArray.
Store.prototype.salesPerDay = function() {
  this.total = 0;
  for(var i = 0; i <= 14; i++) {
    this.salesArray[i] = Math.floor(this.salesPerHour());
    this.total += this.salesArray[i];
  }
  this.salesArray[(this.salesArray.length - 1)] = this.total;
};

//renders sale data to table
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
      td.textContent = this.salesArray[j] + ' cookies';
      tr.appendChild(td);
    }
  }
  return tr;
};

//This is a helper function that loads the hours of the day into the table head.
function tableHeadHours() {
  var tableHours = [];
  var hour;
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
    tableHours[i + 1] = hour;
  }
  return tableHours;
}

//creating table and table head elts
function createTable() {
  var salesTable = document.createElement('table');
  var headerContent = tableHeadHours();
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

  //creating table body and appending store rows to table.
  var tableBody = document.createElement('tbody');

  for(i = 0; i < storeArray.length; i++) {
    var tr = storeArray[i].renderToTable();
    tableBody.appendChild(tr);
  }
  //appending body to table
  salesTable.appendChild(tableBody);

  //this function totals sales from all stores to each hour table footer
  function totalByHour() {
    //creating footer elts
    var tableFoot = document.createElement('tfoot');
    var footRow = document.createElement('tr');

    //looping through sales at each hour and storing the totals in an array
    var totalArray = ['Totals by hour'];
    for(i = 0; i < 15; i++) {
      var hourTotal = 0;
      for(var j = 0; j < storeArray.length; j++){
        hourTotal += storeArray[j].salesArray[i];
        totalArray[(i + 1)] = hourTotal;
      }
    }
    //creating table row for the footer and filling it with hour totals
    for(var i = 0; i < headerContent.length; i++) {
      if(i === 0){
        var th = document.createElement('th');
        th.textContent = totalArray[i];
        footRow.appendChild(th);
      } else {
        var td = document.createElement('td');
        td.textContent = totalArray[i];
        footRow.appendChild(td);
      }
    }
    //appending table footer to table.
    tableFoot.appendChild(footRow);
    salesTable.appendChild(tableFoot);
  }

  totalByHour();
  //appending table to page
  var main = document.getElementById('store_info');
  main.appendChild(salesTable);
}

createTable();
