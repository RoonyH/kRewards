var Dialog = mui.Dialog
var TextField = mui.TextField

LoginDialog = React.createClass({

	logIn(){
		var username = this.refs.username.getValue().trim();
		var password = this.refs.password.getValue().trim();

		var self = this;

		Meteor.loginWithPassword(username, password, function(err){
			if(err){
				self.refs.username.setErrorText('')
				self.refs.password.setErrorText('')
				if(err.reason.indexOf("User") > -1)
					self.refs.username.setErrorText(err.reason)
				if(err.reason.indexOf("password") > -1)
					self.refs.password.setErrorText(err.reason)
			} else {
				self.refs.dialog.dismiss();
			}
		});
	},

	show(){
		this.refs.dialog.show();
	},

  render() {
		var loginActions = [
		  { text: 'Cancel' },
		  { text: 'Log In', onTouchTap: this.logIn, ref: 'submit' }
		];

    return <Dialog
    	ref="dialog"
    	contentStyle={{
    		width: '40%',
        textAlign: 'center'
    	}}
		  title="Log In"
		  actions={loginActions}
		  actionFocus="submit">
		  <TextField
		  	ref="username"
				hintText="Username"
				floatingLabelText="Username" />
			<br />	
		  <TextField
		  	ref="password"
			  hintText="Password"
			  floatingLabelText="Password"
			  type="password" />
		</Dialog>;
  }
});

SignupDialog = React.createClass({


	signUp(){
		var username = this.refs.username.getValue().trim();
		var password = this.refs.password.getValue().trim();
		var name = this.refs.name.getValue().trim();
	
		var user = {
				username: username,
				password: password,
				name: name
		}

		var self = this;

		Accounts.createUser(user, function(err){
			if(err){
				self.refs.username.setErrorText('')
				self.refs.password.setErrorText('')
				if(err.reason.indexOf("Username") > -1)
					self.refs.username.setErrorText(err.reason)
				if(err.reason.indexOf("Password") > -1)
					self.refs.password.setErrorText(err.reason)
			} else {
				self.refs.dialog.dismiss();
			}
		});
	},

	show(){
		this.refs.dialog.show();
	},

  render() {

		var signupActions = [
		  { text: 'Cancel' },
		  { text: 'SignUp', onTouchTap: this.signUp, ref: 'submit' }
		];

    return <Dialog
    	ref="dialog"
    	contentStyle={{
    		width: '40%',
        textAlign: 'center'
    	}}
		  title="Sign Up"
		  actions={signupActions}
		  actionFocus="submit">
		  <TextField
		  	ref="username"
				hintText="Username"
				floatingLabelText="Username" />
			<br />	
		  <TextField
		  	ref="name"
			  hintText="Real Name"
				floatingLabelText="name"  />
			<br />	
		  <TextField
		  	ref="password"
			  hintText="Password"
			  floatingLabelText="Password"
			  type="password" />
		</Dialog>;
  }
});
