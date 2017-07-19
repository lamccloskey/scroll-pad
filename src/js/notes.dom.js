import * as firebase from 'firebase';
import * as notesRepo from './notes.repo';
import * as commonDom from './common.dom';
import * as search from './search';
import Note from './note';

var commomElements = commonDom.elements;

function render(key, note) {
  var card = newCard(key);
  var content = newContent(note ? note.content : '');
  var heading = newHeading(note ? note.heading : '');
  var changeDate = newChangeDate(
    note ? new Date(note.changeDate).toDateString() : ''
  );
  var deleteButton = newDeleteButton();
  var horizontal = document.createElement('hr');

  commomElements.cardContainerMain.insertBefore(
    card,
    commomElements.cardContainerMain.firstChild
  );
  card.insertBefore(content, card.firstChild);
  card.insertBefore(horizontal, card.firstChild);
  card.insertBefore(heading, card.firstChild);
  card.insertBefore(changeDate, card.firstChild);
  card.insertBefore(deleteButton, card.firstChild);
}

function newCard(key) {
  var card = document.createElement('div');
  card.className = 'card';
  card.setAttribute('data-fb-id', key);
  return card;
}

function newContent(data) {
  var content = document.createElement('div');
  content.className = 'content';
  content.setAttribute('contenteditable', true);
  addBlurEventListener(content);
  content.innerHTML = data;
  return content;
}

function newHeading(data) {
  var heading = document.createElement('div');
  heading.className = 'heading';
  heading.setAttribute('contenteditable', true);
  addBlurEventListener(heading);
  heading.innerHTML = data;
  return heading;
}

function newChangeDate(data) {
  var changeDate = document.createElement('span');
  changeDate.className = 'change-date';
  changeDate.innerHTML = data;
  return changeDate;
}

function newDeleteButton() {
  var deleteButton = document.createElement('span');
  deleteButton.className += 'close ' + 'delete ' + 'fa ' + 'fa-times';
  addDeleteEventListener(deleteButton);
  return deleteButton;
}

commomElements.searchButton.addEventListener('click', function(e) {
  if (commomElements.searchBar.style.display === 'block') {
    commomElements.searchBar.style.display = 'none';
    commomElements.searchInput.blur();
    search.clearSearch();
  } else {
    commomElements.searchBar.style.display = 'block';
    commomElements.searchInput.focus();
  }
});

commomElements.searchInput.addEventListener('keyup', function(e) {
  if (commomElements.searchInput.value.length > 0) {
    search.performSearch(commomElements.searchInput.value);
  } else {
    search.clearSearch();
  }
});

commomElements.firstNewButton.addEventListener('click', function(e) {
  createNewCard();
});

commomElements.newButton.addEventListener('click', function(e) {
  createNewCard();
});

function createNewCard() {
  commomElements.emptyContainerMain.style.display = 'none';
  render(notesRepo.getNoteKey(), null);
  commomElements.cardContainerMain.getElementsByClassName('heading')[0].focus();
  commonDom.scrollToTop();
}

Array.from(commomElements.contentEditables).forEach(function(
  contentEditable,
  index,
  array
) {
  addBlurEventListener(contentEditable);
}, this);

function addBlurEventListener(contentEditable) {
  contentEditable.addEventListener('blur', function(e) {
    var key = contentEditable.parentNode.getAttribute('data-fb-id');
    notesRepo.setNote(
      key,
      new Note(
        contentEditable.parentNode.querySelector('.heading').innerHTML,
        contentEditable.parentNode.querySelector('.content').innerHTML,
        new Date().toISOString()
      )
    );
  });
}

Array.from(commomElements.deleteButtons).forEach(function(
  deleteButton,
  index,
  array
) {
  addDeleteEventListener(deleteButton);
}, this);

function addDeleteEventListener(deleteButton) {
  deleteButton.addEventListener('click', function(e) {
    commomElements.deleteConfirm.setAttribute(
      'del-id',
      deleteButton.parentNode.getAttribute('data-fb-id')
    );
    commomElements.deleteModal.style.display = 'block';
  });
}

commomElements.deleteConfirm.addEventListener('click', function() {
  var key = commomElements.deleteConfirm.getAttribute('del-id');
  var noteToDelete = document.querySelector('[data-fb-id="' + key + '"]');
  noteToDelete.parentNode.removeChild(noteToDelete);
  notesRepo.removeNote(key, function() {
    commomElements.deleteModal.style.display = 'none';
    if (commomElements.cardContainerMain.children.length == 0) {
      commomElements.emptyContainerMain.style.display = 'block';
    }
  });
});

commomElements.modalDelClose.addEventListener('click', function() {
  commomElements.deleteModal.style.display = 'none';
});

window.addEventListener('click', function(e) {
  if (e.target == commomElements.deleteModal) {
    commomElements.deleteModal.style.display = 'none';
  }
});

export { render };
