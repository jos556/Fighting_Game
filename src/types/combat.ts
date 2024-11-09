export interface AttackData {
  damage: number;
  range: number;
  speed: number;
  meterGain: number;
  hitStun: number;
}

export interface SpecialMoveData extends AttackData {
  meterCost: number;
  type: 'projectile' | 'melee' | 'grab';
  projectileSpeed?: number;
}

export interface CharacterCombatStats {
  health: number;
  maxHealth: number;
  meter: number;
  maxMeter: number;
  attacks: {
    punch: AttackData;
    kick: AttackData;
    special: SpecialMoveData;
  };
}

export type AttackType = 'punch' | 'kick' | 'special';
export type HitDirection = 'left' | 'right';

export interface HitboxData {
  x: number;
  y: number;
  width: number;
  height: number;
  active: boolean;
} 