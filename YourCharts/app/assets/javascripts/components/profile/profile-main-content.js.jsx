(function() {
  'use strict';

  var Components = window.Components = window.Components || {};

  Components.ProfileMainContent = React.createClass({
    render: function(){
      if(!this.props.mainContent){
        return(<div className="profile-main-content"></div>)
      }

      var ProfileContent = Components.ProfileContent[this.props.mainContent];

      return(
        <div className="profile-main-content">
          <ProfileContent />
        </div>
      );
    }
  });
}());
