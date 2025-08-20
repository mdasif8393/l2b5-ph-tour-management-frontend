// promise example

// let savedResolve, savedReject

// const myPromise = new Promise((resolve, reject) => {
//     savedResolve = resolve;
//     savedReject = reject;
// });

// myPromise
//     .then((value) => console.log("Promise Resolved.", value))
//     .catch((err) => console.log("Promise Rejected.", err))

// setTimeout(() => {
//     savedReject("Ami rejected.")
// }, 2000)