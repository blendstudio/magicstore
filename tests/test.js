var test = require('tape');

test('test', function (t) {
  // number of assertions
  t.plan(1);

  // set timeout in ms for performance coverage
  t.timeoutAfter(50);

  t.equal(1, 1,
    "1 === 1 ......................... should be evaluated as true");
});
