export const Buff2Hex = (buffer: ArrayBuffer): string =>
  [...new Uint8Array(buffer)]
    .map((x) => x.toString(16).padStart(2, '0'))
    .join('')
