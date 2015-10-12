# YourCharts

[Heroku link][heroku] **NB:** This should be a link to your production site

[heroku]: http://www.herokuapp.com

## Minimum Viable Product

YourCharts is a web application inspired by Chartio built using Ruby on Rails
and React.js. YourCharts allows users to:


- [ ] Create an account
- [ ] Log in / Log out
- [ ] Upload data and visualize it with a variety of charts
- [ ] Supports JSON, TSV, and CSV formats
- [ ] Logged in users can persist their data
- [ ] Share charts with other users
- [ ] Premium users can create relational databases from their data sources
- [ ] Premium users have a simple interface to build custom charts from relational queries

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: Chart Dashboard (3 days)

In Phase 1, I will begin my implementing the landing page and the chart dashboard.
This is the site's primary feature, usable by both logged in users and guest users,
so it makes sense to get this working as soon as possible. I will also set up the
Flux/React architecture.

[Details][phase-one]

### Phase 2: User Authentication and Basic Profile Page (1.5 days)

In Phase 2, I will begin by implementing user signup and authentication (using
BCrypt). Logging in will allow users to save their data sources and charts.
I will create a basic profile page that allows users to see all of their charts and
data sources. To make this happen, I will create web apis for those resources.

[Details][phase-two]

### Phase 3: Chart Sharing (1 day)

In Phase 3, I will implement a chart sharing feature what will allow logged in users
to share their chart with any other user. I will have to create a Share resource
that will be incorporated into the site architecture.

[Details][phase-three]

### Phase 4: Query Dashboard (3.5 days)

Phase 4 will focus on creating a querying feature for premium users. To do this,
I have to create relational database tables from the specified data sources and
implement a querying interface. Users will be able to specify SELECT, WHERE, and
JOIN statements to create new custom data sources from which they can create charts.

[Details][phase-four]


### Bonus Features (TBD)


[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
