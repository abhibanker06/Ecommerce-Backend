import {formatCurrency} from '../scripts/utils/money.js'

// The describe function is used in testing to group similar tests together. It helps keep tests organized and easy to read. Instead of writing all tests separately, you can put related tests inside describe.
// syntax:describe(description,callback)
// syntax:it(description,callback)


describe('test suite: formatCurrency',()=>{
    it('converts cents into dollars',()=>{
        expect(formatCurrency(2095)).toEqual('20.95'); 
    });

    it('work with 0',()=>{
        expect(formatCurrency(0)).toEqual('0.00'); 
    });

    it('round upto nearest cent',()=>{
        expect(formatCurrency(2000.5)).toEqual('20.01')
    });
});

 