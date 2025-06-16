const { v4: uuidv4 } = require('uuid');

class Answer {
    constructor(answer, authorName, authorId) {
        this.id = uuidv4();
        this.answer = answer;
        this.authorName = authorName;
        this.authorId = authorId;
    }
}

module.exports = Answer;