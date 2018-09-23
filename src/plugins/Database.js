import 'babel-polyfill';
import * as RxDB from 'rxdb';
RxDB.plugin(require('pouchdb-adapter-idb'));
RxDB.plugin(require('pouchdb-adapter-http')); //enable syncing over http

const collections = [{
    name: 'heroes',
    schema: require('./HeroSchema.js').default,
    methods: {
      hpPercent() {
        return this.hp / this.maxHP * 100;
      }
    },
    sync: true
  },
  {
    name: "spreadsheet",
    schema: require("./SpreadsheetSchema.js").default,
    methods: {},
    sync: true
  },
  {
    name: "devices",
    schema: require("./DeviceSchema").default,
    methods: {},
    sync: true
  },
  {
    name: "device_updates",
    schema: require("./DeviceUpdateSchema").default,
    methods: {},
    sync: true
  }
];

const syncURL = 'http://74.192.108.210:5984/';
console.log('host: ' + syncURL);
// const syncURL = host;


/* because vue-dev-server only reloads the changed code and not the whole page,
 * we have to ensure that the same database only exists once
 * we can either set ignoreDuplicate to true
 * or remove the previous instance which we do here
 */
window.dbs = window.dbs || [];
const clearPrev = async function () {
  await Promise.all(
    window.dbs
    .map(db => db.destroy())
  );
};

let dbPromise = null;

export function get() {
  if (!dbPromise)
    dbPromise = _create();
  return dbPromise;
}

const _create = async function () {
  console.log('DatabaseService: creating database..');
  await clearPrev();
  const db = await RxDB.create({
    name: 'heroesreactdb',
    adapter: 'idb',
    queryChangeDetection: true,
    password: 'myLongAndStupidPassword'
  });
  window.dbs.push(db);
  console.log('DatabaseService: created database');
  window['db'] = db; // write to window for debugging

  // show leadership in title
  db.waitForLeadership().then(() => {
    console.log('isLeader now');
    document.title = '♛ ' + document.title;
  });

  // create collections
  console.log('DatabaseService: create collections');
  await Promise.all(collections.map(colData => db.collection(colData)));

  // hooks
  console.log('DatabaseService: add hooks');
  db.collections.heroes.preInsert(function (docObj) {
    const color = docObj.color;
    return db.collections.heroes.findOne({
      color
    }).exec().then(has => {
      if (has !== null) {
        alert('another hero already has the color ' + color);
        throw new Error('color already there');
      }
      return db;
    });
  });
  db.collections.devices.preInsert(function (docObj) {
    const deviceId = docObj.deviceId;
    return db.collections.devices.findOne({
      deviceId
    }).exec().then(has => {
      if (has !== null) {
        alert('another device already has the deviceId ' + deviceId);
        throw new Error('deviceId already there');
      }
      return db;
    });
  });
  //TODO put preinsert code here
  // db.collections.device_updates.preInsert(function (docObj) {
  //   const deviceId = docObj.deviceId;
  //   return db.collections.device_updates.findOne({
  //     deviceId
  //   }).exec().then(has => {
  //     if (has !== null) {
  //       alert('another device_updates already has the deviceId ' + deviceId);
  //       throw new Error('deviceId already there');
  //     }
  //     return db;
  //   });
  // });

  // sync
  console.log('DatabaseService: sync');
  db.heroes.sync({
    remote: syncURL + 'heroes/'
  });
  db.devices.sync({
    remote: syncURL + 'devices/'
  });
  db.device_updates.sync({
    remote: syncURL + 'device_updates/'
  });
  return db;
};


// const _createDevices = async function () {
//   console.log('DatabaseService: creating devices database..');
//   await clearPrev();
//   const db = await RxDB.create({
//     name: 'devicesdb',
//     adapter: 'idb',
//     queryChangeDetection: true,
//     password: 'myLongAndStupidPassword'
//   });
//   window.dbs.push(db);
//   console.log('DatabaseService: created database');
//   window['db'] = db; // write to window for debugging

//   // show leadership in title
//   db.waitForLeadership().then(() => {
//     console.log('isLeader now');
//     document.title = '♛ ' + document.title;
//   });

//   // create collections
//   console.log('DatabaseService: create collections');
//   await Promise.all(collections.map(colData => db.collection(colData)));

//   // hooks
//   console.log('DatabaseService: add hooks');
//   db.collections.devices.preInsert(function (docObj) {
//     const color = docObj.color;
//     return db.collections.devices.findOne({
//       color
//     }).exec().then(has => {
//       if (has !== null) {
//         alert('another hero already has the color ' + color);
//         throw new Error('color already there');
//       }
//       return db;
//     });
//   });

//   // sync
//   console.log('DatabaseService: sync');
//   db.devices.sync({
//     remote: syncURL + 'devices/'
//   });

//   return db;
// };