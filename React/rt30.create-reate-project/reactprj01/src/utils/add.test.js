import { add } from './add';

describe('add.test 테스트', () => {
  test('add:: ', (done) => {
    // Assertions
    const aaa = add(1, 2);
    debugger;
    expect(aaa).toBe(3); // true
    done();
  });
});
