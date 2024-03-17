const BaseRule = require('./BaseRule.js');
class AnchorTagRule extends BaseRule {

    constructor(){
       super();
       this.regex = 'MY_AWESOME_REGEX';
    }
    getRule(){
        return 'MY_AWESOME_REGEX';
    }
    setData(){

    }

    
}