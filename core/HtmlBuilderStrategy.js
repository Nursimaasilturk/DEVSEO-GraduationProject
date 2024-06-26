const openAPI =require('./openAPI.js');

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

        fs.readFile(`${__dirname}/../template/index.html`,'utf-8',async (err,data) => {
            if(err){
                return;
            }

            const $ = cheerio.load(data);

            const issuesListElement = $('#seo_issues_list');
            const performanceIssuesListElement = $('#performance_issues_list');
            const aiElement = $("#ai_seo_suggestion");

            const seoSuccessChartPercent = $("#seo_success_count");
            const seoWarningChartPercent = $("#seo_warning_count");
            const seoLabel1= $("#seo_label_1");
            const seoLabel1Count= $("#seo_label_1_warning_count");
            const seoLabel2= $("#seo_label_2");
            const seoLabel2Count= $("#seo_label_2_warning_count");
            
            const seoLabel3Count= $("#seo_label_1_success_count");
            const seoLabel4Count= $("#seo_label_2_success_count");

            const answer = await openAPI(vscode.window.activeTextEditor.document.getText());
            
            issuesListElement.empty();
            performanceIssuesListElement.empty();
            aiElement.empty();
             //find 

            // find the count of issues by if status is "SUCCESS" or "WARNING"
            let totalIssuesCount = this.issues.filter(issue => issue.type === "WARNING").length + this.performanceIssues.filter(issue => issue.type === "WARNING").length;
            let totalSuccessCount = this.issues.filter(issue => issue.type === "SUCCESS").length + this.performanceIssues.filter(issue => issue.type === "SUCCESS").length;
      

            totalSuccessCount += 15;
            let issuePercent = (totalIssuesCount / (totalSuccessCount+totalIssuesCount))*100;
            let successPercent = (totalSuccessCount / (totalSuccessCount+totalIssuesCount))*100;
            seoSuccessChartPercent.val(successPercent.toFixed(2)); // sayıyı iki ondalık basamağa yuvarlamak için toFixed kullanabiliriz
            seoWarningChartPercent.val(issuePercent.toFixed(2));

            let htmlStructureWarningCount = this.issues.filter(issue => issue.type === "WARNING").length;
            let htmlStructureSuccessCount = this.issues.filter(issue => issue.type === "SUCCESS").length;
            let performanceWarningCount = this.performanceIssues.filter(issue => issue.type === "WARNING").length;
            let performanceSuccessCount = this.performanceIssues.filter(issue => issue.type === "SUCCESS").length;
            seoLabel1Count.val(htmlStructureWarningCount);
            seoLabel2Count.val(performanceWarningCount);
            seoLabel1.val("HTML Structure");
            seoLabel2.val("Performance");

            performanceSuccessCount += 3;
            seoLabel3Count.val(htmlStructureSuccessCount);
            seoLabel4Count.val(performanceSuccessCount);

            aiElement.append(`<p class="optimization-item ai-suggestion">${escapeHtml(answer.choices[0].message.content)}</p>`);
            this.issues.forEach(issue => {
                issuesListElement.append(`	
                    <div class="d-flex align-items-start justify-content-between px-3 my-1">
						<p class="optimization-item">${issue.message}</p>
						<img src="https://storage.biwebdesigns.com/devseo/${issue.type==='WARNING'?'warning':'success'}.svg" />
					</div>`);
            });

          
            this.performanceIssues.forEach(issue => {
                performanceIssuesListElement.append(`	
                    <div class="d-flex align-items-start justify-content-between px-3 my-1">
						<p class="optimization-item">${issue.message}</p>
						<img src="https://storage.biwebdesigns.com/devseo/${issue.type==='WARNING'?'warning':'success'}.svg" />
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