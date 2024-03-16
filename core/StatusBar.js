const vscode = require('vscode');

class StatusBar{

    static activate(){
        const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right,100);
	// gösterilecek olan text
	statusBarItem.text="$(devseo-status-bar-icon) DEVSEO";
	// iconun üstine geldiğinde çıkan kısa açıklama
	statusBarItem.tooltip = "Click to run SEO optimization"
	// iconun statusbarda gösterilmesi
	statusBarItem.show();
	// çalışacak olan komut
	statusBarItem.command= 'devseo.status';
    }
}

module.exports = StatusBar;