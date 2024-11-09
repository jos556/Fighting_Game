export interface CharacterProps {
  character: Character;
  isPlayer1: boolean;
  combatSystem: CombatSystem;
  onAttack: (attackType: AttackType) => void;
} 