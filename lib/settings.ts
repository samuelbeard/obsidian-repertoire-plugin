import ObsidianRepertoirePlugin from "../main";
import { App, PluginSettingTab, Setting } from "obsidian";

export class RepertoireSettingTab extends PluginSettingTab {
  plugin: ObsidianRepertoirePlugin;

  constructor(app: App, plugin: ObsidianRepertoirePlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Show Key in Block")
      .setDesc(
        "Show the key and capo information above the chord chart. This helps when referenceing charts in other notes."
      )
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.showKeyInBlock ?? true).onChange(async (value) => {
          this.plugin.settings.showKeyInBlock = value;
          await this.plugin.saveSettings();
        })
      );
  }
}
