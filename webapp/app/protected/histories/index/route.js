import Ember from 'ember';

export default Ember.Route.extend({

  setupController(controller, model) {
    controller.set('items', model);
    controller.setData();
  },

  model() {
    this.controllerFor('protected.histories.index').setData();
    return this.store.query('history', {});
  },

  actions: {
    refreshModel() {
      this.refresh();
    }
  }
});
