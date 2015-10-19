/* global React */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.PoductPreview = React.createClass({
    getInitialState: function(){
      return { username: "", password: "", passwordConfirm: "", badPassword: false };
    },

    showLogin: function(e){
      var login = React.findDOMNode(this.refs.login);
      e.target.classList.add("fading-out");
      login.classList.add("fading-in");
    },

    showSignup: function(e){
      e.preventDefault();
      var login = React.findDOMNode(this.refs.login);
      var signup = React.findDOMNode(this.refs.signup);
      login.classList.remove("fading-in");
      login.classList.add("fading-out");
      signup.classList.add("fading-in");
    },

    changeUsername: function(e){
      this.setState({ username: e.target.value });
    },

    changePassword: function(e){
      this.setState({ password: e.target.value });
    },

    changePasswordConfirm: function(e){
      this.setState({ passwordConfirm: e.target.value });
    },

    componentWillMount: function () {
      this.authenticityToken = $('meta[name="csrf-token"]').attr('content');
    },

    signup: function(e){
      if(this.state.password !== this.state.passwordConfirm){
        e.preventDefault();
        this.setState({ passwordConfirm: "", badPassword: true });
      }
    },

    render: function(){
      return(
        <div className="product-preview">
          <div className="main-preview">
            <h1>See Your Data (ugh)</h1>
          </div>
          <div className="login-section">

            <button className="login-section-button" onClick={this.showLogin}>Start Visualizing Now</button>

            <form className="login-form" action="/session" method="POST" ref="login">
              <input type="hidden"
                     name="authenticity_token"
                     value={this.authenticityToken}/>
              <input type="text"
                     name="user[username]"
                     onChange={this.changeUsername}
                     placeholder="Username"
                     value={this.state.username} />
                   <br/>
                   <br/>
              <input type="password"
                     name="user[password]"
                     onChange={this.changePassword}
                     placeholder="Password"
                     value={this.state.password} />
                   <br/>
                   <br/>
              <input type="submit" value="Login"/>
              <br/>
              <br/>
              <button onClick={this.showSignup}>Not A Member? Sign Up</button>
            </form>

            <form className="login-form" action="/users" method="POST" onSubmit={this.signup} ref="signup">
              <input type="hidden"
                     name="authenticity_token"
                     value={this.authenticityToken}/>
              <input type="text"
                     name="user[username]"
                     onChange={this.changeUsername}
                     placeholder="Username"
                     value={this.state.username} />
                   <br/>
                   <br/>
             {
              this.state.badPassword ?
                <div style={{ color: "red", textShadow: "1px 1px 5px #000" }}>Passwords didn't match.</div>
              :
                <div></div>
             }
              <input type="password"
                     name="user[password]"
                     onChange={this.changePassword}
                     placeholder="Password"
                     value={this.state.password} />
                   <br/>
                   <br/>
              <input type="password"
                     onChange={this.changePasswordConfirm}
                     placeholder="Password Confirmation"
                     value={this.state.passwordConfirm} />
                   <br/>
                   <br/>
              <input type="submit" value="Signup"/>
            </form>
          </div>
        </div>
      );
    }
  });
}());
