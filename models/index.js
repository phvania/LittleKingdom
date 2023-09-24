const Users = require('./Users');
const Kids = require('./Kids');
const Daycares = require('./Daycares');
const Bookings = require('./Bookings');

Users.hasMany(Kids, {
  foreignKey: 'user_id',
  onDelete:'CASCADE'
});
Kids.belongsTo(Users);

Users.hasMany(Bookings, {
  foreignKey: 'user_id',
  onDelete:'CASCADE'
});
Bookings.belongsTo(Users);

Kids.hasMany(Bookings, {
  foreignKey: 'kid_id',
  onDelete: 'CASCADE'
})
Bookings.belongsTo(Kids);

Daycares.hasMany(Bookings, {
  foreignKey: 'daycare_id',
  onDelete: 'SET DEFAULT'
});

Bookings.belongsTo(Daycares);

module.exports = { Users, Daycares, Bookings, Kids };