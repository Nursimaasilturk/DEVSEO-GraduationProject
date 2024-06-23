
const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
let { titleFont, baseFont, lightFont } = require('../fonts.js');
let pageChecks = require('../pageChecks.js');
const HTMLChecker = require('./../rule/HTMLChecker.js');

//Begin::SinglePageSEOChecker || Aktif Olan Sayfada SEO Taraması - Rapor PDF halinde export edilir
let selectSinglePage = vscode.commands.registerCommand("devseo.readSinglePagePDF",async function(){
		
    let pageIssuesList = "PAGE_CONTENT\n";

    //aktif sayfa
    const editor = vscode.window.activeTextEditor;

    /* 
    TODO: dosya adı verme işlemi - çalışıyor şimdilik vakit kaybı oluyor diye yorum satırına aldım
    const pdfFileName = await vscode.window.showInputBox({
        prompt: 'Enter the PDF file name (without extension)',
        placeHolder: 'exported'
    });
    */

    //Taranacak aktif bir sayfa yoksa mesaj yaz ve bitir.
    if(!editor){
        vscode.window.showErrorMessage('No active editor');
        return;
    }

    //export edilecek dosya adını belirledik
    //TODO: Sonradan açarız const filePath = path.join(__dirname, `${pdfFileName}.pdf`);
    const filePath = path.join(__dirname, `/../../index.pdf`);
    const imagePath = path.join(__dirname, '/../../assets/images/logo.png');
    const text = editor.document.getText();
    // let openAIAdviceText = await openAIApi(text);


    pageIssuesList = pageIssuesList.replace('PAGE_CONTENT','');

    //normalization uygulayıp satır sonlarını düzenledik
    //const normalizedText = normalizeLineEndings(text); 


    //ici bos pdf'e yazdırma islemleri
    const pdfDoc = new PDFDocument();
    const pdfStream = fs.createWriteStream(filePath);

    pdfDoc.pipe(pdfStream);

    //pdfDoc.rect(0, 0, pdfDoc.page.width, pdfDoc.page.height).fillColor('#2193b0').fill(); // Example: Light blue background
    //pdfDoc.fillColor('white');

    pdfDoc.fontSize(24);
    pdfDoc.fillColor('#2d8bba');
    pdfDoc.font(titleFont);
    pdfDoc.text("SINGLE PAGE SEO REPORT\n", {
        align: 'center',
    });
    
    pdfDoc.font(baseFont);
    pdfDoc.fillColor('black');
    pdfDoc.fontSize(8);

    const imageWidth = 150;
    const imageHeight = 150;

    // Calculate the position to center the image
    const pageWidth = pdfDoc.page.width;
    const pageHeight = pdfDoc.page.height;
    const xPosition = (pageWidth / 2) - (imageWidth / 2);
    const yPosition = (pageHeight / 4) - (imageHeight / 4);

    // Add the image at the calculated position
    pdfDoc.image(imagePath, xPosition, yPosition, { fit: [imageWidth, imageHeight] });

    pdfDoc.text("\n".repeat(25));

    pageChecks.checkH1Tags(text,pdfDoc);
    pageChecks.checkFooterTags(text,pdfDoc);
    pageChecks.checkTitleTag(text,pdfDoc);
    pageChecks.checkMetaKeywordsTag(text,pdfDoc);
    pageChecks.checkMetaDescriptionTag(text,pdfDoc);

    pdfDoc.text(pageIssuesList);
    //setPageStyles(pdfDoc);
    pdfDoc.fontSize(20);
    pdfDoc.text("\n CHAT GPT-3.4 TURBO ADVICE\n", {
        align: 'center',
      });

    
    pdfDoc.fontSize(8);

    pdfDoc.text("\n" + "*".repeat(100) + "\n\n",{
        align:'center'
    });


    //pdfDoc.text(openAIAdviceText.choices[0].message.content);
    //setPageStyles(pdfDoc);
    pdfDoc.font(lightFont);
    pdfDoc.text("\n\n\nAll Rights Reserved - Nursima Asiltürk & Ömer Atayilmaz\n\n\n",{
        align:'center'
    });
    pdfDoc.end();

    
      
    //pdf taramasi bittiğinde
    pdfStream.on('finish', () => {
        vscode.window.showInformationMessage(`PDF exported to: ${filePath}`);
    });

    //pdf taramasinda hata alinirsa
    pdfStream.on('error', (err) => {
        vscode.window.showErrorMessage(`Error exporting PDF: ${err.message}`);
    });

});
//End::SinglePageSEOChecker


let selectSinglePageHTML = vscode.commands.registerCommand("devseo.readSinglePageHTML", async function(){
    const editor = vscode.window.activeTextEditor;


    if(!editor){
        vscode.window.showErrorMessage('No active editor');
        return;
    }

    const pageText = editor.document.getText();

    const issuesList = new HTMLChecker().check(pageText)
    .anchorCheck()
    .h1Check()
    .headCheck()
    .imageTagCheck();

  //  const h1TagCount = (pageText.match(/<h1\b[^>]*>(.*?)<\/h1>/gi) || []).length;

});


module.exports = selectSinglePage;