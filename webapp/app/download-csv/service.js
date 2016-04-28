import Ember from 'ember';

export default Ember.Service.extend({

  downloadCSV(accessToken, model) {

    var csvContent = "data:text/csv;charset=utf-8,";

    var columnNumber = 4;
    csvContent += "IDUSER,CONNECTION,START,END\n"; 

    model.forEach(function(item) {
      csvContent += item.get('userId') + "," + item.get('connectionId') + "," + item.get('startDate') + "," + item.get('endDate') + "\n";
    });

    let url = encodeURI(csvContent);
    window.location.assign(url);
  }
});
