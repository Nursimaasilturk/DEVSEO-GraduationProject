const fs = require('fs');
const cheerio = require('cheerio');
const vscode = require('vscode');
const path = require('path');

class HTMLBuilder{

    static issues = [];
    static performanceIssues = [];
   
    constructor({issues, performanceIssues }){
        this.issues = issues;
        this.performanceIssues = performanceIssues;
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

        fs.readFile(`${__dirname}/../template/index.html`,'utf-8',(err,data) => {
            if(err){
                return;
            }

            const $ = cheerio.load(data);

            const issuesListElement = $('#seo_issues_list');
            const performanceIssuesListElement = $('#performance_issues_list');

            issuesListElement.empty();
            performanceIssuesListElement.empty();
            
            this.issues.forEach(issue => {
                issuesListElement.append(`	
                    <div class="d-flex align-items-start justify-content-between px-3 my-1">
						<p class="optimization-item">${issue.message}</p>
						<img src="https://storage.biwebdesigns.com/devseo/warning.svg" />
					</div>`);
            });

          
            this.performanceIssues.forEach(issue => {
                performanceIssuesListElement.append(`	
                    <div class="d-flex align-items-start justify-content-between px-3 my-1">
						<p class="optimization-item">${issue.message}</p>
						<img src="https://storage.biwebdesigns.com/devseo/success.svg" />
					</div>`);
            });

          
        
            fs.writeFile(outputFilePath,$.html(),(err) => {
                if(err){
                    console.log(err);
                    return;
                }
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