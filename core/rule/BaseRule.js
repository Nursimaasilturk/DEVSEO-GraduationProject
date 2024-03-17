class BaseRule {

    constructor(){
        this.regex = {};
        this.valid = false;
    }

    static check() {
        
    }
    static getHTMLElementWithSEO(){

    }
    isValidForSEO(){
        return this.valid;
    }
}

module.exports = BaseRule;