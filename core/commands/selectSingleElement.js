
const vscode = require('vscode');
const cheerio = require('cheerio');
const CodeSelectionStrategy = require('../CodeSelectionStrategy.js');
const HTMLBuilderStrategy = require('../HtmlBuilderStrategy.js');
const path = require('path');
const fs = require('fs');


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
    let allIssues = await findMissingSEOAttributes(document);
  
    // send the issues to html Builder and map them to the list
    new HTMLBuilderStrategy(allIssues).render();

});
//End::SingleHtmlElementChecker

async function findMissingSEOAttributes(document) {
    let issues = [];
    let performanceIssues = [];

    const fullText = document.getText();
 
    const $ = cheerio.load(fullText, { xmlMode: true, withStartIndices: true });
 
    //ISSUES 
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

    ['header', 'main', 'footer', 'body'].forEach(tag => {
        if ($(tag).length > 1) {
            
            issues.push({
                id: issues.length + 1,
                name: tag,
         
                message: `${$(tag).length} times ${tag.toUpperCase()} elements found`
            });
        }
    });

    $('figure').each((index, element) => {
        if ($(element).children('figcaption').length === 0) {
            let html = $.html(element);
            issues.push({
                id: issues.length + 1,
                name: element.name,
             
                message: 'FIGURE element missing a FIGCAPTION child element'
            });
        }
    });
    
    // meta description, keywords and title checks if exists or not element
    if ($('meta[name="description"]').length === 0) {
        issues.push({
            id: issues.length + 1,
            name:'meta[name="description"]',
            
            message: 'META DESCRIPTION tag missing'
        });
    }
  
    if($('meta[name="description"]').length > 0 && $('meta[name="description"]').attr('content')===''){
        issues.push({
            id: issues.length + 1,
            name:'meta[name="description"]',
          
            message: 'META DESCRIPTION tag exists but content is empty'
        });
    }

    if($('meta[name="keywords"]').length > 0 && $('meta[name="keywords"]').attr('content')===''){
        issues.push({
            id: issues.length + 1,
            name:'meta[name="keywords"]',
           
            message: 'META keywords tag exists but content is empty'
        });
    }

    if ($('meta[name="keywords"]').length === 0) {
        issues.push({
            id: issues.length + 1,
            name:'meta[name="keywords"]',
          
            message: 'META keywords tag missing'
        });
    }


    if ($('title').length === 0) {
        issues.push({
            id: issues.length + 1,
            name: 'title',
            message: 'TITLE tag missing'
        });
    }

    if ($('title').text() === "") {
        issues.push({
            id: issues.length + 1,
            name: 'title',
            message: 'TITLE is exist but value is missing'
        });
    }
  

     //search images(jpg,png,webp) in workspace of current project for user and find images bigger than 50kb and look for nested folders
     
     const workspace = vscode.workspace.workspaceFolders[0].uri.fsPath;
     await findLargeImages(workspace)
         .then(data => {

            performanceIssues.push({
                id: performanceIssues.length + 1,
                name: 'Image',
                message: 'Too big images size has been found in your workspace, please compress for better performance'
            });
         })
         .catch(error => {
             console.error('Error in main function:', error);
         });

    
 // PERFORMANCE

    if(!isMinifed(document.getText()))
        performanceIssues.push({
            id: performanceIssues.length + 1,
            name: 'HTML minified',
            message: 'File is not minifed, please minify to bettter performance!'
        });



   
        isFilesMinified().then( res => {
            if(res){
                performanceIssues.push({
                    id: performanceIssues.length + 1,
                    name: 'CSS minified',
                    message: 'CSS is not minifed, please minify to bettter performance!'
                });
            }
        });

    return  { issues, performanceIssues };
}


async function findLargeImages(workspace) {
    try {
        const issues = [];
        const files = await vscode.workspace.fs.readDirectory(vscode.Uri.file(workspace));
        let isBigFilesExists = false;
        for (const file of files) {
            const fileName = file[0];
            const fileType = file[1];

            if (fileType === vscode.FileType.File && (fileName.endsWith('.jpg') || fileName.endsWith('.png') || fileName.endsWith('.webp'))) {
                const fileUri = vscode.Uri.file(workspace + '/' + fileName);
                const data = await vscode.workspace.fs.readFile(fileUri);
                const fileSize = data.length;

                if (fileSize > 10000) { // 10 KB in bytes
                   isBigFilesExists = true;
                }
            }
        }
    
        return isBigFilesExists;
    } catch (error) {
        console.error('Error finding large images:', error);
        throw error; // Propagate the error upwards
    }
}
function escapeHtml(html) {
    return html.replace(/&/g, '&amp;')
               .replace(/</g, '&lt;')
               .replace(/>/g, '&gt;')
               .replace(/"/g, '&quot;')
               .replace(/'/g, '&#39;');

}

//write a file for reading css,js and returns content as string

async function readFileContent(filePath) {
    try {
        const fileUri = vscode.Uri.file(filePath);
        const data = await vscode.workspace.fs.readFile(fileUri);
        return data.toString();
    } catch (error) {
        console.error('Error reading file:', error);
        throw error; // Propagate the error upwards
    }
}
async function findAllCSSFiles(directoryUri) {
    let cssFiles = [];

    const files = await vscode.workspace.fs.readDirectory(directoryUri);
    for (const file of files) {
        const fileName = file[0];
        const fileType = file[1];

        const fileUri = vscode.Uri.joinPath(directoryUri, fileName);

        if (fileType === vscode.FileType.File && fileName.endsWith('.css')) {
            cssFiles.push(fileUri.fsPath);
        } else if (fileType === vscode.FileType.Directory) {
            const nestedFiles = await findAllCSSFiles(fileUri);
            cssFiles = cssFiles.concat(nestedFiles);
        }
    }

    return cssFiles;
}

async function isFilesMinified() {
    const workspaceUri = vscode.Uri.file(vscode.workspace.workspaceFolders[0].uri.fsPath);
    const cssFiles = await findAllCSSFiles(workspaceUri);

    let anUnminifedFileExist = false;
    for (const cssFile of cssFiles) {
        const content = await readFileContent(cssFile); 
        if(!isMinifed(content))
            anUnminifedFileExist = true;       
    }

    return anUnminifedFileExist;
}



function isMinifed(content) {
    // Example: Check if there are more than 100 whitespace characters
    const whitespaceCount = (content.match(/\s/g) || []).length;
    return whitespaceCount <= 5000; // Adjust threshold as needed
}

module.exports = selectSingleElement;
