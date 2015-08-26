Rewards = new Mongo.Collection("rewards");
Tasks = new Mongo.Collection("tasks");

var Tab = mui.Tab

if (Meteor.isClient) {

  injectTapEventPlugin();

  FlowRouter.route('/', {

    action: function() {
    	ReactLayout.render(MainLayout, {
        selectedTab: "rewards",
        content: <RewardView />
      });
    }
  });

  FlowRouter.route('/rewards', {

    action: function() {
      ReactLayout.render(MainLayout, {
        selectedTab: "rewards",
        content: <RewardView />
      });
    }
  });

  FlowRouter.route('/tasks', {

    action: function() {
      ReactLayout.render(MainLayout, {
        selectedTab: "tasks",
        content: <TaskView />
      });
    }
  });
}