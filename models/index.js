const Users = require('./Users');
const Kids = require('./Kids');
const Daycares = require('./Daycares');
const Bookings = require('./Bookings');

Users.hasMany(Kids, {
  foreignKey: 'user_id',
  onDelete: 'SET DEFAULT'
});

Kids.belongsTo(Users);

Users.hasMany(Bookings, {
  foreignKey: 'user_id',
  onDelete: 'SET DEFAULT'
});

Bookings.belongsTo(Users);

Daycares.hasMany(Bookings, {
  foreignKey: 'daycare_id',
  onDelete: 'SET DEFAULT'
});

module.exports = { Users, Daycares, Bookings, Kids };