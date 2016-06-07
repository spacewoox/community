import TooltipsterComponent from 'ember-cli-tooltipster/components/tool-tipster';

export default TooltipsterComponent.extend({

  classNameBindings: ['topbar-item', 'stateEnabled'],

  timer: 500,

  actions: {
    clickAction() {
      this.sendAction("click");
    }
  }
});
