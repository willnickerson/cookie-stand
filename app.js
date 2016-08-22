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
      //console.log(hour);
      this.salesArray[i] = [hour,0];
    }
  },

  salesPerDay: function() {
    pike.loadHours();
    for(var i = 0; i < 14; i++) {
      this.salesArray[i][1] = this.salesPerHour();
      this.total += this.salesArray[i][1];
    }
    this.salesArray[(this.salesArray.length - 1)][1] = this.total;
  },
  render: function() {
    var ul = document.createElement('ul');
    var h2 = document.createElement('h2');
    //var li = document.createElement('li');
    var main = document.getElementById('store_info');

    h2.textContent = 'Pike';
    ul.appendChild(h2);

    for(var i = 0; i < this.salesArray.length; i++) {
      var li = document.createElement('li');
      if (i < (this.salesArray.length - 1)) {
        li.textContent = 'Sales this hour: ' + this.salesArray[i];
      } else {
        li.textContent = 'Total: ' + this.total;
      }
      ul.appendChild(li);
    }


    //li.textContent = 'Total: ' + this.total;

    //ul.appendChild(li);
    main.appendChild(ul);
  }
};
