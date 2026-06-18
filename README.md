# Repertoire Plugin

A plugin for Obsidian that renders chord charts written in Nashville-style Arabic numeral notation (e.g. `1`, `4`, `5/7`).

Chord parsing and transposition are powered by [degree-chords](https://www.npmjs.com/package/degree-chords).

## Features

- Write charts using Arabic numerals (`1`, `2`, `5/7`) instead of letter chords
- Set the key (and optional capo) in note frontmatter
- Major and minor keys (`C`, `G`, `Am`, `F# minor`, etc.)
- Altered chords (`b3`, `#4`, `b7`)
- Slash chords (`1/3`, `5/7`)
- Extended qualities (`4maj7`, `57`, `5sus4`, `1add9`)

## Showing Chords

Use a `repertoire` code block:

```repertoire
1 5 6 4
```

In the key of C, this renders as:

**C G Am F**

### Parentheses

Wrap a chord in parentheses for optional or passing chords. The parentheses are preserved in the output.

```repertoire
1 (5/7) 6 4
```

In the key of C:

**C (G/B) Am F**

### Section markers

Lines with section labels in square brackets are styled as headings:

```repertoire
[Verse]
1 4 5 1
```

## Key and Capo

Set the sounding key and capo fret in frontmatter:

```yaml
---
Key: C
Capo: 3
---
```

The header above each block shows the frontmatter values (`Key: C | Capo: 3`). Chords inside the block are transposed to the **fingered shapes** you play with a capo — shapes are shifted down by the capo fret count so the sounding pitch matches the key.

With `Key: C` and `Capo: 3`, `1 2` renders as **A Bm** (not C Dm).

Capo must be an integer from **0 to 11**. Invalid keys or capo values show an error in the block.

### Minor keys

Use compact or spelled minor keys in frontmatter:

```yaml
---
Key: Am
---
```

or

```yaml
---
Key: G minor
---
```

Diatonic defaults follow the natural minor scale unless a quality suffix overrides them (e.g. `2dim`, `4maj7`).

## Supported notation

| Input (in C major) | Output |
| --- | --- |
| `1` | `C` |
| `2`, `2m` | `Dm` |
| `4maj7` | `Fmaj7` |
| `57`, `5dom7` | `G7` |
| `5sus4` | `Gsus4` |
| `1add9` | `Cadd9` |
| `1/3` | `C/E` |
| `b7` | `Bb` |
| `#4` | `F#` |

## Tip: Displaying a whole setlist on a single page

Keep each song in its own note, then embed them in a setlist note with `![[note name]]`.
