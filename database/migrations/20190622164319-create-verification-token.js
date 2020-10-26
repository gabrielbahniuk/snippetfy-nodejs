module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('VerificationToken', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        UserId: {
          type: Sequelize.INTEGER,
          onUpdate: 'cascade',
          onDelete: 'cascade',
          references: { model: 'User', key: 'id' }
        },
        token: {
          allowNull: false,
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })
    ]).then(() => {
      return queryInterface.sequelize.query(`
        CREATE OR REPLACE FUNCTION delete_old_tokens()
        RETURNS event_trigger
        LANGUAGE plpgsql
        AS $$
        BEGIN
          DELETE FROM "VerificationToken" WHERE "createdAt" >= NOW() - INTERVAL '24 HOURS';
        END;
        $$;
      CREATE EVENT TRIGGER expireToken ON ddl_command_start
      EXECUTE PROCEDURE delete_old_tokens();
      `);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface
      .dropTable('VerificationToken')
      .then(() => {
        return queryInterface.sequelize.query(
          `DROP EVENT TRIGGER IF EXISTS expireToken;
           DROP FUNCTION IF EXISTS "delete_old_tokens";
          `
        );
      })
      .then(() => {
        console.log('expireToken event dropped');
      });
  }
};
