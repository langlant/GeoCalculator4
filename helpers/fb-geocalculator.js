import * as firebase from 'firebase';
import 'firebase/database';
import { firebaseConfig } from './fb-credentials';

export function initGeoCalcDB()
{
  firebase.initializeApp(firebaseConfig);
}

export function storeData(item) {
  firebase.database().ref('geocalcData/').push(item);
}

export function updateData(item) {
  const key = item.id;
  delete item.id;
  firebase.database().ref(`geocalcData/${key}`).set(item);
}

export function deleteData(item) {
  firebase.database().ref(`geocalcDAta/${item.id}`).remove();
}

export function setupReminderListener(updateFunc) {
  console.log('setupReminderListener called');
  firebase
    .database()
    .ref('geocalcData/')
    .on('value', (snapshot) => {
      console.log('setupReminderListener fires up with: ', snapshot);
      if (snapshot?.val()) {
        const fbObject = snapshot.val();
        const newArr = [];
        Object.keys(fbObject).map((key, index) => {
          console.log(key, '||', index, '||', fbObject[key]);
          newArr.push({ ...fbObject[key], id: key });
        });
        updateFunc(newArr);
      } else {
        updateFunc([]);
      }
    });
} 