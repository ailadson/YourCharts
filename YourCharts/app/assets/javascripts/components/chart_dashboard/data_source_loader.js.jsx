/* global React */
/* global DataSourceStore */
/* global DataSourceActions */

(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.DataSourceLoader = React.createClass({
    getInitialState: function(){
      return {
        uploadingFile: false,
        fileData: null,
        selected: DataSourceStore.selectedName()
      };
    },

    componentDidMount: function(){
      DataSourceStore.addChangeHandler(this._updateSelected);
    },

    componentWillUnmount: function(){
      DataSourceStore.removeChangeHandler(this._updateSelected);
    },

    _updateSelected: function(){
      this.setState({ selected : DataSourceStore.selectedName() });
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
          this.setState({ uploadingFile: false });
          break;
      }
    },

    handleUpload: function(e){
      var reader = new FileReader();
      var file = e.target.files[0];
      var name = file.name.split('.')[0].toLowerCase();
      var extension = file.name.split('.').pop().toLowerCase();

      reader.onload = function(f){
        var dataObject;

        switch(extension){
          case "csv":
            dataObject = d3.csv.parse(f.target.result);
            break;
          case "json":
            dataObject = JSON.parse(f.target.result);
            break;
          case "tsv":
            dataObject = d3.tsv.parse(f.target.result);
            break;
        }

        if(dataObject){
          DataSourceActions.add({ name: name, data: dataObject }); //CHANGE TO CREATE
        }

        this.setState({ uploadingFile: false });
      }.bind(this);

      reader.readAsText(file);
    },

    render: function(){
      var dataOptions = [<option value=""></option>];

      DataSourceStore.allNames().map(function(name){
        dataOptions.push(
          <option value={name}>{name.toUpperCase()}</option>
        );
      });

      //add new data-source option
      dataOptions.push(
        <option value="newData">Upload New Data Source</option>
      );

      return(
        <div className="data-uploader">
          <select onChange={this.handleChange}>{dataOptions}</select>
          {
            this.state.uploadingFile ?
              <input type="file" onChange={this.handleUpload}/> : ""
          }
        </div>
      );
    }
  });

}());
