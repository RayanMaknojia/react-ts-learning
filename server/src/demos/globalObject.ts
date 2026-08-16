import "dotenv/config";

// ─────────────────────────────────────────────────────────────────────────
// Run this with: npm run demo:global
// Not part of the server - a standalone script demonstrating the "Global
// Object" section of the slides. `console` and `process` are both objects
// sitting in Node's global namespace - you never import them.
// ─────────────────────────────────────────────────────────────────────────

console.log("── console methods ──");
console.info("info: just an informational message");
console.warn("warn: something worth a second look");
console.error("error: something went wrong (this one goes to stderr, not stdout)");

console.log("\n── console.table ──");
console.table([
  { name: "Ada", role: "Programmer" },
  { name: "Alan", role: "Mathematician" },
]);

console.log("\n── console.time / timeEnd ──");
console.time("loop");
let total = 0;
for (let i = 0; i < 1_000_000; i++) total += i;
console.timeEnd("loop"); // prints how long the block above took

console.log("\n── the process object ──");
// process.argv: [0] is the path to node itself, [1] is this script's
// path, and anything after that is whatever YOU typed after the
// filename on the command line.
console.log("process.argv:", process.argv);
console.log("process.platform:", process.platform);
console.log("process.env.PORT (from .env):", process.env.PORT);

// Try running: npm run demo:global -- hello world
// and look at how process.argv changes.
