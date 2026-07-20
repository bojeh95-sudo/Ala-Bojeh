// Web Worker for High-Performance PDF Page Rendering

// Shims for PDF.js single-thread fallback (fake worker) to avoid "document is not defined"
if (typeof self.window === 'undefined') {
  self.window = self;
}
if (typeof self.document === 'undefined') {
  self.document = {
    currentScript: null,
    getElementsByTagName: function() { return []; },
    createElement: function() {
      return {
        style: {},
        getContext: function() {
          return {
            fillRect: function() {},
            clearRect: function() {},
            getImageData: function() { return { data: [] }; },
            putImageData: function() {},
            createImageData: function() { return { data: [] }; },
            setTransform: function() {},
            drawImage: function() {}
          };
        }
      };
    },
    documentElement: {
      style: {}
    }
  };
}

self.importScripts('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js');

// Set worker src
self.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

let currentDocPromise = null;
let currentDoc = null;
const messageQueue = [];
let isProcessing = false;

self.onmessage = function(e) {
  messageQueue.push(e.data);
  processQueue();
};

async function processQueue() {
  if (isProcessing) return;
  isProcessing = true;

  while (messageQueue.length > 0) {
    const message = messageQueue.shift();
    try {
      await handleMessage(message);
    } catch (err) {
      console.error('Error handling worker message:', err);
    }
  }

  isProcessing = false;
}

async function handleMessage(message) {
  const { type, data } = message;

  if (type === 'loadDoc') {
    try {
      const { arrayBuffer } = data;
      currentDocPromise = self.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      currentDoc = await currentDocPromise;
      self.postMessage({
        type: 'docLoaded',
        status: 'success',
        pageCount: currentDoc.numPages
      });
    } catch (err) {
      currentDocPromise = null;
      currentDoc = null;
      self.postMessage({
        type: 'docLoaded',
        status: 'error',
        error: err.message || String(err)
      });
    }
  } else if (type === 'renderPage') {
    const { pageNum, scale = 0.45 } = data;
    try {
      // 1. Ensure the document promise exists and is fully resolved
      if (!currentDocPromise) {
        throw new Error('No document loaded');
      }
      const doc = await currentDocPromise;
      if (!doc) {
        throw new Error('Document loading failed or not available');
      }

      // 2. Load the page object
      const page = await doc.getPage(pageNum);
      if (!page) {
        throw new Error(`Failed to load page ${pageNum}`);
      }

      const viewport = page.getViewport({ scale });
      
      // Use OffscreenCanvas to render in the background thread safely
      const canvas = new OffscreenCanvas(viewport.width, viewport.height);
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Failed to create OffscreenCanvas 2D context');
      }
      
      // 3. Render the page fully
      await page.render({
        canvasContext: context,
        viewport: viewport
      }).promise;
      
      // Convert canvas to a lightweight JPEG Blob with 70% quality
      const blob = await canvas.convertToBlob({
        type: 'image/jpeg',
        quality: 0.70
      });
      
      self.postMessage({
        type: 'pageRendered',
        status: 'success',
        pageNum,
        blob
      });
    } catch (err) {
      self.postMessage({
        type: 'pageRendered',
        status: 'error',
        pageNum,
        error: err.message || String(err)
      });
    }
  }
}
