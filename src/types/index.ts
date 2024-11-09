// 遊戲狀態
export type GameState = 'menu' | 'characterSelect' | 'battle' | 'result';

// 語言選項
export type Language = 'zh-TW' | 'en-US' | 'ja-JP';

// 角色基本資料
export interface Character {
  id: number;
  name: string;
  description: {
    [key in Language]: string;
  };
  health: number;
  speed: number;
  specialMeterGain: number;
  sprites: {
    idle: string;
    walk: string;
    punch: string;
    kick: string;
    special: string;
    hurt: string;
    victory: string;
  };
  moves: {
    punch: Move;
    kick: Move;
    special: SpecialMove;
  };
}

// 招式定義
export interface Move {
  damage: number;
  frameData: {
    startup: number;
    active: number;
    recovery: number;
  };
  hitbox: {
    width: number;
    height: number;
    offsetX: number;
    offsetY: number;
  };
}

export interface SpecialMove extends Move {
  meterCost: number;
  type: 'projectile' | 'melee';
}

// 遊戲設置
export interface GameSettings {
  language: Language;
  volume: {
    master: number;
    bgm: number;
    sfx: number;
  };
} 