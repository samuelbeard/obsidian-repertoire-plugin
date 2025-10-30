import { MarkdownView, Plugin } from "obsidian";
import { getChordFromNumber } from "./lib/chordParser";
import transposeKey from "./lib/transposeKey";
import { RepertoireSettingTab } from "./lib/settings";

interface RepertoirePluginSettings {
  showKeyInBlock?: boolean;
}

const DEFAULT_SETTINGS: Partial<RepertoirePluginSettings> = {
  showKeyInBlock: true,
};

export default class ObsidianRepertoirePlugin extends Plugin {
  settings: RepertoirePluginSettings;

  async onload() {
    await this.loadSettings();
    this.addSettingTab(new RepertoireSettingTab(this.app, this));

    this.registerMarkdownCodeBlockProcessor("repertoire", (source, el, ctx) => {
      el.style.fontFamily = "var(--font-monospace)";
      el.empty();

      const fileCache = this.app.metadataCache.getCache(ctx.sourcePath);
      const key = fileCache?.frontmatter?.Key || "C";
      const capo = fileCache?.frontmatter?.Capo || 0;

      let displayKey = key;
      if (capo > 0 && capo <= 12) {
        const transposed = transposeKey(key, capo);
        if (transposed) {
          displayKey = transposed;
        } else {
          const errorEl = el.createDiv();
          errorEl.createEl("strong", {
            text: `Error: Could not transpose key "${key}"`,
          });
          errorEl.style.color = "var(--text-error)";
          return;
        }
      }

      const infoEl = el.createDiv();
      infoEl.style.marginBottom = "1em";
      infoEl.style.opacity = "0.7";
      infoEl.style.fontSize = "0.9em";

      let infoText = `Key: ${key}`;
      if (capo > 0) {
        infoText += ` | Capo: ${capo}`;
      }
      if (this.settings.showKeyInBlock) {
        infoEl.setText(infoText);
      }

      const lines = source.split("\n");
      lines.forEach((line) => {
        const lineEl = el.createDiv();
        lineEl.style.whiteSpace = "pre"; // Preserve whitespace

        if (line.trim() === "") {
          lineEl.createEl("br");
          return;
        }

        // Use match to get an array of non-whitespace and whitespace parts
        const parts = line.match(/(\s+)|(\S+)/g) || [];

        parts.forEach((part) => {
          const hasParen = part.startsWith("(") && part.endsWith(")");
          const cleanWord = part.replace(/[.,!$%^&*;:{}=\-_`~()]/g, "");
          const chord = getChordFromNumber(displayKey, cleanWord);

          if (chord) {
            const chordEl = lineEl.createEl("strong");
            chordEl.style.color = "var(--text-accent)";

            // Regex to separate the root chord from the suffix
            const match = chord.match(/^([A-G][b#]?(?:m|dim|aug)?)(.*)/);

            if (match && !chord.includes("/")) {
              const [, root, suffix] = match;
              if (hasParen) chordEl.appendText("(");
              chordEl.appendText(root);
              if (suffix) {
                chordEl.createEl("sup", { text: suffix });
              }
              if (hasParen) chordEl.appendText(")");
            } else {
              // Fallback for slash chords or non-standard chords
              chordEl.setText(hasParen ? `(${chord})` : chord);
            }
          } else if (part.startsWith("[") && part.endsWith("]")) {
            const sectionText = part.substring(1, part.length - 1);
            const sectionEl = lineEl.createEl("strong");
            sectionEl.createEl("em", { text: sectionText });
            sectionEl.style.opacity = "0.7";
          } else {
            lineEl.appendText(part);
          }
        });
      });
    });

    this.registerEvent(
      this.app.metadataCache.on("changed", (file) => {
        const leaves = this.app.workspace.getLeavesOfType("markdown");
        for (const leaf of leaves) {
          if (leaf.view instanceof MarkdownView && leaf.view.file?.path === file.path) {
            // Force the view to reload, which will re-run the code block processor
            leaf.view.previewMode.rerender(true);
          }
        }
      })
    );
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
    this.rerenderAllMarkdownViews();
  }

  rerenderAllMarkdownViews() {
    const leaves = this.app.workspace.getLeavesOfType("markdown");
    for (const leaf of leaves) {
      if (leaf.view instanceof MarkdownView) {
        // Force the view to reload, which will re-run the code block processor
        leaf.view.previewMode.rerender(true);
      }
    }
  }
}
