import {
  ARABIC_NUMERAL_TO_DEGREE,
  CHROMATIC_SCALE,
  DIATONIC_CHORD_QUALITIES,
  MAJOR_SCALE_INTERVALS,
} from "./constants";

function getNote(key: string, degree: number, accidental: number): string {
  const keyRootIndex = CHROMATIC_SCALE.indexOf(key);
  if (keyRootIndex === -1) return "Invalid Key";

  const interval = MAJOR_SCALE_INTERVALS[degree - 1];
  const noteIndex = (keyRootIndex + interval + accidental + 12) % 12;
  return CHROMATIC_SCALE[noteIndex];
}

function parseNumber(numberStr: string): {
  baseNumeral: string;
  accidental: number;
  suffix: string;
} | null {
  let remaining = numberStr;
  let accidental = 0;

  if (remaining.startsWith("b")) {
    accidental = -1;
    remaining = remaining.substring(1);
  } else if (remaining.startsWith("#")) {
    accidental = 1;
    remaining = remaining.substring(1);
  }

  // Check for Arabic numerals (1-7)
  const arabicNumerals = ["1", "2", "3", "4", "5", "6", "7"];
  for (const an of arabicNumerals) {
    if (remaining.startsWith(an)) {
      const baseNumeral = an;
      const suffix = remaining.substring(an.length);
      return { baseNumeral, accidental, suffix };
    }
  }

  return null;
}

// This function will handle a single, non-slash chord numeral
function getSingleChord(key: string, numberStr: string): string | null {
  const parsed = parseNumber(numberStr);
  if (!parsed) return null;

  const { baseNumeral, accidental, suffix } = parsed;

  const degree = ARABIC_NUMERAL_TO_DEGREE[baseNumeral];

  if (!degree) return null;

  const chordRoot = getNote(key, degree, accidental);
  let quality = "";

  // For Arabic numerals, if no suffix is provided, infer from the diatonic scale.
  // Suffixes like 'm', 'dim', 'aug' will be appended later.
  if (!suffix) {
    quality = DIATONIC_CHORD_QUALITIES[degree - 1];
  }

  // Special case for b7 in major key, which is a major chord
  if (accidental === -1 && degree === 7) {
    quality = "";
  }

  return `${chordRoot}${quality}${suffix}`;
}

// This is the main exported function
export function getChordFromNumber(key: string, numberStr: string): string | null {
  if (numberStr.includes("/")) {
    const [chordPart, bassPart] = numberStr.split("/");
    const chord = getSingleChord(key, chordPart);

    const bass = getSingleChord(key, bassPart);
    if (chord && bass) {
      const bassNote = bass.match(/^[A-G][b#]?/);
      if (bassNote) {
        return `${chord}/${bassNote[0]}`;
      }
    }
    return null;
  }

  return getSingleChord(key, numberStr);
}
