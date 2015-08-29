var Tab = mui.Tab
var Tabs = mui.Tabs

var ThemeManager = new mui.Styles.ThemeManager();

SplitLayout = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  render() {
    return <div> 
      <Tabs value={this.props.selectedTab}>
      <Tab label="Rewards"
        value="rewards"
        onActive= {function(tab){
          FlowRouter.go('/rewards');
        }} >
      </Tab>
      <Tab label="Tasks"
        value="tasks"
        onActive= {function(tab){
          FlowRouter.go('/tasks');
        }} >
      </Tab>
    </Tabs>
      {this.props.content}
    </div>
  }
});