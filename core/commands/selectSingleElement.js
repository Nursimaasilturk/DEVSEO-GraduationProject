
const vscode = require('vscode');
const cheerio = require('cheerio');
const CodeSelectionStrategy = require('../CodeSelectionStrategy.js');
const HTMLBuilderStrategy = require('../HtmlBuilderStrategy.js');

//Begin::SingleHtmlElementChecker || Tekli ve çoklu element için SEO kontrolü
let selectSingleElement = vscode.commands.registerCommand('devseo.status', async () => {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage("No active editor found.");
        return;
    }

    const document = editor.document;
  
    // if the selection is exist
    if (!editor.selection.isEmpty) {
        CodeSelectionStrategy.checkSelection({ editor });
        return;
    }

    // if the selection is empty, scan the entire document
    let issues = findMissingSEOAttributes(document);
  
    // send the issues to html Builder and map them to the list
    new HTMLBuilderStrategy(issues).build().render();

});
//End::SingleHtmlElementChecker

function findMissingSEOAttributes(document) {
    let issues = [];
    const fullText = document.getText();
 
    const $ = cheerio.load(fullText, { xmlMode: true, withStartIndices: true });
 
    $('img:not([alt])').each((index, element) => {
        let html = $.html(element);
        issues.push({
            id: issues.length + 1,
            name: element.name,
            html,
            message: "ALT attribute is missing on an image element"
        });
       
    });

    $('a:not([href])').each((index, element) => {
        let html = $.html(element);
        issues.push({
            id: issues.length + 1,
            name: element.name,
            html,
             message: "HREF attribute missing on an anchor element"
        });
       
    });

    

    return issues;
}



module.exports = selectSingleElement;
