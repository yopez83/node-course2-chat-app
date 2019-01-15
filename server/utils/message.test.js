var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate the correct message object', () => {
        var from = 'Jane';
        var text = 'Hello John';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Yadel';
        var url = 'https://www.google.com/maps?q=1,1';
        var message = generateLocationMessage(from, 1, 1);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
    });
});