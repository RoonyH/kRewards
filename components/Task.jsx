var IconButton = mui.IconButton
var ListItem = mui.ListItem
var IconMenu = mui.IconMenu
var MenuItem = mui.MenuItem
var FontIcon = mui.FontIcon
var Checkbox = mui.Checkbox

Task = React.createClass({
  propTypes: {
    task: React.PropTypes.object.isRequired
  },

	infoMenuClicked(e, item){
    e.stopPropagation();
		var rId = item.props.taskId;
	
  	if(item.props.index == 2){ // if delete button
			Meteor.call('removeTask', rId);
		}
	},

  completedCheckBoxChecked(e, checked){
    Meteor.call('setTaskCompleted', this.props.task._id, checked);
  },

  render() { 
  	var task = this.props.task;

  	var iconButton = <FontIcon className="material-icons">info</FontIcon>

  	var iconMenu = <IconMenu iconButtonElement={iconButton} 
  			onItemTouchTap={this.infoMenuClicked}>
		  <MenuItem primaryText="Edit" index={1} 
  			taskId={task._id} />
		  <MenuItem primaryText="Delete" index={2} 
  			taskId={task._id} />
		</IconMenu>

    var completedCheckBox = <Checkbox
      name="checkboxName1"
      value="checkboxValue1"
      defaultChecked={task.completed}
      onCheck={this.completedCheckBoxChecked}/>

  	return (
  		<ListItem 
  			primaryText={task.name + " " + task.points}
  			rightIconButton={iconMenu} 
        leftCheckbox={completedCheckBox}>
  		</ListItem>	
		)
  }
})