function workP(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('workP function');
    }, sec * 1000);
  });
}
async function asyncFunc1() {
  const result_workP = await workP(3);
  console.log(result_workP);
  return 'async function';
}
const asyncFunc2 = async () => {
  const result_workP = await workP(3);
  console.log(result_workP);
  return 'async function';
};
asyncFunc1().then((result) => console.log(result));
asyncFunc2().then((result) => console.log(result));
