var AppBar = mui.AppBar

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
      <AppBar
        title="k Rewards">
      </AppBar>
      {this.props.content}
    </div>
  }
});