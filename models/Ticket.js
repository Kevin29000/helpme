const { v4: uuidv4 } = require('uuid');

class Ticket {
    constructor(author, title, description, authorId) {
        if (!author || author.trim === "") throw new Error("Auteur obligatoire");
        if (!title || title.length > 50) throw new Error("Le titre est obligatoire (50 caractères max)");
        if (!description || description.length > 2000) throw new Error("Description obligatoire (2000 caractères max)");

        this.id = uuidv4();
        this.author = author;
        this.title = title;
        this.description = description;
        this.answers = [];
        this.creation_date = this.getFormattedDate();
        this.state = "ouvert";
        this.authorId = authorId;
    }

    getDisplayTicket() {
        return `id: ${this.id}, auteur: ${this.author}, date: ${this.creation_date}, titre: ${this.title}, description: ${this.description}, état: ${this.state}`;
    }

    getFormattedDate() {
        const now = new Date();
        return now.toLocaleString("fr-FR");
    }
}

module.exports = Ticket;