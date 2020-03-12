require('./promise-functions');

function createSuccessPromise(name) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`promise ${name} resolve`);
      resolve(name);
    }, Math.random() * 20);
  });
}

function createFailPromise(name) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      console.log(`promise ${name} rejected`);
      reject(name);
    }, Math.random() * 20);
  });
}

function testAny() {
  Promise._any([
    createSuccessPromise('1'),
    createSuccessPromise('2'),
    createFailPromise('3')
  ]).then((value) => {
    console.log(`Promise._any result is ${value}`)
  });
}

function testAllSettled() {
  Promise._allSettled([
    createSuccessPromise('1'),
    createSuccessPromise('2'),
    createFailPromise('3')
  ]).then((value) => {
    console.log(`Promise._allSettled result is ${JSON.stringify(value)}`)
  });
}

function testFinally() {
  const successPromise = createSuccessPromise('1');
  successPromise._finally(() => {
    console.log('OUTPUT FINALLY in success promise');
  });

  const failPromise = createFailPromise('2');
  failPromise._finally(() => {
    console.log('OUTPUT FINALLY in fail promise');
  });
}

setTimeout(() => {
  console.log('---------TEST Promise._any---------------');
  testAny();
}, 1000);

setTimeout(() => {
  console.log('---------TEST Promise._allSettled---------------');
  testAllSettled();
}, 2000);

setTimeout(() => {
  console.log('---------TEST Promise.prototype_finally---------------');
  testFinally();
}, 3000);