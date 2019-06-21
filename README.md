# Snippetfy with NodeJS / Express / Nunjucks / Sequelize

### Installation

- Create an `.env` file in the root folder and put the string below within the file:

`DATABASE_URL=postgres://postgres:12345@127.0.0.1:5432/postgres`

!! Don't forget to adjust the parameters to match your Postgres database

- Install `sequelize-cli` and run ``sequelize run db:migration`.

- Dev: `npm install && npm dev` or `yarn && yarn dev`.
- Prod: `npm install && npm start` or `yarn && yarn start`.

- Use `localhost:3000/` in your browser or define the port with the variable `PORT=1234` in the `.env` file.
