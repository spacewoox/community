import Ember from 'ember';

export default Ember.Component.extend({

  showState: false,

  toggling() {

    console.log('try to toggle :' + this.get('showState'));
    if (this.get('showState') == false) {
    console.log('toggling sj');
      this.$().find('.canva-fullscreen').hide();
      /*
      context.$().find('.ember-modal-fullscreen').velocity({ opacity:1, left: 0} , {
        easing: "linear",
        duration: 100,
        complete: function() {
          context.$().find('.canva-fullscreen').show();
        }.bind(context)
      });
      */
      this.$().find('.ember-modal-fullscreen').css("opacity", 1);
      this.$().find('.ember-modal-fullscreen').css("left", 0);
      setTimeout(function() {
        this.$().find('.canva-fullscreen').show();
      }.bind(this), 2000);
      this.set('showState', true);
    }
    else {
      this.$().find('.canva-fullscreen').hide();
      this.$().find('.ember-modal-fullscreen').css("opacity", 0);
      this.$().find('.ember-modal-fullscreen').css("left", "-100%");

      setTimeout(function() {
          this.set('showState', false);
          this.set('isVisible', false);
      }.bind(this), 900);
    }
  },

  actions: {
    startToggling() {
      this.toggling();
    }
  }
});
