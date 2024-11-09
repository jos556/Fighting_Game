import { useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import styles from './Menu.module.css';

export const Menu = () => {
  const { settings, updateSettings, setGameState } = useGameStore();
  
  return (
    <div className={styles.menu}>
      <h1 className={styles.title}>格鬥遊戲</h1>
      
      <div className={styles.settings}>
        <div className={styles.languageSelect}>
          <h3>語言選擇</h3>
          <select
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value as any })}
          >
            <option value="zh-TW">繁體中文</option>
            <option value="en-US">English</option>
            <option value="ja-JP">日本語</option>
          </select>
        </div>
        
        <div className={styles.volumeControls}>
          <h3>音量設定</h3>
          <div>
            <label>主音量</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume.master}
              onChange={(e) => 
                updateSettings({
                  volume: {
                    ...settings.volume,
                    master: parseFloat(e.target.value),
                  },
                })
              }
            />
          </div>
          <div>
            <label>背景音樂</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume.bgm}
              onChange={(e) =>
                updateSettings({
                  volume: {
                    ...settings.volume,
                    bgm: parseFloat(e.target.value),
                  },
                })
              }
            />
          </div>
          <div>
            <label>音效</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.volume.sfx}
              onChange={(e) =>
                updateSettings({
                  volume: {
                    ...settings.volume,
                    sfx: parseFloat(e.target.value),
                  },
                })
              }
            />
          </div>
        </div>
      </div>
      
      <button
        className={styles.startButton}
        onClick={() => setGameState('characterSelect')}
      >
        開始遊戲
      </button>
    </div>
  );
}; 