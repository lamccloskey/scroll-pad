import * as firebase from 'firebase';

var Note = function(heading, content, changeDate) {
    this.heading = heading,
    this.content = content,
    this.changeDate = changeDate
}

export { Note as default };