import Ember from 'ember';

export default Ember.Component.extend({

  /* global $:false */
  classNames: ['single-tab'],
  remoteSession: Ember.inject.service('remote-session'),
  session: Ember.inject.service('session'),

  connectionName: null,
  logoff: false,

  topBarItemToggleWindowCollector: {
    upload: false,
    clipboard: false,
    download: false,
  },

  showState: false,
  dragAndDropActive: false,
  windowIsSelected: false,

  manageOpenedWindow: function() {
    if (this.get('dragAndDropActive') === true) {
      this.closeAll();
    }
  }.observes('dragAndDropActive'),

  toggling() {

    if (this.get('showState') === false) {
      $('.canva-fullscreen').hide();
      $('.ember-modal-fullscreen').velocity({ opacity:1, left: 0} , {
        easing: "linear",
        duration: 300,
        complete: function() {
          $('.canva-fullscreen').show();
        }.bind(this),
      });

      this.set('showState', true);
    }
    else {
      this.closeAll();
      $('.canva-fullscreen').hide();
      $('.ember-modal-fullscreen').velocity({ opacity:0, left: -(window.innerWidth) }, {
        easing: "linear",
        duration: 400
      });

      setTimeout(function() {
        this.set('showState', false);
        this.set('isVisible', false);
        this.sendAction('onClose');
      }.bind(this), 900);
    }
  },

  initialize: function() {
    this.toggling();
  }.on('becameVisible'),

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
    this.set('windowIsSelected', false);
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
      this.set('windowIsSelected', true);
    }
    else {
      this.set('topBarItemToggleWindowCollector.' + element, false);
    }
  },

  vdiDisconnectHandler(options) {
    this.set('logoff', true);
    Ember.$.ajax({
      type: "DELETE",
      headers: { Authorization : "Bearer " + this.get('session.access_token')},
      url: "/api/sessions",
      data: { user: "./" + this.get('session.user')}
    })
    .then(() => {
      this.set('logoff', false);
      if (!options) {
        this.toast.success("You have been disconnected successfully");
      }
      else {
        if (options.error === true) {
          this.toast.error(options.message);
        }
        else {
          this.toast.success(options.message);
        }
      }
      this.toggling();
    });
  },

  actions: {

    closeAll() {
      this.closeAll();
    },

    disconnectVDI(message) {
      this.vdiDisconnectHandler(message);
    },

    toggleSingleTab() {
      this.toggling();
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
