const fs = require('fs');

const file = 'scripts/bridgeNexAndAyame.cjs';
let content = fs.readFileSync(file, 'utf8');

const targetDown = `      } else {
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = originName;
        smTrip.customDestination = '成田空港';
        if (smTrip.stops.length < 6) {
          smTrip.stops = smStops;
        }
      }`;

const replDown = `      } else {
        smTrip.tripId = smTripId;
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = originName;
        smTrip.customDestination = '成田空港';
        smTrip.stops = smStops;
      }`;

const targetUp = `      } else {
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = '成田空港';
        smTrip.customDestination = finalDest;
        if (smTrip.stops.length < 6) {
          smTrip.stops = smStops;
        }
      }`;

const replUp = `      } else {
        smTrip.tripId = smTripId;
        smTrip.trainName = trainName;
        smTrip.trainType = 'limitedExp';
        smTrip.customOrigin = '成田空港';
        smTrip.customDestination = finalDest;
        smTrip.stops = smStops;
      }`;

const isCrlf = content.includes('\r\n');
const norm = (s) => isCrlf ? s.replace(/\n/g, '\r\n') : s;

content = content.replace(norm(targetDown), norm(replDown));
content = content.replace(norm(targetUp), norm(replUp));

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully updated bridgeNexAndAyame.cjs sobu_main trip updates!');
