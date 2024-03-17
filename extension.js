const vscode = require('vscode');
const StatusBar = require('./core/StatusBar.js');
const Checker = require('./core/checker.js');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	StatusBar.activate();
	context.subscriptions.push(Checker.singleHTMLElementChecker);
	context.subscriptions.push(Checker.multiHtmlElementChecker);
	context.subscriptions.push(Checker.singlePageSEOChecker);
	context.subscriptions.push(Checker.allPagesSEOChecker);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
