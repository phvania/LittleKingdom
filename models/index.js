const Users = require('./Users');
const Kids = require('./Kids');
const Daycares = require('./Daycares');
const Bookings = require('./Bookings');

Users.hasMany(Kids, {
    foreignKey: 'user_id',
    onDelete: 'SET DEFAULT'
  });
  
  Kids.belongsTo(Users, {
    foreignKey: 'user_id'
  });
  
  Users.hasMany(Bookings, {
    foreignKey: 'user_id',
   onDelete: 'CASCADE'
 });
  
  Bookings.belongsTo(Users, {
    foreignKey: 'user_id'
  });


module.exports = { Users,Daycares,Bookings,Kids };