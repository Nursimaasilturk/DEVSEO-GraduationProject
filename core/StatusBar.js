const vscode = require('vscode');

class StatusBar{

     static statusBarItem;
    static activate(){
         this.statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right,100);
        // gösterilecek olan text
        this.statusBarItem.text=`$(search) DEVSEO`;
        // iconun üstine geldiğinde çıkan kısa açıklama
        this.statusBarItem.tooltip = "Click to run SEO optimization"
        // iconun statusbarda gösterilmesi
        this.statusBarItem.show();
        // çalışacak olan komut
        this.statusBarItem.command= 'devseo.status';
    }

    static updateSEOPercent({ percent }){
        this.statusBarItem.text=`$(search) DEVSEO(${percent}%)`;
    }
}

module.exports = StatusBar;