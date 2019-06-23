# Snippetfy with NodeJS / Express / Nunjucks / Sequelize

### Demo

- Try it out the [DEMO](https://snippetfy-app.herokuapp.com/)

![](http://g.recordit.co/ivo1SciqTr.gif)

### Installation

- Create an `.env` file in the root folder and put the string below within the file:

`DATABASE_URL=postgres://postgres:12345@127.0.0.1:5432/postgres`\
`SENDGRID_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`\
`NODE_ENV=development`

* Please note to create (if not already) the variable NODE_ENV=production before deployment.
* Don't forget to adjust the parameters to match your Postgres database.
* Make sure that your Postgres user has permission to create event triggers!

- Run `sequelize run db:migration`.

- Dev: `npm install && npm dev` or `yarn && yarn dev`.
- Prod: `npm install && npm start` or `yarn && yarn start`.
