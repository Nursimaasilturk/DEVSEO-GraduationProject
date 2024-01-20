// The module 'vscode' contains the VS Code extensibility API
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const OpenAI = require('openai');




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
		
		let pageIssuesList = "PAGE_CONTENT\n All Rights Reserved - Nursima Asiltürk & Ömer Atayilmaz";

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
		const imagePath = path.join(__dirname, '/assets/images/logo.png');
		//açık ve aktif sayfadan içeriği aldık
		const text = editor.document.getText();
		// let openAIAdvices = openAIApi(text);

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
		
		pageIssuesList = pageIssuesList.replace('PAGE_CONTENT','');

		//normalization uygulayıp satır sonlarını düzenledik
		//const normalizedText = normalizeLineEndings(text); 


		//ici bos pdf'e yazdırma islemleri
		const pdfDoc = new PDFDocument();
		const pdfStream = fs.createWriteStream(filePath);
		pdfDoc.pipe(pdfStream);

		pdfDoc.rect(0, 0, pdfDoc.page.width, pdfDoc.page.height).fillColor('#2193b0').fill(); // Example: Light blue background
		pdfDoc.fillColor('white');

		pdfDoc.fontSize(24);
		
		pdfDoc.text("SEO REPORT\n", {
			align: 'center',
		  });

		pdfDoc.fontSize(8);

		pdfDoc.text("\n" + "*".repeat(100) + "\n\n",{
			align:'center'
		});

		const imageWidth = 100;
		const imageHeight = 100;
	
		// Calculate the position to center the image
		const pageWidth = pdfDoc.page.width;
		const pageHeight = pdfDoc.page.height;
		const xPosition = (pageWidth / 2) - (imageWidth / 2);
		const yPosition = (pageHeight / 4) - (imageHeight / 4);
	
		// Add the image at the calculated position
		pdfDoc.image(imagePath, xPosition, yPosition, { fit: [imageWidth, imageHeight] });

		pdfDoc.text("\n".repeat(20));
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

function openAIApi(pageContent){
	const oaInstance = new OpenAI.OpenAI({
		apiKey: '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'
	});
	
	oaInstance.chat.completions.create({
		model: 'gpt-3.5-turbo', 
		messages: [{
			role: "system",
			content: "You are a helpful assistant."
		},{
			role: "user",
			content: "Sayfayı tara, seo hatalarını bul rapor halinde" + 
			"-> H1 Hatası(Başlık), [ÇÖZÜM]:...(1 adet kullanılmalıdı vs.) bu şekilde maddeler halinde bir çözüm istiyorum." +
			" İçerik: "	+
			pageContent
		}]
	}).then(response => {
		console.log(response); 
	}).catch(error => {
		console.error(error); // Handle any errors
	});
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
