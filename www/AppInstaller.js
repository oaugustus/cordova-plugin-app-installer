 var exec = require('cordova/exec');

var AppInstaller = function () {
    this.options = {};
};

/**
 * Função que efetua o download do aplicativo na URL remota.
 * 
 * @param {string} url URL remota do arquivo apk
 * @param {string} filePath Caminho onde o arquivo apk será salvo local no smartphone
 * @param {function} onFileDownload Função que será executada após o arquivo ser baixado
 */
function download(url, filePath, onFileDownload) {
    var fileTransfer = new FileTransfer();

    fileTransfer.download(
        url,
        filePath,
        function (entry) {
            console.log("Successful download...");
            console.log("download complete: " + entry.toURL());
            onFileDownload(entry);
        },
        function (error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        },
        null, // or, pass false
        {
            //headers: {
            //    "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            //}
        }
    );
}

AppInstaller.prototype = {
    /**
     * Efetua o download e instalação do aplicativo.
     * 
     * @param {string} url URL remota do arquivo apk da aplicação
     * @param {string} dir Diretório onde o arquivo apk será baixado
     * @param {string} apk Nome local do apk a ser salvo no diretório
     * @param {function} success Função executada após a instalação ser concluída com sucesso
     * @param {function} error Função executada caso haja alguma falha na instalação
     * @param {function} onProgress Função executada durante o processo de instalação
     */
    downloadAndInstall: function (url, dir, apk, success, error, onProgress){
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
	    root = fs.root.getDirectory(dir + "/", {create: true}, function(dir){
		var filePath = '///storage/emulated/0/' + dir + '/' + apk;
		download(url, filePath, function(entry){
		    exec(success, error, 'AppInstaller', 'install', [entry.fullPath]);
		});
	    }, error);
        }, error);
    }
};

module.exports = new AppInstaller();
