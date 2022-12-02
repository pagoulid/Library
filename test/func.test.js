import { getVal } from '../src/scripts/modules/functions';

var assert = require('assert');



let str1="Mark"
let str2="status:unfinished"

describe('Testing other functions', function(){
    it('Mark will not change',function(){
      assert.equal(getVal(str1),"Mark");
    }); 

    it('status:unfinished will change to unfinished',function(){
        assert.equal(getVal(str2),"unfinished");
      }); 
    
  });

 