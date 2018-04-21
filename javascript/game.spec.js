 var game = require('./game.js');
require('jasmine')
const util = require('util');
var fs = require('fs');
var str='';
var oldConsoleLog = console.log;
function changeStream(){
// var log_file = fs.createWriteStream(dir + file, {flags : 'w'});
var log_stdout = process.stdout;

console.log = function(d) { //
  str +=  util.format(d) +"\n";
  // log_file.write(util.format(d) + '\n');
  // log_stdout.write(util.format(d) + '\n');
};
}
function changeBack()
{
  console.log = oldConsoleLog; 
}
describe("The test environment", function() {



  it("should pass", function() {
    var file = fs.readFileSync('fixtures/seed0.log');
    changeStream();
    setSeedAndRun('seed0.log');
    changeBack();
    expect(str.length).toBeGreaterThan(0);
    str ='';
  });

  it("the stream should be the same as the file for specic seed", function(){
    var file;
    for (var i=0; i<100;i++){
      // var i=1;
      file = fs.readFileSync('fixtures/seed'+ i +'.log', "utf8");

      expect(typeof file === "string").toBe(true);

      changeStream();


      setSeedAndRun('seed'+i+'.log');

      changeBack();
      expect(file==str).toBe(true);

      str = '';
    }
    
    
  });


});

describe("Your specs...", function() {
  // it ...
});
