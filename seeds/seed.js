const sequelize = require('../config/connection');
const seedUsersData = require('./users-seeds');
const seedKidsData = require('./kids-seeds');
const seedBookingsData = require('./bookings-seeds');
const seedDaycaresData = require('./daycares-seeds');
const {Users, Kids, Bookings, Daycares} = require('../models');

const seedAll = async () => {

  console.log('\n----- DATABASE SYNCED -----\n');
  await sequelize.sync({ force: true });
  
  const users = await Users.bulkCreate(seedUsersData);
  console.log('\n----- USERS SEEDED -----\n');
  
  const kids = await Kids.bulkCreate(seedKidsData);
  console.log('\n----- KIDS SEEDED -----\n');

  const bookings = await Bookings.bulkCreate(seedBookingsData);
  console.log('\n----- BOOKINGS SEEDED -----\n');

  const daycares = await Daycares.bulkCreate(seedDaycaresData);
  console.log('\n----- DAYCARES TAGS SEEDED -----\n');

  process.exit(0);
}

seedAll();