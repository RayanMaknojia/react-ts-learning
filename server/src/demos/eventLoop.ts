// ─────────────────────────────────────────────────────────────────────────
// Run this with: npm run demo:eventloop
// Demonstrates the "Synchronous vs Asynchronous" slides: Node runs your
// code top-to-bottom on a single thread, but async operations (timers,
// file/network I/O, Promises) get handed off and their callbacks run
// LATER, once the current synchronous code has finished - not the moment
// you call them. Watch the actual print order below; it will surprise you
// if you're expecting top-to-bottom.
// ─────────────────────────────────────────────────────────────────────────

console.log("1. synchronous — runs immediately");

// setTimeout is asynchronous even with a delay of 0ms. It doesn't run
// "0ms from now" in the sense of interrupting other code — it gets
// queued, and only runs once the current synchronous block is 100% done.
setTimeout(() => {
  console.log("4. setTimeout callback — runs after ALL synchronous code, even with 0ms delay");
}, 0);

// Promise callbacks (via .then, or the code after an `await`) run sooner
// than setTimeout callbacks, but still only after synchronous code finishes.
Promise.resolve().then(() => {
  console.log("3. Promise .then callback — runs after sync code, before setTimeout");
});

console.log("2. synchronous — runs immediately, right after line 1");

// Actual output order when you run this file: 1, 2, 5, 7, 3, 4, 6.
// Read that as three separate "waves":
//   Wave 1 (synchronous, top to bottom): 1, 2, then demoAwait() gets
//     called and runs synchronously UNTIL it hits `await` — so 5 happens
//     here too, and 7 (the line right after calling demoAwait()) also
//     runs before demoAwait ever resumes.
//   Wave 2 (microtasks — Promise callbacks): 3.
//   Wave 3 (timers — setTimeout callbacks): 4, then 6 (demoAwait's own
//     setTimeout fires ~100ms later, resuming the function where it
//     paused).
// This is the single-thread, non-blocking event loop from the slides:
// ALL synchronous code finishes first, then queued microtasks, then timers.

async function demoAwait() {
  console.log("5. inside demoAwait, before await");
  await new Promise((resolve) => setTimeout(resolve, 100));
  console.log("6. inside demoAwait, after await — the function PAUSED here,");
  console.log("   but the rest of the program kept running while it waited");
}

demoAwait();
console.log("7. this logs before step 6, even though demoAwait() was called first —");
console.log("   because await handed control back immediately");
