
const vscode = require('vscode');
const CodeSelectionStrategy = require('./../CodeSelectionStrategy.js');

//Begin::SingleHtmlElementChecker ||  Tek element için SEO kontrolü
let selectSingleElement = vscode.commands.registerCommand('devseo.status',async ()=>{
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage("No active editor found.");
        return;
    }
    CodeSelectionStrategy.checkSelection({ editor });
});
//End::SingleHtmlElementChecker

module.exports = selectSingleElement;