var expect = require('expect');

var {generateMessage} = require('./message.js');


describe('generateMessage',()=>{
   it('should generate correct message',()=>{
    
         var from = 'saravjot';
         var text = 'hey';
         var At = new Date().getTime();
    
     var message = generateMessage(from,text);
       
        expect(message.from).toBe(from);
        expect(message.text).toBe(text);
        expect(message.At).toBeA('number');
           
          }); 
});