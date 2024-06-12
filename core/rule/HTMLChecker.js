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

        var lines = this.pageContent.includes('<h1');

        
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

        var lines = this.pageContent.split('\n'); 
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i].trim();
            // a etiketini kontrol et
            if (line.includes('<a')) {
                // href özniteliğini kontrol et
                if (!line.includes('href=')) {
                    // href özniteliği yoksa issues dizisine ekle
                    this.issues.push({
                        type: 'LOCAL',
                        message: 'Anchor href tag missing',
                        line: i + 1 // satır numarasını 1'den başlat
                    });
                }
            }
        }
        
    
        return this;
    }

    check(pageContent){

        this.pageContent = pageContent;

        return this;
    }
}

module.exports = HTMLChecker;
