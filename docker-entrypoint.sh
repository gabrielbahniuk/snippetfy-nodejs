#!/bin/sh

npm install && npm update && npx sequelize db:migrate && npm start