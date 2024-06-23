const fs = require('fs');
const cheerio = require('cheerio');
const vscode = require('vscode');
const path = require('path');

class HTMLBuilder{

    static issues = [];
   
    constructor(issues){
        this.issues = issues;
    }

    //map all issues put into ul & li elements
     build(){
         this.issues.map(issue => `<li>${issue.message}</li>` ).join('');
        return this;
    }

    //import and html file from "/assets/templates/index.html" and put issues into #issues_list element
     render(){

        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('No workspace folder open.');
            return;
        }

        workspaceFolders[0].uri.fsPath
        const outputFilePath = path.join( workspaceFolders[0].uri.fsPath, 'output.html');

        fs.readFile(`${__dirname}/../index.html`,'utf-8',(err,data) => {
            if(err){
                console.log(err);
                return;
            }

            console.log(data);
            const $ = cheerio.load(data);

            const issuesListElement = $('#issues_list');
            issuesListElement.empty();
            
            this.issues.forEach(issue => {
                issuesListElement.append(`<li>${issue.message} - element: ${escapeHtml(issue.html)}</li>`);
            });

          
        
            fs.writeFile(outputFilePath,$.html(),(err) => {
                if(err){
                    console.log(err);
                    return;
                }
                console.log("Writing tamamlandı");
            })
        });


    }

}


function escapeHtml(html) {
    return html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#39;');
}
module.exports = HTMLBuilder;