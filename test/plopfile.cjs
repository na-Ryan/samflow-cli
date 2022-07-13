const { doesNotMatch, rejects } = require('assert');
var assert = require('assert');
var { exec } = require('child_process');
const { resolve } = require('path');
const path = require('path');
const fs = require('fs');
const {expect} = require('chai');

describe('Testing Samflow new command', function () {
  this.timeout(20000); // 20 second timeout for setup
  before((done)=>{
    exec('npm run debug myapp1', {
      cwd: '.'
    }, function (error, stdout, stderr) {
      done();
    });
  });
  it('should generate the required list of files and folder in myapp1', function () {
    const directoryPath = path.join(__dirname, '../myapp1');
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        expect(files).to.include.members([".gitignore","main.ts","node_modules","package-lock.json","package.json","src","tsconfig.json"]);
    });
  });
  it('should generate the required list of model in myapp1 > src > SumTask ', function () {
    const directoryPath = path.join(__dirname, '../myapp1/src/SumTask');
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        expect(files).to.include.members(["SumTaskModel.ts","SumTaskProcess.ts"]);
    });
  });
});