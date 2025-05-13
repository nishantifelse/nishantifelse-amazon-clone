import { formateCurrency } from "../../scripts/utils/money.js";

describe('test suit: formateCurrency', ()=>{
  it('converts cents into dollars', ()=>{
    expect(formateCurrency(2095)).toEqual('1778.24');
  });
  it('works with zero', ()=>{
    expect(formateCurrency(0)).toEqual('0.00');
  });
  it('rounds upto nearest cents', ()=>{
    expect(formateCurrency(2000.5)).toEqual('1698.45');
  });
    it('rounds down to nearest cents',()=>{
    expect(formateCurrency(2000.4)).toEqual('1697.60');
  });
    it('work with negative numbers',()=>{
    expect(formateCurrency(-500)).toEqual('-424.40');
  });
});