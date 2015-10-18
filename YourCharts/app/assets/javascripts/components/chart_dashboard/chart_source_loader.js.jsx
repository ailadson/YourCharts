/* global React */
/* global DataSourceStore */
/* global DataSourceActions */


(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.ChatSourceLoader = React.createClass({
    getInitialState: function(){
      return {};
    },

    componentDidMount: function(){
      DataSourceStore.addChangeHandler(this._updateSelected);
    },

    componentWillUnmount: function(){
      DataSourceStore.removeChangeHandler(this._updateSelected);
    },

    _updateSelected: function(){
      this.setState({ selected : ChartMetricsStore.selectedName() });
    },

    handleChange: function(e){
      switch(e.target.value){
        case "":
          this.setState({ uploadingFile: false });
          break;
        case "newData":
          this.setState({ uploadingFile: true });
          break;
        default:
          DataSourceActions.setSelected(e.target.value);
          this.setState({ uploadingFile: false });
          break;
      }

    },

    handleUpload: function(e){
      e.preventDefault();

      cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, result) {
        result = result[0];
        DataSourceActions.create({
          name: result.original_filename,
          url: result.secure_url
        });

      });

      this.setState({ uploadingFile: false });
    },

    render: function(){
      var dataOptions = [<option value="" key={-2}></option>];

      DataSourceStore.allNames().map(function(name, i){
        dataOptions.push(
          <option value={name} key={i} >{name.toUpperCase()}</option>
        );
      });

      //add new data-source option
      dataOptions.push(
        <option value="newData" key={-1}>Upload New Data Source</option>
      );

      return(
        <div className="data-uploader data-manager-panel">
          <header>Data Source</header>
          {
            this.state.selected ? <div></div> : <div></div>
          }
          <select onChange={this.handleChange} value={this.state.selected}>{dataOptions}</select>
          {
            this.state.uploadingFile ?
              <input type="file" onClick={this.handleUpload}/> : ""
          }
        </div>
      );
    }
  });

}());
