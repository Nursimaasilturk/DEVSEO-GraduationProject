
const vscode = require('vscode');
const fs = require('fs');

const path = require('path');
const PDFDocument = require('pdfkit');
let pageChecks = require('../pageChecks.js');
let { titleFont, baseFont, lightFont } = require('../fonts.js');





//Begin::AllPagesSEOChecker Çoklu Sayfada SEO Taraması - Her sayfa için rapor pdf halinde export edilir.
let selectMultiplePage = vscode.commands.registerCommand("devseo.readAllPagesPDF", async function(){
    let pageIssuesList = "PAGE_CONTENT\n";

    try{

        const allHtmlFiles = await vscode.workspace.findFiles('**/*.html');
        for(let singleFile of allHtmlFiles){
            const content = await fs.promises.readFile(singleFile.fsPath,'utf8');
            console.log(`Content of ${singleFile.path}`);

            let pdfDoc = new PDFDocument();
            let fileName = path.basename(singleFile.path).replace('.html','.pdf');

            const seoFolder = path.join(__dirname + './../../', 'seo');
            await fs.promises.mkdir(seoFolder, { recursive: true });


            const filePath = path.join(seoFolder,fileName);

            let pdfStream = fs.createWriteStream(filePath);
            pdfDoc.pipe(pdfStream);
    
            pdfDoc.fontSize(24);
    
            pdfDoc.text(`SEO REPORT FOR PAGE ${fileName.toUpperCase()} \n`, {
                align: 'center',
            });
            pdfDoc.text(pageIssueChecker(content,pageIssuesList,pdfDoc));

            pdfDoc.end();
            //pdf taramasi bittiğinde
            pdfStream.on('finish', () => {
                vscode.window.showInformationMessage(`PDF exported to: ${filePath}`);
            });

            //pdf taramasinda hata alinirsa
            pdfStream.on('error', (err) => {
                vscode.window.showErrorMessage(`Error exporting PDF: ${err.message}`);
            });
        }

    }catch(err){
        console.error('Error reading HTML Files: ', err);
        vscode.window.showErrorMessage('Error reading HTML files.');
    }
});
//End::AllPagesSEOChecker


const pageIssueChecker = (pageContent, pageIssuesList,pdfDoc)=> {
	let h1Problems = pageChecks.checkH1Tags(pageContent,pdfDoc);
	/*let footerProblems = pageChecks.checkFooterTags(pageContent);
	let titleProblems = pageChecks.checkTitleTag(pageContent);
	let metaDescriptionTagProblems = pageChecks.checkMetaDescriptionTag(pageContent);
	let checkMetaTagKeywords = pageChecks.checkMetaKeywordsTag(pageContent);
    */

   /*	pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${h1Problems}\nPAGE_CONTENT\n`);
 
	pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${footerProblems}\nPAGE_CONTENT\n`);
	pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${titleProblems}\nPAGE_CONTENT\n`);
	pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${metaDescriptionTagProblems}\nPAGE_CONTENT\n`);
	pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${checkMetaTagKeywords}\nPAGE_CONTENT\n`);
	*/
	pageIssuesList = pageIssuesList.replace('PAGE_CONTENT','');
	return pageIssuesList;
}

module.exports = selectMultiplePage;