var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var List = mui.List;
var Card = mui.Card;
var Paper = mui.Paper;
var CardHeader = mui.CardHeader;
var AppBar = mui.AppBar;

App = React.createClass({

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

    Rewards.insert({
      name: name,
      points: points,
      createdAt: new Date()
    });

    React.findDOMNode(this.refs.rewardName).value = "";
    React.findDOMNode(this.refs.rewardPoints).value = "";
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

    return <div>
      <AppBar
        title="kRewards" 
        zDepth={1} />
      <Paper
        style={{
          float: 'left',
          width: '49.75%',
          textAlign: 'center',
          padding: '20px',
          marginRight: '0.25%'
        }}>
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
      </Paper>
      <Paper
        style={{
          float: 'left',
          width: '49.75%',
          padding: '20px',
          marginLeft: '0.25%'
        }}>
        <List 
          subheader="Current kRewards"
            style={{
          }}>
          {this.renderRewards()}
        </List>
      </Paper>
    </div>
  }
});