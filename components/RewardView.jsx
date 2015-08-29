var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var List = mui.List;
var Card = mui.Card;
var Paper = mui.Paper;
var CardHeader = mui.CardHeader;
var AppBar = mui.AppBar;

RewardView = React.createClass({

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      rewards: Rewards.find({}, {sort: {createdAt: -1}}).fetch(),
      completedTasks: Tasks.find({completed:true}).fetch()
    }
  },

  handleSubmit(event) {
    var name = this.refs.rewardName.getValue().trim();
    var points = parseInt(this.refs.rewardPoints.getValue().trim());

    Meteor.call('addReward', {
      name: name,
      points: points
    });

    this.refs.rewardName.setValue("");
    this.refs.rewardPoints.setValue("");
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  getTotalCompletedPoints(){
    var sum=0;
    this.data.completedTasks.forEach(function(task){
     sum = sum + task.points
    });
    return sum;
  },

  renderRewards(){
    var pts = this.getTotalCompletedPoints()

    return this.data.rewards.map((reward) => {
      return <Reward key={reward._id} reward={reward} completed={pts}/>;
    });
  },

  render: function() {

    return <SplitView
      leftContent= <div>
          <TextField
            hintText="Name of the reward"
            floatingLabelText="Name"
            ref="rewardName" />
          <br />
          <TextField
            hintText="Points for the reward"
            floatingLabelText="Points"
            type="number" 
            ref="rewardPoints" />
          <br />
          <RaisedButton label="Create" onClick={this.handleSubmit} />
        </div>
      rightContent= <div>
          <List 
            subheader="Current kRewards"
              style={{
            }}>
            {this.renderRewards()}
          </List>
        </div> />  
  }
});