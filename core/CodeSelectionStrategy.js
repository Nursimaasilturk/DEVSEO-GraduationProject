const vscode = require('vscode'); 

class CodeSelectionStrategy{

    static checkSelection({ editor }){
        let selection = editor.selection;
        let selectedText = editor.document.getText(selection);

        CodeSelectionStrategy.checkImageTag({ selectedText,selection,editor })
        CodeSelectionStrategy.checkAnchorTag({ selectedText,selection,editor })
    }
    /*begin::Single Element in One Selection */

    static checkImageTag({ selectedText, selection, editor }) {
        if (selectedText.includes("<img")) {
            let updatedText = selectedText;
    
            // img etiketi içindeki alt özniteliğini kontrol et ve ekle
            const imgTagRegex = /<img\b[^>]*>/gi;
            updatedText = updatedText.replace(imgTagRegex, (imgTag) => {
                if (!imgTag.includes("alt")) {
                    if (imgTag.includes("/>")) {
                        return imgTag.replace("/>", "alt=\"\" />");
                    } else {
                        return imgTag.replace(">", "alt=\"\" >");
                    }
                }
                return imgTag;
            });
    
            // Seçimin başlangıcının bulunduğu konuma git
            let position = selection.start;
            let edit = new vscode.WorkspaceEdit();
    
            // Seçili metnin üstüne güncellenmiş metni yorum olarak ekle
            edit.insert(editor.document.uri, position, `<!-- ${updatedText.trim()} -->\n`);
            vscode.workspace.applyEdit(edit);
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
            } 
        }
    }


 
}
module.exports = CodeSelectionStrategy;