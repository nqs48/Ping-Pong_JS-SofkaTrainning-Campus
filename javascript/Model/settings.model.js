const STORAGE_KEY = "volley-pong-settings";

export const DEFAULT_SETTINGS = {
  speed: 4,
  size: 10,
  skin: "classic",
};

export class SettingsModel {

  constructor(){
    Object.assign(this, DEFAULT_SETTINGS, this.load());
  }

  load(){
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }

  save(){
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        speed: this.speed,
        size: this.size,
        skin: this.skin,
      }));
    } catch {
      //storage not available (private mode), settings just won't persist
    }
  }
}
