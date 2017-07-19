import * as firebase from 'firebase';
import * as firebaseui from 'firebaseui';

// Firebase
firebase.initializeApp({
  apiKey: 'AIzaSyBOrO9BppHFJDT3F5P8jm4dutZ0-K4kyw8',
  authDomain: 'scroll-pad.firebaseapp.com',
  databaseURL: 'https://scroll-pad.firebaseio.com',
  projectId: 'scroll-pad'
});

// FirebaseUI config
var uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.FacebookAuthProvider.PROVIDER_ID],
  signInFlow: 'redirect',
  // Terms of service url.
  tosUrl: '<your-tos-url>'
};

// FirebaseUI
function ui() {
  return new firebaseui.auth.AuthUI(firebase.auth());
}

export { uiConfig, ui };
