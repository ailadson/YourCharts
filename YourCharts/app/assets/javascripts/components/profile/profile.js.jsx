(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.Profile = React.createClass({
    getInitialState: function(){
      return { mainContent: "" };
    },

    changeMainContent: function(name){
      this.setState({ mainContent: name });
    },

    render: function(){
      return(
        <div className="profile">
          <Components.ProfileSidePanel handleContentChange={this.changeMainContent} />
          <Components.ProfileMainContent mainContent={this.state.mainContent}/>
        </div>
      );
    }
  });
}());
