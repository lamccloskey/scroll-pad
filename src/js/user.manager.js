import * as firebase from 'firebase';
import * as userDom from './user.dom';
import * as commonDom from './common.dom';

firebase.auth().onAuthStateChanged(
  function(user) {
    user ? userDom.handleUser(user) : userDom.handleNoUser();
    document.body.style.display = '';
    commonDom.scrollToTop();
  },
  function(err) {
    console.error(err);
  }
);
