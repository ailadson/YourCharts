(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ProfileSidePanel = React.createClass({
    render: function(){
      return(
        <div className="profile-side-panel">
          <div onClick={this.props.handleContentChange.bind(null, "SavedCharts")}>
            Your Charts
          </div>
          <div onClick={this.props.handleContentChange.bind(null, "QueryInterface")}>
            Query Interface
          </div>
          <div>Account Info</div>
        </div>
      );
    }
  });
}());
