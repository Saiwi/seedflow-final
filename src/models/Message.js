export default class Message {
    constructor({
        author,
        date,
        rating,
        message
    } = {}) {
        this.author = author;
        this.date = date;
        this.rating = rating;
        this.message = message;
    }
}