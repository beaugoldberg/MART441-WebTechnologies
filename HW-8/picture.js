class Picture {

    constructor(imagelink, quote) {
        this.imagelink = imagelink;
        this.quote = quote;
    }

    get imgLink() { return this.imagelink; }
    set imgLink(imagelink) { this.imagelink = imagelink; }

    get imgQuote() { return this.quote; }
    set imgQuote(imageQuote) { this.quote = imageQuote; }

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