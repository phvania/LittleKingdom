const sequelize = require('../config/connection');
const { Users, Daycares,Bookings, Kids } = require('../models');
const {Daycares} = require('../models')
const {Bookings} = require('../models')
const {Kids} = require('../models')

const UsersData = require('./userData.json');
const DaycaresData = require('./daycareData.json');
const BookingsData = require('./bookingData.json');
const kidsData = require('./kidsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
}
await Users.bulkCreate(UsersData, {
   individualHooks: true,
    returning: true,
  });
    for (const Users of UsersData) {
      await Users.create({
        ...Users,
        user_id: Users[Math.floor(Math.random() * Users.length)].id,
      });
   }

   for (const Kids of kidsData) {
    await Kids.create({
      ...Kids,
      user_id: Users[Math.floor(Math.random() * Users.length)].id,
    });
  }
  for (const Bookings of BookingsData) {
    await Bookings.create({
      ...Bookings,
      user_id: Users[Math.floor(Math.random() * Users.length)].id,
    });
  }
    for (const Daycares of DaycaresData) {
      await Daycares.create({
        ...Daycares,
        //user_id: Users[Math.floor(Math.random() * Users.length)].id,
      });
  
  }

  process.exit(0);

 
  
seedDatabase();
