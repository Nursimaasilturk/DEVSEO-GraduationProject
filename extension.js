const vscode = require('vscode');
const StatusBar = require('./core/StatusBar.js');
const CommandManager = require('./core/CommandManager.js');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	StatusBar.activate();
	context.subscriptions.push(CommandManager.selectSingleElement);
	context.subscriptions.push(CommandManager.selectMultipleElements);
	context.subscriptions.push(CommandManager.selectSinglePage);
	context.subscriptions.push(CommandManager.selectMultiplePage);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
