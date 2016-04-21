import Ember from 'ember';

export default Ember.Component.extend({

  remoteSession: Ember.inject.service('remote-session'),
  connectionName: null,
  isVisible: Ember.computed('componentParams.isVisible', function() {
    return this.get('componentParams.isVisible');
  }),

  elementBecameVisible: function() {

    console.log('element became visible: ' + this.get('isVisible'));
    this.get('parentContext').toggling();
  }.on('becameVisible'),

  topBarItemToggleWindowCollector: {
    upload: false,
    clipboard: false,
    download: false,
  },

  uploadIsVisible: Ember.computed('topBarItemToggleWindowCollector.upload', function() {
    return this.get('topBarItemToggleWindowCollector.upload');
  }),

  clipboardIsVisible: Ember.computed('topBarItemToggleWindowCollector.clipboard', function() {
    return this.get('topBarItemToggleWindowCollector.clipboard');
  }),

  downloadIsVisible: Ember.computed('topBarItemToggleWindowCollector.download', function() {
    return this.get('topBarItemToggleWindowCollector.download');
  }),

  closeAll() {
    var object = this.get('topBarItemToggleWindowCollector');
    for (var prop in object) {
      var objToBeSet = 'topBarItemToggleWindowCollector.' + prop;
      this.set(objToBeSet, false);
    }
  },

  handleToggling(element) {
    var state = this.get('topBarItemToggleWindowCollector.' + element);
    this.closeAll();
    if (!state) {
      this.set('topBarItemToggleWindowCollector.' + element, true);
    }
  },

  actions: {

    toggleSingleTab() {
      this.get('parentContext').toggling();
    },

    toggleUploadWindow() {
      this.handleToggling('upload');
    },

    toggleClipboardWindow() {
      this.handleToggling('clipboard');
    },

    toggleDownloadWindow() {
      this.handleToggling('download');
    },
  }
});
