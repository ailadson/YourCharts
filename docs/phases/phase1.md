# Phase 1: Chart Dashboard

## Rails
### Controllers
* StaticPagesController (root)

### Views
* static_pages/root.html.erb

## Flux
### Views (React Components)
* App
  * Header
  * Chart Dashboard
    * Data Manager
      * Data Source Selector
      * Chart Metrics
      * Chart Types Selector
      * Chart Buttons
    * Chart Viewer

### Stores
* Chart Type
* Chart Metrics
* Data Source

### Actions
* ChartMetricsActions.reset
* ChartMetricsActions.addMetric({ key: val })
* ChartTypeActions.changeType(CHART_TYPE)
* DataSource.setSelectedSource("name")
* DataSource.add({ name: "name" data: data})

## Gems/Libraries
* Flux Dispatcher
* D3
