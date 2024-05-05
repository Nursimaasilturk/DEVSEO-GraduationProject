
const vscode = require('vscode');


//Begin::MultiHtmlElementChecker
let selectMultipleElements = vscode.commands.registerCommand("devseo.selectCodeBlock", async function(){
	
    let editor = vscode.window.activeTextEditor;
    if(!editor){
        vscode.window.showInformationMessage("No active editor found.");
        return;
    }

    let { selection } = editor;
    let selectedText = editor.document.getText(selection);

    // Eksik SEO özniteliklerini ekleyen fonksiyon
	function addMissingSEOAttributes(htmlString) {
        // 'src' özniteliğinin boş olduğu img etiketleri için 'alt' özniteliğini ekleme
        htmlString = htmlString.replace(/<img([^>]*)src=""([^>]*)>/g, '<img$1src="" alt=""$2>');
        // 'href' özniteliğinin boş olduğu a etiketleri için 'href' özniteliğini '#' yapma
        htmlString = htmlString.replace(/<a([^>]*)>([^<]*)<\/a>/g, '<a$1 href="#">$2</a>');
        return htmlString;
    }


    // Eksik SEO özniteliklerini ekleyerek yorum satırı içine al
    let commentedText = `<!--\n${addMissingSEOAttributes(selectedText)}\n-->`;

    // Seçili metni belgeye ekle
    editor.edit(editBuilder => {
        editBuilder.insert(selection.start, commentedText);
    });

});
//End::MultiHtmlElementChecker

module.exports = selectMultipleElements;