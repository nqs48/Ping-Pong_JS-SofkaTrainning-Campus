import { SKINS, paint_skin } from "./ball.skins.js";
import { DEFAULT_SETTINGS } from "../Model/settings.model.js";

const PREVIEW_SIZE = 56;


export class SettingsView {

  constructor(root, settings, onChange){
    this.settings = settings;
    this.onChange = onChange;
    this.speed = root.querySelector("#speed");
    this.speed_value = root.querySelector("#speed_value");
    this.size_buttons = [...root.querySelectorAll("[data-size]")];
    this.skins_container = root.querySelector("#skins");
    this.reset = root.querySelector("#settings_reset");
    this.previews = [];

    this.build_skins();
    this.bind();
    this.sync();
  }

  build_skins(){
    for (let [key, skin] of Object.entries(SKINS)) {
      let button = document.createElement("button");
      button.type = "button";
      button.className = "skin_option";
      button.dataset.skin = key;

      let canvas = document.createElement("canvas");
      canvas.width = canvas.height = PREVIEW_SIZE;
      let label = document.createElement("span");
      label.textContent = skin.label;

      button.append(canvas, label);
      this.skins_container.append(button);
      this.previews.push({ skin, ctx: canvas.getContext("2d") });
    }
    this.skin_buttons = [...this.skins_container.children];
  }

  bind(){
    this.speed.addEventListener("input", () => this.update({ speed: Number(this.speed.value) }));
    //release focus so the keyboard goes back to the game
    this.speed.addEventListener("change", () => this.speed.blur());

    this.reset.addEventListener("click", () => {
      this.update({ ...DEFAULT_SETTINGS });
      this.reset.blur();
    });

    for (let button of this.size_buttons) {
      button.addEventListener("click", () => {
        this.update({ size: Number(button.dataset.size) });
        button.blur();
      });
    }

    for (let button of this.skin_buttons) {
      button.addEventListener("click", () => {
        this.update({ skin: button.dataset.skin });
        button.blur();
      });
    }
  }

  update(changes){
    Object.assign(this.settings, changes);
    this.sync();
    this.onChange(this.settings);
  }

  sync(){
    this.speed.value = this.settings.speed;
    this.speed_value.textContent = this.settings.speed;
    for (let button of this.size_buttons) {
      button.setAttribute("aria-pressed", Number(button.dataset.size) === this.settings.size);
    }
    for (let button of this.skin_buttons) {
      button.setAttribute("aria-pressed", button.dataset.skin === this.settings.skin);
    }
  }

  draw_previews(t){
    let center = PREVIEW_SIZE / 2;
    for (let { skin, ctx } of this.previews) {
      ctx.clearRect(0, 0, PREVIEW_SIZE, PREVIEW_SIZE);
      paint_skin(ctx, skin, center, center, 16, t / 700, t, 8);
    }
  }
}
