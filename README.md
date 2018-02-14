App Installer
===


### Instalação

```
cordova plugin add https://github.com/oaugustus/neton-cordova-plugin-app-installer
```


### Como utilizar

```javascript
window.cordova.AppInstaller.downloadAndInstall("http://mydomain.com/myapp.apk", function(){
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

### Exemplo angular

```javascript
angular.module('myModule')
    .service('appInstaller', function AppInstaller($window, $log, $q) {
        this.install = function (url) {
            if (!$window.cordova || !$window.cordova.AppInstaller) {
                $log.error('Plugin de instalação Cordova não foi encontrado');
                return ;
            }
            var deferred = $q.defer();
            $window.cordova.AppInstaller.downloadAndInstall(url, deferred.resolve, deferred.reject);
            return deferred.promise;
        };
    });
```
