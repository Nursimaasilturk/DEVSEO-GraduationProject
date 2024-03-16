const vscode = require('vscode'); 

class CodeSelectionStrategy{

    static checkSelection({editor}){
        let selection = editor.selection;
        let selectedText = editor.document.getText(selection);

        CodeSelectionStrategy.checkImageTag({ selectedText,selection,editor })
        CodeSelectionStrategy.checkAnchorTag({ selectedText,selection,editor })
    }
    /*begin::Single Element in One Selection */

    static checkImageTag({ selectedText,selection,editor }) {
        if (selectedText.includes("<img")) {
            if (!selectedText.includes("alt")) {
                // Eğer alt tagi yoksa, alt attribute'yi ekleyelim.
                let updatedText = selectedText.replace("/>", "alt=\"\"/	>");
                let position = selection.start.translate(-1, 0); // Seçimin başlangıcının üst satırına git
                let line = editor.document.lineAt(position);
                let edit = new vscode.WorkspaceEdit();
                edit.insert(editor.document.uri, line.range.end, `<!-- ${updatedText.trim()} -->\n`);
                vscode.workspace.applyEdit(edit);
                vscode.window.showInformationMessage("Added alt attribute to img tag as a comment in the line above.");
            } else {
                vscode.window.showInformationMessage("Selected text contains img tag with alt attribute.");
            }
        } else {
            vscode.window.showInformationMessage("Selected text does not contain img tag.");
        }
    }
    static checkAnchorTag({  selectedText, selection, editor }) {
        if (selectedText.includes("<a")) {
            if (!selectedText.includes("href")) {
                let updatedText = selectedText.replace("<a>", "<!-- <a href=\"#\">").replace("</a>", "</a> -->");
                let position = selection.start.translate(-1, 0);
                let line = editor.document.lineAt(position);
                let edit = new vscode.WorkspaceEdit();
                edit.insert(editor.document.uri, line.range.end, `${updatedText.trim()}\n`);
                vscode.workspace.applyEdit(edit);
                vscode.window.showInformationMessage("Added href attribute to anchor tag as a comment in the line above.");
            } else {
                vscode.window.showInformationMessage("Selected text contains anchor tag with href attribute.");
            }
        } else {
            vscode.window.showInformationMessage("Selected text does not contain anchor tag.");
        }
    }

    static checkHtmlTag({ selectedText, selection, editor }){

    }
    /*end::Single Element in One Selection */
    /*begin::Multiple Element in One Selection */
    
    /*end::Multiple Element in One Selection */
}
module.exports = CodeSelectionStrategy;