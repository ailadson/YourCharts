/* global React */
/* global DataSourceStore */
/* global DataSourceActions */
/* global cloudinary */
/* global CLOUDINARY_OPTIONS */


(function() {
  'use strict';

  window.Components = window.Components || {};

  window.Components.DataSourceLoader = React.createClass({
    getInitialState: function(){
      return {
        uploadingFile: false,
        fileData: null,
        selected: DataSourceStore.selectedName(),
        dataSourceName: DataSourceStore.selectedName()
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
          DataSourceActions.setSelected(e.target.value);
          this.setState({ uploadingFile: false });
          break;
      }

    },

    changeDataSourceName: function(e){
      this.setState({ dataSourceName: e.target.value });
    },

    saveDataSourceName: function(e){
      DataSourceActions.updateName({
        id: DataSourceStore.selectedId(),
        name: this.state.dataSourceName
      });
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
          <select onChange={this.handleChange} value={this.state.selected}>{dataOptions}</select>
          <br/>
          {
            this.state.selected ?
              <label>
                Data Source Name:
                <input type="text" value={this.state.dataSourceName} onChange={this.changeDataSourceName}/>
                <button onClick={this.saveDataSourceName}>Save Name</button>
              </label>
            :
              <div></div>
          }
          {
            this.state.uploadingFile ?
              <input type="file" onClick={this.handleUpload}/> : ""
          }
        </div>
      );
    }
  });

}());
