import * as firebase from 'firebase';
import * as notesDom from './notes.dom';
import * as commonDom from './common.dom';
import * as search from './search';
import * as cryptography from './cryptography';
import prioritize from './prioritize';

var commomElements = commonDom.elements;
var database = firebase.database();
var notesRef;

firebase.auth().onAuthStateChanged(
  function(user) {
    if (user) {
      commomElements.loadingIcon.style.display = 'block';
      notesRef = database.ref('users/' + user.uid + '/notes');
      getNotes(function(data) {
        if (data === null) {
          commomElements.loadingIcon.style.display = 'none';
          commomElements.emptyContainerMain.style.display = 'block';
        } else {
          var notes = [];
          Object.keys(data).forEach(function(key, index) {
            var note = cryptography.decrypt(data[key], key);
            note.key = key;
            notes.push(note);
          });

          prioritize(notes, function(sortedNotes) {
            sortedNotes.forEach(function(note) {
              notesDom.render(note.key, note);
            });
            commomElements.loadingIcon.style.display = 'none';
            commomElements.emptyContainerMain.style.display = 'none';
          });
        }
      });

    } else {
      notesRef;
    }
  },
  function(err) {
    console.log(err);
  }
);

function getNoteKey() {
  return notesRef.push().key;
}

function getNotes(callback) {
  if (notesRef) {
    notesRef.once('value', function(snapshot) {
      callback(snapshot.val());
    });
  } else {
    console.info('no note ref');
  }
}

function setNote(key, note) {
  if (notesRef) {
    notesRef
      .child(key)
      .set(cryptography.encrypt(note, key))
      .catch(function(err) {
        console.error(err.message);
      });
  } else {
    console.info('no note ref');
  }
}

function removeNote(key, callback) {
  if (notesRef) {
    notesRef.child(key).remove().then(
      function() {
        callback();
      },
      function(err) {
        console.error(err.message);
      }
    );
  } else {
    console.info('no note ref');
  }
}

export { getNoteKey, getNotes, setNote, removeNote };
