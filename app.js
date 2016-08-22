'use strict';

var pike = {
  minCust: 23,
  maxCust: 65,
  avgSale: 6.3,
  total: 0,
  salesArray: [],
  generateRandom: function() {
    return Math.floor(Math.random() * (this.maxCust - this.minCust + 1) + this.minCust);
  },
  salesPerHour: function() {
    return this.avgSale * this.generateRandom();
  },

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

  salesPerDay: function() {
    pike.loadHours();
    for(var i = 0; i < 14; i++) {
      this.salesArray[i][1] = Math.floor(this.salesPerHour());
      this.total += this.salesArray[i][1];
    }
    this.salesArray[(this.salesArray.length - 1)][1] = this.total;
  },
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    var main = document.getElementById('store_info');

    while(main.firstChild) {
      main.removeChild(main.firstChild);
    } // firstChild remove borrowed from stackoverflow: http://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript

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
