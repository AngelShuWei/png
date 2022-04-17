npx sequelize model:generate --name Pal --attributes userId:integer,nickname:string,title:string,description:text,game:string,server:string,rank:string,position:string,role:string,style:string,orderStart:date,orderEnd:date,price:decimal,guests:integer,address:string,city:string,state:string,country:string

npx sequelize model:generate --name Review --attributes userId:integer,palId:integer,content:text,rating:integer

npx sequelize model:generate --name Order --attributes userId:integer,padId:integer,totalCost:decimal,start:date,end:date

npx sequelize model:generate --name Image --attributes palId:integer,url:string

npx sequelize model:generate --name Game --attributes gameName:string,platform:string,server:string,rank:string,position:string,style:string

npx sequelize model:generate --name Game --attributes palId:integer,gameName:string,gamePic:string

npx sequelize seed:generate --name pals-seeds


gameStat model

'use strict';
module.exports = (sequelize, DataTypes) => {
  const GameStat = sequelize.define('GameStat', {
    palId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    server: DataTypes.STRING(30),
    rank: DataTypes.STRING(30),
    position: DataTypes.STRING(30),
    style: DataTypes.STRING(30),
    gameStatsPic: DataTypes.STRING,
  }, {});
  GameStat.associate = function(models) {
    // associations can be defined here
    GameStat.belongsTo(models.Pal, { foreignKey: 'palId' });
    GameStat.belongsTo(models.Game, { foreignKey: 'gameId' });
  };
  return GameStat;
};


gameStat migration

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('GameStats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      palId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      gameId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      server: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      rank: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      position: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      style: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      gameStatsPic: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('GameStats');
  }
};

gameStat seeder

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GameStats', [
      {
        palId: 1,
        gameId: 1,
        server: "NA",
        rank: "Diamond",
        position: "ADC",
        style: "Try Hard",
        gameStatsPic: "https://global-oss.epal.gg/image/ablum/16243402695185694.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        palId: 2,
        gameId: 2,
        server: "NA",
        rank: "Master",
        position: "Assault",
        style: "Flanker",
        gameStatsPic: "https://global-oss.epal.gg/image/ablum/16434205654971271.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GameStats', null, {});
  }
};
