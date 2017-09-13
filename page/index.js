'use strict'; 

var Generator = require('yeoman-generator'); 
var _ = require("lodash");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // this.option('babel'); // This method adds support for a `--babel` flag

    this.argument('pagename', { type: String, required: true });

    this.uCamelCName = _.upperFirst(_.camelCase(this.options.pagename));
    this.camelCName = _.camelCase(this.options.pagename);
    this.lowerCName = this.options.pagename.toLowerCase();
    this.kebabCName = _.kebabCase(this.options.pagename);
    this.uSnakeCName = _.snakeCase(this.options.pagename).toUpperCase();
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
  }
  end(){

  }

  _copyFiles(){
    let dir = 'src/pages/'+ this.uCamelCName+'/';
    let tempStr = {
        kebabCName:this.kebabCName, 
        uCamelCName:this.uCamelCName, 
        lowerCName:this.lowerCName,
        uSnakeCName:this.uSnakeCName,
        camelCName:this.camelCName
    }

    this.fs.copyTpl(
      this.templatePath('Page.tsx'),
      this.destinationPath(dir + this.uCamelCName +'.tsx'),
      tempStr
    );


    this.fs.copyTpl(
      this.templatePath('_page.scss'),
      this.destinationPath(dir + '_' + this.lowerCName + '.scss'),
      tempStr
    );
  }
};
