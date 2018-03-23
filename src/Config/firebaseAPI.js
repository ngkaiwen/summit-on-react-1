import firebase from "firebase";

var config = {
    apiKey: "REPLACE WITH RELEVANT FIREBASE CONFIG",
    authDomain: "REPLACE WITH RELEVANT FIREBASE CONFIG",,
    databaseURL: "REPLACE WITH RELEVANT FIREBASE CONFIG",,
    projectId: "REPLACE WITH RELEVANT FIREBASE CONFIG",,
    storageBucket: "REPLACE WITH RELEVANT FIREBASE CONFIG",,
    messagingSenderId: "REPLACE WITH RELEVANT FIREBASE CONFIG",
  };

export var firebaseHandle = firebase.initializeApp(config);