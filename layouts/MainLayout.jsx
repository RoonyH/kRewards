var AppBar = mui.AppBar
var LeftNav = mui.LeftNav
var MenuItem = mui.MenuItem
var FlatButton = mui.FlatButton

console.log(MenuItem)

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

  mixins: [ReactMeteorData],
 
  getMeteorData() {
    return {
      user: Meteor.user()
    }
  },

  handleClick(e) {
    e.preventDefault();
 
    // Show/Hide the LeftMenu
    this.refs.leftNav.toggle();
  },

  handleLogIn(e) {
    this.refs.loginDialog.show();
  },

  handleSignUp(e){
    this.refs.signupDialog.show();
  },

  render() {
    var menuItems = [
      { route: 'people', text: 'People' },
      { route: 'rewards', text: 'Rewards' },
      { route: 'tasks', text: 'Tasks' }
    ];


    var loginDialog = <LoginDialog ref="loginDialog"/>;
    var loginButton = <FlatButton 
      label="LogIn"
      style={{
        marginRight: '8px'
      }}
      onClick={this.handleLogIn} />;
    var signupButton = <FlatButton label="SignUp"
      secondary={true}
      onClick={this.handleSignUp} />;
    var loginButtons = <div>
        {loginButton}
        {signupButton}
      </div>

    if(this.data.user)
      loginButtons = <FlatButton label="LogOut"
        onClick={Meteor.logout} />;

    return <div> 
      <LeftNav
        ref="leftNav"
        docked={false}
        menuItems={menuItems} />
      <AppBar
        title="k Rewards"
        onLeftIconButtonTouchTap={this.handleClick}
        iconElementRight={loginButtons}>
      </AppBar>
      <LoginDialog ref="loginDialog"/>
      <SignupDialog ref="signupDialog"/>
      {this.props.content}
    </div>
  }
});