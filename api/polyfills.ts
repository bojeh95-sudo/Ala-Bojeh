// api/polyfills.ts

if (typeof globalThis.DOMMatrix === 'undefined') {
  (globalThis as any).DOMMatrix = class DOMMatrix {
    constructor() {}
  };
}
if (typeof globalThis.Path2D === 'undefined') {
  (globalThis as any).Path2D = class Path2D {
    constructor() {}
  };
}
if (typeof globalThis.ImageData === 'undefined') {
  (globalThis as any).ImageData = class ImageData {
    constructor() {}
  };
}
