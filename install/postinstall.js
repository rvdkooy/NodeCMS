var chalk = require('chalk');
var path = require('path');
var npm = require('npm');
var fs = require('fs');

function installApps(){

  npm.load({
    loglevel: 'error'
  }, function(err, npm) {
  
    loopThroughAllApps(function(appsDir, files){
      console.log(chalk.green('Installing npm dependencies'));

      files.forEach(function(file) {  
        var pkgPath = path.join(appsDir, file);

        loadPackage(path.join(pkgPath, 'package.json'), function(err, data) {
          if (err) return;

          npm.commands.install(pkgPath, [pkgPath], function(err) {
            if (err) {
              console.log(chalk.red('Error: npm install failed'));
              return console.error(err);
            } else {
              console.log(chalk.green('- Dependencies installed for app: ' + file));

              var installPath = path.join(appsDir, file, 'install.js');
              if(fs.existsSync(installPath)){
                
                console.log(chalk.green('- Installing application: ' + file));
                var installation = require(installPath);
                installation.start();
              } 
            }
          });
        });
      });
    });
  });
};

function loopThroughAllApps(callback){
  var appsDir = path.join(process.cwd(), 'apps');
  
  fs.readdir(appsDir, function(err, files) {
    if (!files || !files.length) return;
    callback(appsDir, files);
  });
}

function loadPackage(path, callback) {
  fs.readFile(path, function(err, data) {
    if (err) return callback(err);

    try {
      var pkg = JSON.parse(data.toString());
      callback(null, pkg);
    } catch (err) {
      return callback(err);
    }
  });
}


installApps();