class SoundManager {
  private static sounds: { [key: string]: HTMLAudioElement } = {
    select: new Audio('/sounds/select.mp3'),
    hover: new Audio('/sounds/hover.mp3'),
    confirm: new Audio('/sounds/confirm.mp3'),
    cancel: new Audio('/sounds/cancel.mp3'),
  };

  private static volume = 1.0;

  static init() {
    // 預加載所有音效
    Object.values(this.sounds).forEach(sound => {
      sound.load();
    });
  }

  static setVolume(volume: number) {
    this.volume = volume;
    Object.values(this.sounds).forEach(sound => {
      sound.volume = volume;
    });
  }

  static play(soundName: keyof typeof SoundManager.sounds) {
    const sound = this.sounds[soundName];
    if (sound) {
      sound.currentTime = 0; // 重置音效播放位置
      sound.play().catch(error => {
        console.warn('Sound play failed:', error);
      });
    }
  }
}

export default SoundManager; 