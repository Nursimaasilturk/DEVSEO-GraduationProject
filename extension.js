const vscode = require('vscode');
const StatusBar = require('./core/StatusBar.js');
const CommandManager = require('./core/CommandManager.js');

/**
 * @param {vscode.ExtensionContext} context
 */
async function activate(context) {
	let percent = 45;
	StatusBar.activate();
	context.subscriptions.push(CommandManager.selectSingleElement);
//	context.subscriptions.push(CommandManager.selectMultipleElements);
//	context.subscriptions.push(CommandManager.selectSinglePage);
//	context.subscriptions.push(CommandManager.selectMultiplePage);
 
/*percent = Number(await vscode.window.showInputBox({
        prompt: 'Enter new Percent',
        placeHolder: 'exported'
    }));
	StatusBar.updateSEOPercent({ percent });

	*/
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
