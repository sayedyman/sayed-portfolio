/**
 * Generate favicon.ico from the SE monogram SVG.
 * Creates a 32x32 ICO file with the logo on #050505 background.
 *
 * Run: node scripts/generate-favicon.mjs
 */
import { writeFileSync } from 'fs'


// Convert SVG to a PNG-based ICO using a minimal ICO container.
// ICO format: 6-byte header + 16-byte directory entry + PNG data.
// We encode the SVG as a PNG embedded in the ICO container.

// Since we can't use sharp/canvas in a zero-dep script, we'll create
// the favicon.ico as a proper ICO file wrapping a BMP image.

// For maximum compatibility, we create a 32x32 RGBA BMP inside ICO format.
// This is the standard approach used by most favicon generators.

const width = 32
const height = 32

// Create a simple 32x32 image with the dark background
// We'll render a simplified version of the logo mark
function createBMPData() {
  const pixels = new Uint8Array(width * height * 4) // BGRA format for BMP

  // Fill with background color #050505
  for (let i = 0; i < width * height; i++) {
    const offset = i * 4
    pixels[offset] = 0x05     // B
    pixels[offset + 1] = 0x05 // G
    pixels[offset + 2] = 0x05 // R
    pixels[offset + 3] = 0xFF // A
  }

  // Draw a stylized "SE" mark using simple pixel placement
  // White "S" shape (left portion) - approximation of the logo curves
  const white = [0xFF, 0xFF, 0xFF, 0xFF] // BGRA white
  const yellow = [0x00, 0xE5, 0xFF, 0xFF] // BGRA #FFE500

  function setPixel(x, y, color) {
    if (x < 0 || x >= width || y < 0 || y >= height) return
    // BMP stores bottom-to-top
    const row = (height - 1 - y)
    const offset = (row * width + x) * 4
    pixels[offset] = color[0]
    pixels[offset + 1] = color[1]
    pixels[offset + 2] = color[2]
    pixels[offset + 3] = color[3]
  }

  function fillRect(x1, y1, w, h, color) {
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        setPixel(x1 + dx, y1 + dy, color)
      }
    }
  }

  // Simplified SE monogram at 32x32 (pixel art approximation)
  // S shape - top bar
  fillRect(6, 5, 12, 2, white)
  // S shape - left side top
  fillRect(6, 5, 2, 8, white)
  // S shape - middle bar
  fillRect(6, 13, 12, 2, white)
  // S shape - right side bottom
  fillRect(16, 13, 2, 8, white)
  // S shape - bottom bar
  fillRect(6, 21, 12, 2, white)
  // S shape - bottom-left return
  fillRect(6, 19, 2, 4, white)

  // Yellow accent strokes (characteristic diagonal marks)
  fillRect(19, 5, 7, 2, yellow)    // top-right accent
  fillRect(19, 12, 7, 2, yellow)   // middle-right accent
  fillRect(21, 19, 5, 2, yellow)   // bottom-right accent
  fillRect(19, 25, 6, 2, yellow)   // lowest accent

  return pixels
}

function createICO(pixels) {
  // BMP info header (40 bytes) for ICO
  const bmpInfoHeader = Buffer.alloc(40)
  bmpInfoHeader.writeUInt32LE(40, 0)        // header size
  bmpInfoHeader.writeInt32LE(width, 4)      // width
  bmpInfoHeader.writeInt32LE(height * 2, 8) // height (doubled for ICO: image + mask)
  bmpInfoHeader.writeUInt16LE(1, 12)        // color planes
  bmpInfoHeader.writeUInt16LE(32, 14)       // bits per pixel
  bmpInfoHeader.writeUInt32LE(0, 16)        // compression (none)
  const imageSize = width * height * 4
  const maskRowSize = Math.ceil(width / 32) * 4
  const totalMaskSize = maskRowSize * height
  bmpInfoHeader.writeUInt32LE(imageSize + totalMaskSize, 20) // image size
  bmpInfoHeader.writeInt32LE(0, 24)         // x pixels per meter
  bmpInfoHeader.writeInt32LE(0, 28)         // y pixels per meter
  bmpInfoHeader.writeUInt32LE(0, 32)        // colors used
  bmpInfoHeader.writeUInt32LE(0, 36)        // important colors

  // AND mask (all opaque = all zeros)
  const andMask = Buffer.alloc(totalMaskSize, 0)

  // Combine
  const bmpData = Buffer.concat([bmpInfoHeader, Buffer.from(pixels), andMask])

  // ICO header (6 bytes)
  const icoHeader = Buffer.alloc(6)
  icoHeader.writeUInt16LE(0, 0)    // reserved
  icoHeader.writeUInt16LE(1, 2)    // type: 1 = ICO
  icoHeader.writeUInt16LE(1, 4)    // number of images

  // ICO directory entry (16 bytes)
  const icoDir = Buffer.alloc(16)
  icoDir.writeUInt8(width, 0)      // width (0 means 256)
  icoDir.writeUInt8(height, 1)     // height
  icoDir.writeUInt8(0, 2)          // color palette
  icoDir.writeUInt8(0, 3)          // reserved
  icoDir.writeUInt16LE(1, 4)       // color planes
  icoDir.writeUInt16LE(32, 6)      // bits per pixel
  icoDir.writeUInt32LE(bmpData.length, 8) // size of BMP data
  icoDir.writeUInt32LE(6 + 16, 12) // offset to BMP data

  return Buffer.concat([icoHeader, icoDir, bmpData])
}

const pixels = createBMPData()
const ico = createICO(pixels)

const outPath = new URL('../src/app/favicon.ico', import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')
writeFileSync(outPath, ico)
console.log(`✅ favicon.ico generated (${ico.length} bytes) → ${outPath}`)
