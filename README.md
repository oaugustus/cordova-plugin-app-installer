Net On Cordova App Installer
===


### Instalação

```
cordova plugin add https://github.com/oaugustus/neton-cordova-plugin-app-installer
```


### Como utilizar

```javascript
window.cordova.AppInstaller.downloadAndInstall("http://mydomain.com/myapp.apk", "localDir","localFile.apk", function(){
	console.log('instalação ok ok');
}, function(err){
	console.log(err);
}, function(progressEvent){
	if (progressEvent.lengthComputable) {
		progress = progressEvent.loaded / progressEvent.total;
		console.log(progress);
	}
});
```
