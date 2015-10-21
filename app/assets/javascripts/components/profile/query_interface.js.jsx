(function() {
  'use strict';

  window.Components = window.Components || {};
  window.Components.ProfileContent = window.Components.ProfileContent || {};

  window.Components.ProfileContent.QueryInterface = React.createClass({
    mixins: [ReactRouter.History],

    getInitialState: function(){
      return { confirming: false, source: null, processing: false };
    },

    componentDidMount: function(){
      DataSourceStore.addProcessedHandler(this.reset);
    },

    componentWillUnmount: function(){
      DataSourceStore.removeProcessedHandler(this.reset);
    },

    reset: function(){
      this.setState({ confirming: false, source: null, processing: false });
    },

    confirmDataTypes: function(source){
      this.setState({
        confirming: true,
        source: source
      });
    },

    goToQueryDashboard: function(source){
      this.history.pushState(null, '/query', {
        source: source.id,
      });
    },

    process: function(e){
      e.preventDefault();
      var schema = {};
      var currentInput;

      for(var i = 0; e.currentTarget[i]; i+=1){
        currentInput = e.currentTarget[i];
        if(currentInput.name !== ""){
          schema[currentInput.name] = currentInput.value;
        }
      }

      DataTableActions.process({
        data_id: this.state.source.id,
        schema: schema,
        data: this.state.source.data
      });

      this.setState({ processing: true });
    },

    unprocessedDataSources: function(){
      var unprocessed = DataSourceStore.unprocessedDataSources();
      return(
        <ul>
          {
            unprocessed.map(function(source, i){
              return <li key={i} onClick={this.confirmDataTypes.bind(null, source)}>{source.name}</li>;
            }.bind(this))
          }
        </ul>
      );
    },

    processedDataSources: function(){
      var unprocessed = DataSourceStore.processedDataSources();
      return(
        <ul>
          {
            unprocessed.map(function(source, i){
              return(
                <li key={i} onClick={this.goToQueryDashboard.bind(null, source)}>
                  {source.name}
                </li>
              );
            }.bind(this))
          }
        </ul>
      );
    },

    processingList: function(){
      return(
        <div className="query-processes group">
          <div className="not-processed">
            <h2>Unprocessed Data Sources</h2>
            {this.unprocessedDataSources()}
          </div>
          <div className="processed">
            <h2>Processed Data Sources</h2>
            {this.processedDataSources()}
          </div>
        </div>
      );
    },

    confirmationList: function(){
      var sample = this.state.source.data[0];

      return(
        <form onSubmit={this.process}>
          <table className="query-confirmation-list">
            <tr key={-1}>
              <th>Column Name</th>
              <th>Data Type</th>
            </tr>
            {
              Object.keys(sample).map(function(key, i){
                return(
                  <tr key={i}>
                    <td>{key}</td>
                    <td>
                      <select name={key} defaultValue={this.guessType(sample[key])}>
                        <option value={"integer"}>INT</option>
                        <option value={"float"}>FLOAT</option>
                        <option value={"string"}>STRING</option>
                      </select>
                    </td>
                  </tr>
                );
              }.bind(this))
            }
          </table>
          <input className="query-process-submit" type="submit" value="PROCESS"/>
        </form>
      );
    },

    guessType: function(type){
      var intType = parseInt(type);
      if(intType !== intType){
        return "string";
      } else if(intType !== type){
        return "float";
      } else {
        return "integer";
      }
    },

    render: function(){
      return(
        <div className="query-interface">
          <div className="query-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </div>
          {
            this.state.confirming ?
              this.confirmationList()
            :
              this.processingList()
          }
        </div>
      );
    }
  });
}());
