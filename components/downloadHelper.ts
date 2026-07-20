/**
 * Helper to convert a Base64 string to a Uint8Array securely and reliably
 */
export function base64ToUint8Array(base64: string): Uint8Array {
  // Remove padding/header if present
  const cleanBase64 = base64.replace(/^data:.*?;base64,/, '');
  const binaryString = atob(cleanBase64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Unified download utility to prevent corruption and guarantee correct MIME headers
 */
export function triggerFileDownload(
  data: Blob | Uint8Array | ArrayBuffer | string,
  filename: string,
  mimeType: string
): void {
  let blob: Blob;

  if (data instanceof Blob) {
    if (data.type !== mimeType) {
      blob = new Blob([data], { type: mimeType });
    } else {
      blob = data;
    }
  } else if (typeof data === 'string') {
    // Check if the string is likely base64 data (and not raw XML/HTML/TXT content)
    const trimmed = data.trim();
    const cleanBase64 = trimmed.replace(/^data:.*?;base64,/, '');
    const isBase64 = /^[a-zA-Z0-9+/=]+$/.test(cleanBase64) && 
                     !trimmed.includes('<html') && 
                     !trimmed.includes('<?xml') && 
                     !trimmed.includes('\n');
                     
    if (isBase64) {
      try {
        const bytes = base64ToUint8Array(cleanBase64);
        blob = new Blob([bytes], { type: mimeType });
      } catch (e) {
        console.error("Failed to parse base64 data, falling back to text Blob:", e);
        blob = new Blob([data], { type: mimeType });
      }
    } else {
      blob = new Blob([data], { type: mimeType });
    }
  } else {
    // Uint8Array or ArrayBuffer
    blob = new Blob([data], { type: mimeType });
  }

  // Create temporary URL and trigger download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.id = 'unified-download-link';
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  
  // Cleanup
  setTimeout(() => {
    if (document.body.contains(link)) {
      document.body.removeChild(link);
    }
    URL.revokeObjectURL(url);
  }, 150);
}
