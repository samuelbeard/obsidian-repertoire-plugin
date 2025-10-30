import { CHROMATIC_SCALE } from "./constants";

const transposeKey = (key: string, semitones: number): string | null => {
  const upperKey = key.toUpperCase();
  let keyIndex = -1;

  // Handle enharmonic equivalents for finding the index
  if (upperKey === "F#") {
    keyIndex = CHROMATIC_SCALE.indexOf("Gb");
  } else if (upperKey === "C#") {
    keyIndex = CHROMATIC_SCALE.indexOf("Db");
  } else {
    keyIndex = CHROMATIC_SCALE.indexOf(key);
  }

  if (keyIndex === -1) {
    // Try to find a match for flat keys if the simple lookup fails
    const flatMap: { [key: string]: string } = {
      BB: "Bb",
      EB: "Eb",
      AB: "Ab",
      DB: "Db",
      GB: "Gb",
    };
    const mappedKey = flatMap[upperKey];
    if (mappedKey) {
      keyIndex = CHROMATIC_SCALE.indexOf(mappedKey);
    }
  }

  if (keyIndex === -1) {
    return null; // Key not found
  }

  const transposedIndex = (keyIndex - semitones + 12) % 12;
  return CHROMATIC_SCALE[transposedIndex];
};

export default transposeKey;
