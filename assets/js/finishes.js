/* ==========================================================================
   The dye rack — one source of truth for every finish.

   Each entry carries the chip colour, the text ink that clears 4.5:1 on the
   plate, the PBR values the 3D viewer renders, and the real spec rows the
   stamp shows. Picking a chip changes all four at once.
   ========================================================================== */
window.__FINISHES = {
  natural: {
    label: 'Bead blast', code: 'BB',
    process: 'Glass bead, as-machined', ra: '1.6',
    chip: '#c3cacd', ink: '#d4d9dc',
    color: 0xb9bec2, metalness: 0.96, roughness: 0.56,
    edge: 0.42, edgeColor: 0x262b2f,
  },
  clear: {
    label: 'Clear anodize', code: 'AN-2C',
    process: 'Anodize Type II, clear', ra: '0.8',
    chip: '#9fb0ba', ink: '#bcccd4',
    color: 0xc6ced3, metalness: 0.92, roughness: 0.34,
    edge: 0.42, edgeColor: 0x272f35,
  },
  black: {
    label: 'Hardcoat black', code: 'AN-3K',
    process: 'Anodize Type III, hardcoat', ra: '1.2',
    chip: '#2a2d30', ink: '#b9bfc3',
    color: 0x232629, metalness: 0.52, roughness: 0.66,
    edge: 0.34, edgeColor: 0xc9d4da,
  },
  gold: {
    label: 'Gold dye', code: 'AN-2G',
    process: 'Anodize Type II, gold dye', ra: '0.8',
    chip: '#d99a2b', ink: '#f0b955',
    color: 0xb8892f, metalness: 0.92, roughness: 0.38,
    edge: 0.46, edgeColor: 0x4a3208,
  },
  red: {
    label: 'Red dye', code: 'AN-2R',
    process: 'Anodize Type II, red dye', ra: '0.8',
    chip: '#c93c2b', ink: '#f2705c',
    color: 0x9c3a2c, metalness: 0.90, roughness: 0.40,
    edge: 0.46, edgeColor: 0x3d0f08,
  },
  blue: {
    label: 'Blue dye', code: 'AN-2B',
    process: 'Anodize Type II, blue dye', ra: '0.8',
    chip: '#2f79d8', ink: '#6faaf5',
    color: 0x2b5a9e, metalness: 0.90, roughness: 0.40,
    edge: 0.46, edgeColor: 0x08183d,
  },
  violet: {
    label: 'Violet dye', code: 'AN-2V',
    process: 'Anodize Type II, violet dye', ra: '0.8',
    chip: '#8a52d6', ink: '#b591f0',
    color: 0x63419e, metalness: 0.90, roughness: 0.42,
    edge: 0.46, edgeColor: 0x1f0a3d,
  },
  olive: {
    label: 'Olive dye', code: 'AN-2O',
    process: 'Anodize Type II, olive dye', ra: '0.8',
    chip: '#6f9a3a', ink: '#a8cf6a',
    color: 0x5b7434, metalness: 0.90, roughness: 0.42,
    edge: 0.46, edgeColor: 0x152106,
  },
};
