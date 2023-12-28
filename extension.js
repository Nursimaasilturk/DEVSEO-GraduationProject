// The module 'vscode' contains the VS Code extensibility API
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
let pageChecks = require('./core/pageChecks.js');

// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const axios = require('axios');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "devseo" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('devseo.devseo', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('SEO optimization started!');
	});

	//const result = await axios('https://api.agify.io/?name=John')
	//console.log(result);
	
	let tursuKomut = vscode.commands.registerCommand("devseo.tursu",function(){
		const editor = vscode.window.activeTextEditor;

		if(editor){
			const  text =  editor.document.getText(editor.selection);
			checkAge(text);
		}
		
		vscode.window.showWarningMessage('Tursu komutu calisti');
	})

	let readPageData = vscode.commands.registerCommand("devseo.readPage",async function(){

		let pageIssuesList = "SEO REPORT\nPAGE_CONTENT\n All Rights Reserved - Nursima Asiltürk & Ömer Atayilmaz";

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
		const filePath = path.join(__dirname, `index.pdf`);

		//açık ve aktif sayfadan içeriği aldık
		const text = editor.document.getText();


		let h1Problems = pageChecks.checkH1Tags(text);
		let footerProblems = pageChecks.checkFooterTags(text);
		let titleProblems = pageChecks.checkTitleTag(text);
		let metaDescriptionTagProblems = pageChecks.checkMetaDescriptionTag(text);
		let checkMetaTagKeywords = pageChecks.checkMetaKeywordsTag(text);

		pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${h1Problems}\nPAGE_CONTENT\n`);
		pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${footerProblems}\nPAGE_CONTENT\n`);
		pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${titleProblems}\nPAGE_CONTENT\n`);
		pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${metaDescriptionTagProblems}\nPAGE_CONTENT\n`);
		pageIssuesList = pageIssuesList.replace('PAGE_CONTENT', `${checkMetaTagKeywords}\nPAGE_CONTENT\n`);
		

		//normalization uygulayıp satır sonlarını düzenledik
		//const normalizedText = normalizeLineEndings(text); 


		//ici bos pdf'e yazdırma islemleri
		const pdfDoc = new PDFDocument();
		const pdfStream = fs.createWriteStream(filePath);
		pdfDoc.pipe(pdfStream);
		pdfDoc.text(pageIssuesList);
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

	context.subscriptions.push(disposable);
	context.subscriptions.push(tursuKomut);
	context.subscriptions.push(readPageData);
}

async function checkAge(name){
	const result = await axios(`https://api.agify.io/?name=${name}`)
	vscode.window.showInformationMessage(`Adınız: ${result.data.name} - Tahmini yaşınız: ${result.data.age}`);
}

//NORMALIZATION YAPILDI

function normalizeLineEndings(text) {
    // Normalize line endings to '\n' (Unix format)
    return text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
}



// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
