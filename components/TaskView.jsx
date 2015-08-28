var ThemeManager = new mui.Styles.ThemeManager();
var TextField = mui.TextField;
var RaisedButton = mui.RaisedButton;
var List = mui.List;
var Card = mui.Card;
var Paper = mui.Paper;
var CardHeader = mui.CardHeader;
var AppBar = mui.AppBar;
var DropDownMenu = mui.DropDownMenu;

TaskView = React.createClass({

  mixins: [ReactMeteorData],
 
  getMeteorData() {
    return {
      tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
    }
  },

  handleSubmit(event) {
    var name = this.refs.taskName.getValue().trim();
    var points = parseInt(this.refs.taskPoints.getValue().trim());
    var description = this.refs.taskDescription.getValue().trim();
    var occurence = this.refs.taskDescription.getValue();

    Meteor.call('addTask', {
      name: name,
      points: points,
      description: description,
      occurence: occurence
    })

    this.refs.taskName.setValue('');
    this.refs.taskPoints.setValue('');
    this.refs.taskDescription.setValue('');
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  rendertasks() {
    return this.data.tasks.map((task) => {
      return <Task key={task._id} task={task} />;
    });
  },

  render: function() {


    let menuItems = [
       { payload: 'daily', text: 'Daily' },
       { payload: 'monthly', text: 'Monthly' },
       { payload: 'oneTime', text: 'One Time' }
    ];

    return <div>
      <Paper
        style={{
          float: 'left',
          textAlign: 'center',
          width: '49.75%',
          padding: '20px',
          marginRight: '0.25%'
        }}>
        <TextField
          hintText="Name of the task"
          floatingLabelText="Name"
          ref="taskName" />
        <br />
        <TextField
          hintText="Points for the task"
          floatingLabelText="Points"
          type="number" 
          ref="taskPoints" />
        <TextField
          style = {{
            width: "70%"
          }}
          hintText="Description of the task"
          floatingLabelText="Description"
          ref="taskDescription" />
        <DropDownMenu menuItems={menuItems}
          ref="taskOccurence" />
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
          subheader="Current Tasks"
            style={{
          }}>
          {this.rendertasks()}
        </List>
      </Paper>
    </div>
  }
});