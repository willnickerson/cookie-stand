'use strict';

//Pike store
var pike = {
  minCust: 23,
  maxCust: 65,
  avgSale: 6.3,
  total: 0,
  salesArray: [],
  //This generates the # of customers per hour
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  //This calculates the # of sales during a given hour
  salesPerHour: function() {
    return this.avgSale * this.generateRandom();
  },
  //This turns an array indice into a time of day for final rendering
  loadHours: function(){
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
      this.salesArray[i] = [hour,0];
    }
  },
  //Calculates total sales per day and loads array with sales during a given hour. var i is the number of hours per day the store is open.
  salesPerDay: function() {
    pike.loadHours();
    for(var i = 0; i < 14; i++) {
      this.salesArray[i][1] = Math.floor(this.salesPerHour());
      this.total += this.salesArray[i][1];
    }
    this.salesArray[(this.salesArray.length - 1)][1] = this.total;
  },
  //This renders the sales array into readible info in the browser.
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    var main = document.getElementById('store_info');

    //while(main.firstChild) {
      //main.removeChild(main.firstChild);
    //} // firstChild remove borrowed from stackoverflow: http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript

    h2.textContent = 'Pike';
    ul.appendChild(h2);

    for(var i = 0; i < this.salesArray.length; i++) {
      var li = document.createElement('li');
      li.textContent = this.salesArray[i][0] + ': ' + this.salesArray[i][1] + 'cookies';
      ul.appendChild(li);
    }
    main.appendChild(ul);
  }
};

//SeaTac store
var seaTac = {
  minCust: 3,
  maxCust: 24,
  avgSale: 1.2,
  total: 0,
  salesArray: [],
  //This generates the # of customers per hour
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  //This calculates the # of sales during a given hour
  salesPerHour: function() {
    return this.avgSale * this.generateRandom();
  },
  //This turns an array indice into a time of day for final rendering
  loadHours: function(){
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
      this.salesArray[i] = [hour,0];
    }
  },
  //Calculates total sales per day and loads array with sales during a given hour. var i is the number of hours per day the store is open.
  salesPerDay: function() {
    seaTac.loadHours();
    for(var i = 0; i < 14; i++) {
      this.salesArray[i][1] = Math.floor(this.salesPerHour());
      this.total += this.salesArray[i][1];
    }
    this.salesArray[(this.salesArray.length - 1)][1] = this.total;
  },
  //This renders the sales array into readible info in the browser.
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    var main = document.getElementById('store_info');

    h2.textContent = 'SeaTac';
    ul.appendChild(h2);

    for(var i = 0; i < this.salesArray.length; i++) {
      var li = document.createElement('li');
      li.textContent = this.salesArray[i][0] + ': ' + this.salesArray[i][1] + 'cookies';
      ul.appendChild(li);
    }
    main.appendChild(ul);
  }
};

//Seattle center store
var center = {
  minCust: 11,
  maxCust: 38,
  avgSale: 3.7,
  total: 0,
  salesArray: [],
  //This generates the # of customers per hour
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  //This calculates the # of sales during a given hour
  salesPerHour: function() {
    return this.avgSale * this.generateRandom();
  },
  //This turns an array indice into a time of day for final rendering
  loadHours: function(){
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
      this.salesArray[i] = [hour,0];
    }
  },
  //Calculates total sales per day and loads array with sales during a given hour. var i is the number of hours per day the store is open.
  salesPerDay: function() {
    center.loadHours();
    for(var i = 0; i < 14; i++) {
      this.salesArray[i][1] = Math.floor(this.salesPerHour());
      this.total += this.salesArray[i][1];
    }
    this.salesArray[(this.salesArray.length - 1)][1] = this.total;
  },
  //This renders the sales array into readible info in the browser.
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    var main = document.getElementById('store_info');

    h2.textContent = 'Seattle Center';
    ul.appendChild(h2);

    for(var i = 0; i < this.salesArray.length; i++) {
      var li = document.createElement('li');
      li.textContent = this.salesArray[i][0] + ': ' + this.salesArray[i][1] + 'cookies';
      ul.appendChild(li);
    }
    main.appendChild(ul);
  }
};

pike.salesPerDay();
pike.render();

seaTac.salesPerDay();
seaTac.render();
