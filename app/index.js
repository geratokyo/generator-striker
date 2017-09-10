'use strict'; 

var Generator = require('yeoman-generator'); 
var _ = require("lodash");

module.exports = class extends Generator {

  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);
    // Next, add your custom code
    // this.option('babel'); // This method adds support for a `--babel` flag

    // This makes `appname` a required argument.
    this.argument('appname', { type: String, required: true });
    
    // And you can then access it later; e.g.
    this.options.appname = _.kebabCase(this.options.appname);
    this.log(_.kebabCase(this.options.appname));
  }

  initializing(){

  }
  prompting(){

  }
  configuring(){

  }
  writing(){
    this._copyFiles();
  }
  conflicts(){

  }
  install(){
    this.npmInstall();
  }
  end(){

  }

  _copyFiles(){
    this.fs.copy(
      this.templatePath('public/**'),
      this.destinationPath('public/'),
      { 
        globOptions: { 
          dot: true, 
          ignore:"**/.DS_Store" 
        }
      }
    );
    this.fs.copyTpl(
      this.templatePath('src/**'),
      this.destinationPath('src/'),
      { appname: this.options.appname ,
        globOptions: { 
          dot: true, 
          ignore:"**/.DS_Store" 
        }
      }
    );

    this.fs.copy(
      this.templatePath('s.gitignore'),
      this.destinationPath('.gitignore')
    );

    this.fs.copy(
      this.templatePath('config.rb'),
      this.destinationPath('config.rb')
    );

    this.fs.copy(
      this.templatePath('README.md'),
      this.destinationPath('README.md')
    );

    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    );

    this.fs.copy(
      this.templatePath('webpack.config.js'),
      this.destinationPath('webpack.config.js')
    );

    this.fs.copy(
      this.templatePath('yarn.lock'),
      this.destinationPath('yarn.lock')
    );

    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      { appname: this.options.appname }
    );
  }
};
