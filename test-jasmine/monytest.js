import { formateCurrency } from "../scripts/utils/money.js";

describe('test suit: formateCurrency', ()=>{
  it('converts cents into dollars', ()=>{
    expect(formateCurrency(2095)).toEqual('20.95');
  });
  it('works with zero', ()=>{
    expect(formateCurrency(0)).toEqual('0.00');
  });
  it('rounds upto nearest cents', ()=>{
    expect(formateCurrency(2000.5)).toEqual('20.01');
  });
});