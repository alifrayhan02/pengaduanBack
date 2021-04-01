'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pengaduan', {
      id_pengaduan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tgl_pengaduan: {
        type: Sequelize.DATE
      },
      nik: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "masyarakat",
          key: "nik"
        }
      },
      isi_laporan: {
        type: Sequelize.STRING
      },
      foto: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values: ['0','proses','selesai']
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
    await queryInterface.dropTable('pengaduan');
  }
};