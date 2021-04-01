'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tanggapan', {
      id_tanggapan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_pengaduan: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "pengaduan",
          key: "id_pengaduan"
        }
      },
      tgl_pengaduan: {
        type: Sequelize.DATE
      },
      tanggapan: {
        type: Sequelize.STRING
      },
      id_petugas: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "petugas",
          key: "id_petugas"
        }
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tanggapan');
  }
};