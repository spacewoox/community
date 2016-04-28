import Ember from 'ember';

export default Ember.Controller.extend({

  downloadCSVService: Ember.inject.service('download-csv'),
  sessionService: Ember.inject.service('session'),

  actions: {
    downloadCSV() {

      var session = this.get('sessionService');

      this.get('downloadCSVService').downloadCSV(this.get('sessionService.access_token'), this.get('model'));
    }
  }
});
