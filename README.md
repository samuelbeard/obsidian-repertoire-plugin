# Obsidian Repertoire Plugin
A plugin for Obsidian that allows you to write chord charts using Roman numeral notation.

## Features
- Write chord charts using Arabic numeral (e.g., `1`, `2`, `5/7`) notation.
- Change the key of the chord chart easily using frontmatter.
- Supports altered chords (e.g., b3, #4).
- Supports slash chords (e.g., 1/5, 2/3).

## Showing Chords
To show chords, use the code block type `repertoire`:

```repertoire
1 5 6 4
```

This will render as:
`C G Am F` (assuming the key is C)

### Parentheses
You can wrap a chord in parentheses to indicate an optional or passing chord. The parentheses will be rendered with the chord.

```repertoire
1 (5/7) 6 4
```

This will render as:
`C (G/B) Am F` (assuming the key is C)

## Key and Capo
You can set the key and capo in the frontmatter of your note:
```
---
Key: G
Capo: 2
---
```
This will render the chords in the key of G, but if you have a capo on the 2nd fret, it will display the chords as if they were in the key of A.

## Tip: Displaying a whole setlist on a single page
The best way to display multiple songs on a single page is to keep each song in its own note, then create a new note that links to each song. Use the `![[note name]]` syntax to embed each note into the setlist note.
