Rewards = new Mongo.Collection("rewards");
Tasks = new Mongo.Collection("tasks");

Meteor.subscribe("tasks");
Meteor.subscribe("rewards");

if (Meteor.isServer) {
  Meteor.publish("tasks", function () {
    return Tasks.find();
  });

  Meteor.publish("rewards", function () {
    return Rewards.find();
  });
}


Meteor.methods({
  addReward(reward) {
    if(Meteor.isServer) { 
      Meteor._sleepForMs(2000); 
    } 
    Rewards.insert({
      name: reward.name,
      points: reward.points,
      createdAt: new Date()
    });
  },

  removeReward(id) {
    Rewards.remove(id)
  },

  addTask(task) {
    Tasks.insert({
      name: task.name,
      points: task.points,
      description: task.description,
      createdAt: new Date()
    });
  },

  removeTask(id) {
    Tasks.remove(id)
  },

  setTaskCompleted(id, completed) {
    Tasks.update(id, {
      $set: {completed: completed}
    });
  }
});

injectTapEventPlugin();

FlowRouter.route('/', {

  action: function() {
  	ReactLayout.render(MainLayout, {
      content: <SplitLayout
        selectedTab= "rewards"
        content= <RewardView />>
      </SplitLayout>
    });
  }
});

FlowRouter.route('/rewards', {

  action: function() {
    ReactLayout.render(MainLayout, {
      content: <SplitLayout
        selectedTab= "rewards"
        content= <RewardView />>
      </SplitLayout>
    });
  }
});

FlowRouter.route('/tasks', {

  action: function() {
    ReactLayout.render(MainLayout, {
      content: <SplitLayout
        selectedTab= "tasks"
        content= <TaskView />>
      </SplitLayout>
    });
  }
});
