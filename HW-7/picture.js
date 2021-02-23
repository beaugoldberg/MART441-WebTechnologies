class Picture {

    constructor(title, imagelink, description, author, year) {
        this.title = title;
        this.imagelink = imagelink;
        this.description = description;
        this.author = author;
        this.year = year;
    }

    get imgTitle() { return this.title; }
    set imgTitle(title) { this.title = title; }

    get imgLink() { return this.imagelink; }
    set imgLink(imagelink) { this.imagelink = imagelink; }

    get imgDescription() { return this.description; }
    set imgDescription(description) { this.description = description; }

    get imgAuthor() { return this.author; }
    set imgAuthor(author) { this.author = author; }

    get imgYear() { return this.year; }
    set imgYear(year) { this.year = year; }

    displayTitle() {
        var str; 
        str = this.title + ' by ' + this.author + ' from ' + this.year;
        return str;
    }

    displayInfo() {
        var str;
        str = "<br><br>" + this.description;
        return str;
    }
}