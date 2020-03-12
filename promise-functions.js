Promise._any = function(promises) {
  return new Promise((resolve) => {
    Promise.race(promises)
      .then((value) => {
        resolve(value);
      })
      .catch((reason) => {
        console.log(reason);
      });
  });
};

Promise._allSettled = function(promises) {
  let length = promises.length;
  let count = 0;
  const result = [];
  return new Promise((resolve, _) => {
    for(let i = 0; i < length; i++) {
      promises[i]
        .then((value) => {
          count++;
          result.push({
            status: 'fullfilled',
            value
          });
        })
        .catch((reason) => {
          count++;
          result.push({
            status: 'rejected',
            reason
          });
        });
    }

    const interval = setInterval(() => {
      if (count === length) {
        clearInterval(interval);
        resolve(result);
      }
    }, 20);
  });
};

Promise.prototype._finally = function(callback) {
  const that = this;
  return new Promise((resolve, reject) => {
    that.then(() => {
      callback();
      resolve();
    }).catch(() => {
      callback();
      resolve()
    });
  });
};