export const MAJOR_KEYS: { [key: string]: { [key: string]: string } } = {
  C: { i: "C", ii: "Dm", iii: "Em", iv: "F", v: "G", vi: "Am", vii: "Bdim" },
  G: { i: "G", ii: "Am", iii: "Bm", iv: "C", v: "D", vi: "Em", vii: "F#dim" },
  D: { i: "D", ii: "Em", iii: "F#m", iv: "G", v: "A", vi: "Bm", vii: "C#dim" },
  A: { i: "A", ii: "Bm", iii: "C#m", iv: "D", v: "E", vi: "F#m", vii: "G#dim" },
  E: { i: "E", ii: "F#m", iii: "G#m", iv: "A", v: "B", vi: "C#m", vii: "D#dim" },
  B: { i: "B", ii: "C#m", iii: "D#m", iv: "E", v: "F#", vi: "G#m", vii: "A#dim" },
  "F#": { i: "F#", ii: "G#m", iii: "A#m", iv: "B", v: "C#", vi: "D#m", vii: "E#dim" },
  Gb: { i: "Gb", ii: "Abm", iii: "Bbm", iv: "Cb", v: "Db", vi: "Ebm", vii: "Fdim" },
  Db: { i: "Db", ii: "Ebm", iii: "Fm", iv: "Gb", v: "Ab", vi: "Bbm", vii: "Cdim" },
  Ab: { i: "Ab", ii: "Bbm", iii: "Cm", iv: "Db", v: "Eb", vi: "Fm", vii: "Gdim" },
  Eb: { i: "Eb", ii: "Fm", iii: "Gm", iv: "Ab", v: "Bb", vi: "Cm", vii: "Ddim" },
  Bb: { i: "Bb", ii: "Cm", iii: "Dm", iv: "Eb", v: "F", vi: "Gm", vii: "Adim" },
  F: { i: "F", ii: "Gm", iii: "Am", iv: "Bb", v: "C", vi: "Dm", vii: "Edim" },
};

export const CHROMATIC_SCALE = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

export const MAJOR_SCALE_INTERVALS = [0, 2, 4, 5, 7, 9, 11]; // W-W-H-W-W-W-H

export const DIATONIC_CHORD_QUALITIES = ["", "m", "m", "", "", "m", "dim"];

export const ARABIC_NUMERAL_TO_DEGREE: { [key: string]: number } = {
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
};
