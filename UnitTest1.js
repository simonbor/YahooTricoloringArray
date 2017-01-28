var assert = require('assert');
const tricoloringArray = require('./tricoloringArray.js');

exports['TricoloringArray'] = function () {
    assert.equal(tricoloringArray.solution([3, 7, 2, 5, 4]), 'RGBBR', "This should be equal");
}

exports['TricoloringArrayImposible'] = function () {
    assert.equal(tricoloringArray.solution([3, 6, 9]), 'impossible', "This should be equal");
}



