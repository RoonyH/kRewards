Rewards = new Mongo.Collection("rewards");
Tasks = new Mongo.Collection("tasks");

if (Meteor.isClient) {

  injectTapEventPlugin();

  FlowRouter.route('/', {

    action: function() {
      console.log('root');
    	ReactLayout.render(App);
    }
  });

  FlowRouter.route('/rewards', {

    action: function() {
      console.log('root');
    	ReactLayout.render(App);
    }
  });

  FlowRouter.route('/tasks', {

    action: function() {
      console.log('create')
    	ReactLayout.render(TaskView);
    }
  });
}