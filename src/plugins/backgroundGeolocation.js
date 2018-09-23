import axios from 'axios'
import * as Database from '../plugins/Database';


/* eslint-disable */
function onDeviceReady() {
  console.log('here')
  console.log(BackgroundGeolocation)
  BackgroundGeolocation.configure({
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 15,
    distanceFilter: 5,
    notificationTitle: 'Background tracking',
    notificationText: 'enabled',
    debug: true,
    startOnBoot: true,
    stopOnStillActivity: true,
    interval: 5000,
    fastestInterval: 5000,
    activitiesInterval: 10000,
    stopOnTerminate: false,
    //https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/loc-test
    url: 'https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/loc-test',
    // url: 'http://74.192.108.210:1880/api/loctest',
    syncUrl: 'http://74.192.108.210:1880/api/loctest_fail',
    httpHeaders: {
      'X-FOO': 'bar'
    },
    // customize post properties
    postTemplate: {
      lat: '@latitude',
      lon: '@longitude',
      foo: 'bar' // you can also add your own properties
    }
  });

  BackgroundGeolocation.on('location', function (location) {
    console.log(location)
    // const device_update = Object.assign({}, location);
    // device_update.deviceId = 'testId'
    // console.dir(device_update);
    // async function saveDoc(device_update) {
    //   try {
    //     const db = await Database.get()
    //     var doc = await db.device_updates.insert(device_update);
    //     console.log(doc);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // saveDoc(device_update)
    axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/loc-test', location)
    // handle your locations here
    // to perform long running operation on iOS
    // you need to create background task
    BackgroundGeolocation.startTask(function (taskKey) {
      axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/loc-test', location)

      // execute long running task
      // eg. ajax post location
      // IMPORTANT: task has to be ended by endTask
      BackgroundGeolocation.endTask(taskKey);
    });
  });

  BackgroundGeolocation.on('stationary', function (stationaryLocation) {
    console.log(stationaryLocation)
    const device_update = Object.assign({}, stationaryLocation);
    device_update.deviceId = 'testId'
    console.dir(device_update);
    async function saveDoc(device_update) {
      try {
        const db = await Database.get()
        var doc = await db.device_updates.insert(device_update);
        console.log(doc);
      } catch (err) {
        console.log(err);
      }
    }
    saveDoc(device_update)
  });

  BackgroundGeolocation.on('error', function (error) {
    axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/loc-test', error)

    console.log('[ERROR] BackgroundGeolocation error:', error.code, error.message);
  });

  BackgroundGeolocation.on('start', function () {
    axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/loc-test', start)

    console.log('[INFO] BackgroundGeolocation service has been started');
  });

  BackgroundGeolocation.on('stop', function () {
    console.log('[INFO] BackgroundGeolocation service has been stopped');
  });

  BackgroundGeolocation.on('authorization', function (status) {
    console.log('[INFO] BackgroundGeolocation authorization status: ' + status);
    if (status !== BackgroundGeolocation.AUTHORIZED) {
      // we need to set delay or otherwise alert may not be shown
      setTimeout(function () {
        var showSettings = confirm('App requires location tracking permission. Would you like to open app settings?');
        if (showSetting) {
          return BackgroundGeolocation.showAppSettings();
        }
      }, 1000);
    }
  });

  BackgroundGeolocation.on('background', function () {
    console.log('[INFO] App is in background');
    // you can also reconfigure service (changes will be applied immediately)
    axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/loc-test', {
      "background": "background"
    })

    BackgroundGeolocation.configure({
      debug: true
    });
  });

  BackgroundGeolocation.on('foreground', function () {
    console.log('[INFO] App is in foreground');
    axios.post('https://wt-4b2720bcf712029a2fa08942c7e9bd70-0.sandbox.auth0-extend.com/loc-test', {
      "background": "foreground"
    })

    BackgroundGeolocation.configure({
      debug: false
    });
  });

  BackgroundGeolocation.on('abort_requested', function () {
    console.log('[INFO] Server responded with 285 Updates Not Required');

    // Here we can decide whether we want stop the updates or not.
    // If you've configured the server to return 285, then it means the server does not require further update.
    // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
    // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
  });

  BackgroundGeolocation.checkStatus(function (status) {
    console.log('[INFO] BackgroundGeolocation service is running', status.isRunning);
    console.log('[INFO] BackgroundGeolocation services enabled', status.locationServicesEnabled);
    console.log('[INFO] BackgroundGeolocation auth status: ' + status.authorization);

    // you don't need to check status before start (this is just the example)
    if (!status.isRunning) {
      BackgroundGeolocation.start(); //triggers start on start event
    }
  });

  // you can also just start without checking for status
  // BackgroundGeolocation.start();

  // Don't forget to remove listeners at some point!
  // BackgroundGeolocation.events.forEach(function(event) {
  //   return BackgroundGeolocation.removeAllListeners(event);
  // });
}

document.addEventListener('deviceready', onDeviceReady, false);