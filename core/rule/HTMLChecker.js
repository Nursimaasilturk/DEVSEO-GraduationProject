class HTMLChecker {

    pageContent = '';
    issues  = [
        {
            type:'GLOBAL', //GLOBAL or LOCAL
            message:'H1 Tag is missing, please use at least one h1 tag',
            line:5
        }
    ];

    imageTagCheck(){
        this.issues.push({
            type:'LOCAL',
            message: "Image alt tag missing",
            line:5
        });
        return this;
    }

    h1Check() {
        this.issues.push({
            type:'GLOBAL',
            message: "Image alt tag missing",
            line:-1
        });
        return this;
    }

    headCheck() {
        this.issues.push({
            type:'GLOBAL',
            message: "Image alt tag missing",
            line:-1
        });
        return this;
    }


    anchorCheck(){
        this.issues.push({
            type:'LOCAL',
            message: "Image alt tag missing",
            line:20
        });
        return this;
    }

    check(pageContent){

        this.pageContent = pageContent;

        return this;
    }
}

module.exports = HTMLChecker;
