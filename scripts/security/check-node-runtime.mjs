const [major, minor, patch] = process.versions.node.split('.').map(Number);
if (major !== 24 || minor < 22 || (minor === 22 && patch < 1)) {
  throw new Error(`Build requires patched Node >=24.22.1 <25; found ${process.version}`);
}
console.log(`Security build runtime: ${process.version}`);
