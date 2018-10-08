import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyDrRGe2Wr3FT-dRGCPFkbqNL3fg9xck020",
  authDomain: "react-dev-ead30.firebaseapp.com",
  databaseURL: "https://react-dev-ead30.firebaseio.com",
  projectId: "react-dev-ead30",
  storageBucket: "react-dev-ead30.appspot.com",
  messagingSenderId: "563866334755",
  hello:console.log('Hello')
};
firebase.initializeApp(config);

export default firebase;