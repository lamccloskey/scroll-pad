import * as commonDom from './common.dom';

var commomElements = commonDom.elements;

function performSearch(input) {
  var noteElements = Array.from(commomElements.cardContainerMain.children);
  noteElements.forEach(function(element) {
    if (input) {
      if (element.innerText.toLowerCase().indexOf(input.toLowerCase()) != -1) {
        var elementRect = element.getBoundingClientRect();
        var absRectTop = elementRect.top + window.pageYOffset;
        var middle = absRectTop - window.innerHeight / 2;
        element.style.border = '2px solid #aaa';
        window.scrollTo(0, middle);
      } else {
        element.style.border = '';
      }
    }
  });
}

function clearSearch() {
  commomElements.searchInput.value = '';
  var noteElements = Array.from(commomElements.cardContainerMain.children);
  noteElements.forEach(function(element) {
    element.style.border = '';
  });
}

export { performSearch, clearSearch };
