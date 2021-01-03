const bcrypt = require('bcrypt');
const db = require('./models');

const Role = db.role;
const MainArea = db.mainArea;
const SubArea = db.subArea;
const InjuryType = db.injuryType;
const InjurySpot = db.injurySpot;
const User = db.user;
function initial() {
  Role.bulkCreate([{ name: 'user' }, { name: 'moderator' }, { name: 'admin' }]);

  const hash = bcrypt.hashSync('12345', 8);
  User.create({
    id: '00000-00000-00000-00000-00000-000-00',
    email: 'ad@min.de',
    firstName: 'System',
    lastName: 'Admin',
    password: hash,
  }).then((user) => {
    user.setUseRoles([1, 2, 3]).then(() => {
      console.log('user');
    });
  });

  InjuryType.bulkCreate([
    { typeText: 'Bruch' },
    { typeText: 'Quetschung' },
    { typeText: 'Schnittwunde' },
    { typeText: 'Prellung' },
    { typeText: 'Verbrennung' },
    { typeText: 'Augenverletzung/ Fremdkörper' },
  ]);

  InjurySpot.bulkCreate([
    { spotText: 'Kopf' },
    { spotText: 'Augen' },
    { spotText: 'Hals' },
    { spotText: 'Ohr' },
    { spotText: 'Innere Organe' },
    { spotText: 'Rumpf' },
    { spotText: 'Schulter' },
    { spotText: 'Arm' },
    { spotText: 'Hand' },
    { spotText: 'Finger' },
    { spotText: 'Bein' },
    { spotText: 'Fuß' },
    { spotText: 'Zeh' },
  ]);

  MainArea.create({
    mainAreaText: 'Aktive Systeme',
  }).then((dbe) => {
    SubArea.bulkCreate([
      { subAreaText: 'AS - Vorfertigung', masMainAreaId: dbe.id },
      { subAreaText: 'AS - Lackieranlage', masMainAreaId: dbe.id },
      { subAreaText: 'AS - Endmontage', masMainAreaId: dbe.id },
    ]);
  });

  MainArea.create({
    mainAreaText: 'Passive Systeme',
  }).then((dbe) => {
    SubArea.bulkCreate([
      { subAreaText: 'PS - 1 Rohr', masMainAreaId: dbe.id },
      { subAreaText: 'PS - 2 Rohr', masMainAreaId: dbe.id },
      { subAreaText: 'PS - Kell', masMainAreaId: dbe.id },
    ]);
  });

  MainArea.create({
    mainAreaText: 'Komponente',
  }).then((dbe) => {
    SubArea.bulkCreate([
      { subAreaText: 'KO - Rohrfertigung', masMainAreaId: dbe.id },
      { subAreaText: 'KO - Laserschweißen', masMainAreaId: dbe.id },
      { subAreaText: 'KO - Verschlusspakete', masMainAreaId: dbe.id },
    ]);
  });

  MainArea.create({
    mainAreaText: 'Servicebereiche',
  }).then((dbe) => {
    SubArea.bulkCreate([
      { subAreaText: 'SB - MPP', masMainAreaId: dbe.id },
      { subAreaText: 'SB - Prototypenbau', masMainAreaId: dbe.id },
      { subAreaText: 'SB - Verwaltung', masMainAreaId: dbe.id },
      { subAreaText: 'SB - Ausbildung', masMainAreaId: dbe.id },
      { subAreaText: 'SB - Qualitätsmanagement', masMainAreaId: dbe.id },
      { subAreaText: 'SB - Logistik', masMainAreaId: dbe.id },
      { subAreaText: 'SB - Instandhaltung', masMainAreaId: dbe.id },
      { subAreaText: 'SB - Sondermaschinenbau', masMainAreaId: dbe.id },
      { subAreaText: 'SB - OPX', masMainAreaId: dbe.id },
      { subAreaText: 'SB - Facility Management', masMainAreaId: dbe.id },
    ]);
  });
}

const initDatabase = () => {
  db.sequelize
    .sync({ force: true })
    .then(() => {
      console.log('Drop and Resync Db');
      initial();
    })
    .catch((err) => console.log(err));
};

module.exports = {
  initDatabase,
};
