const sequelize = require('../config/connection');
const { User,Daycares,Bookings, Kids } = require('../models');

const userData = require('./userData.json');
const DaycaresData = require('./daycareData.json');
const BookingsData = require('./bookingData.json');
const kidsData = require('./kidsData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, { 
    individualHooks: true,
    returning: true,
  });

for (const Bookings of BookingsData) {
    await Bookings.create({
      ...Bookings,
      user_id: User[Math.floor(Math.random() * User.length)].id,
    });
  }


  for (const Daycares of DaycaresData) {
    await Daycares.create({
      ...Daycares,
      user_id: User[Math.floor(Math.random() * User.length)].id,
    });
  }


  for (const Kids of kidsData) {
    await Kids.create({
      ...Kids,
      user_id: User[Math.floor(Math.random() * User.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
