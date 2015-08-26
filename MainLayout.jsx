var Tab = mui.Tab
var Tabs = mui.Tabs

var ThemeManager = new mui.Styles.ThemeManager();

MainLayout = React.createClass({
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
      <Tabs>
      <Tab label="Rewards"
        onActive= {function(tab){
          FlowRouter.go('/rewards');
        }} >
      </Tab>
      <Tab label="Tasks" 
        onActive= {function(tab){
          FlowRouter.go('/tasks');
        }} >
      </Tab>
    </Tabs>
      {this.props.content}
    </div>
  }
});