# Phase 2: User Authentication and Basic Profile Page (2 days)

## Rails
### Models
* User
* DataSource
* ChartMetric

### Controllers
* SessionController (new, create, destroy)
* UsersController (new, create)
* Api::DataSourcesController (create, destroy)
* Api::ChartMetricsController (create, destroy)

### Views
* session/new.html.erb
* sessions/create.html.erb
* user/new.html.erb

## Flux
### Views (React Components)
* App
  * Chart Dashboard
    * Data Manager
      * Chart Buttons
  * Profile
    * Profile Side Bar
    * Yours Charts
    * Account Info

### Stores
User Charts

### Actions
* UserChartsActions.fetch
* UserChartsActions.remove(id)
* UserChartsActions.saveChart(data)
* DataSource.create({ name: data: data })
* DataSource.delete(id)

### ApiUtil
* ApiUtil.fetchCharts
* ApiUtil.createDataSource(data)
* ApiUtil.saveChart(data)
* ApiUtil.destroyDataSource(id)
* ApiUtil.destroyChart(id)


## Gems/Libraries
* BCrypt
