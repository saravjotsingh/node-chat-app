var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message.js');


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

describe('generateLocationMessage',()=>{
    it('should generate location',()=>{
        var from = 'admin';
        var latitude = '30.00014';
        var longitude = '-75.2264';
        
        var message = generateLocationMessage(from,latitude,longitude);
        
        expect(message.from).toBe(from);
        expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
        expect(message.At).toBeA('number');
        
    })
})