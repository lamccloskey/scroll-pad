var elements = {
  body: document.querySelector('body'),
  titleTop: document.querySelector('#title-top'),
  userPhotoTop: document.querySelector('#user-photo-top'),
  searchButton: document.querySelector('button#search'),
  searchBar: document.querySelector('#search-bar'),
  searchInput: document.querySelector('#search-input'),
  newButton: document.querySelector('button#new'),
  firstNewButton: document.querySelector('button#first-new'),
  loadingIcon: document.querySelector('#loading-icon'),
  deleteButtons: document.querySelectorAll('.close.delete'),
  deleteConfirm: document.querySelector('#delete-confirm'),
  deleteModal: document.querySelector('#delete-modal'),
  modalDelClose: document.querySelector('#modal-del-close'),
  userModal: document.querySelector('#user-modal'),
  userName: document.querySelector('#user-name'),
  userEmail: document.querySelector('#user-email'),
  userPhoto: document.querySelector('#user-photo'),
  modalAccClose: document.querySelector('#modal-acc-close'),
  deleteAccount: document.querySelector('#delete-account'),
  deleteAccConfirm: document.querySelector('#delete-acc-confirm'),
  signOut: document.querySelector('#sign-out'),
  cardTop: document.querySelector('#card-top'),
  emptyContainerMain: document.querySelector('#empty-container-main'),
  splashContainer: document.querySelector('#splash-container'),
  cardContainerAuth: document.querySelector('#card-container-auth'),
  cardContainerMain: document.querySelector('#card-container-main'),
  contentEditables: document.querySelectorAll('[contenteditable=true]')
};

function scrollToBottom() {
  if (
    cardContainerMain.children.length > 1 ||
    cardContainerMain.scrollHeight > window.innerHeight
  ) {
    window.scroll(0, cardContainerMain.scrollHeight);
  }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

export { elements, scrollToTop, scrollToBottom };
