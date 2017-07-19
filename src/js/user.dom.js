import * as firebase from 'firebase';
import * as firebaseConfig from './firebase.config';
import * as commonDom from './common.dom';

var commomElements = commonDom.elements;

commomElements.modalAccClose.addEventListener('click', function() {
  commomElements.userModal.style.display = 'none';
  commomElements.deleteAccConfirm.style.display = 'none';
});

window.addEventListener('click', function(e) {
  if (e.target == commomElements.userModal) {
    commomElements.userModal.style.display = 'none';
    commomElements.deleteAccConfirm.style.display = 'none';
  }
});

commomElements.titleTop.addEventListener('click', function(e) {
  if (window.scrollY !== 0) {
    commonDom.scrollToTop();
  }
});

commomElements.userPhotoTop.addEventListener('click', function(e) {
  commomElements.userModal.style.display = 'block';
});

commomElements.signOut.addEventListener('click', function() {
  firebase.auth().signOut();
  commomElements.userModal.style.display = 'none';
  commomElements.deleteAccConfirm.style.display = 'none';
  commomElements.emptyContainerMain.style.display = 'none';
});

commomElements.deleteAccount.addEventListener('click', function() {
  commomElements.deleteAccConfirm.style.display = 'block';
});

commomElements.deleteAccConfirm.addEventListener('click', function() {
  firebase
    .database()
    .ref('users/' + firebase.auth().currentUser.uid)
    .remove()
    .then(
      function() {
        commomElements.userModal.style.display = 'none';
        firebase.auth().currentUser.delete().then(
          function() {
            commomElements.deleteAccConfirm.style.display = 'none';
          },
          function(err) {
            if (err.code == 'auth/requires-recent-login') {
              firebase.auth().signOut().then(function() {
                alert('Please sign in to delete your account');
              });
            }
          }
        );
      },
      function(err) {
        console.error(err.message);
      }
    );
});

function handleNoUser() {
  commomElements.cardTop.style.display = 'none';
  commomElements.cardContainerMain.style.display = 'none';
  commomElements.splashContainer.style.display = 'block';
  firebaseConfig
    .ui()
    .start('#firebaseui-auth-container', firebaseConfig.uiConfig);
}

function handleUser(user) {
  commomElements.cardTop.style.display = 'block';
  commomElements.cardContainerMain.style.display = 'block';
  commomElements.splashContainer.style.display = 'none';

  commomElements.userName.textContent = user.displayName;
  commomElements.userEmail.textContent = user.email;
  if (user.photoURL) {
    commomElements.userPhoto.src = user.photoURL;
    commomElements.userPhoto.style.display = 'block';
    commomElements.userPhotoTop.src = user.photoURL;
    commomElements.userPhotoTop.style.display = 'inline';
  } else {
    commomElements.userPhoto.style.display = 'none';
    commomElements.userPhotoTop.style.display = 'none';
  }
}

export { handleNoUser, handleUser };
