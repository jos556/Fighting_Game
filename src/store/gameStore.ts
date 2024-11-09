import { create } from 'zustand';
import { GameState, Language, GameSettings, Character } from '@/types';

interface GameStore {
  // 遊戲狀態
  currentState: GameState;
  setGameState: (state: GameState) => void;
  
  // 遊戲設置
  settings: GameSettings;
  updateSettings: (settings: Partial<GameSettings>) => void;
  
  // 角色選擇
  selectedCharacters: {
    player1: Character | null;
    player2: Character | null;
  };
  selectCharacter: (player: 'player1' | 'player2', character: Character) => void;
  
  // 戰鬥狀態
  battleState: {
    player1Health: number;
    player2Health: number;
    player1Meter: number;
    player2Meter: number;
  };
  updateBattleState: (state: Partial<typeof initialState.battleState>) => void;
}

const initialState = {
  currentState: 'menu' as GameState,
  settings: {
    language: 'zh-TW' as Language,
    volume: {
      master: 1,
      bgm: 0.8,
      sfx: 0.8,
    },
  },
  selectedCharacters: {
    player1: null,
    player2: null,
  },
  battleState: {
    player1Health: 100,
    player2Health: 100,
    player1Meter: 0,
    player2Meter: 0,
  },
};

export const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  
  setGameState: (state) => set({ currentState: state }),
  
  updateSettings: (newSettings) => 
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),
    
  selectCharacter: (player, character) =>
    set((state) => ({
      selectedCharacters: {
        ...state.selectedCharacters,
        [player]: character,
      },
    })),
    
  updateBattleState: (newState) =>
    set((state) => ({
      battleState: { ...state.battleState, ...newState },
    })),
})); 