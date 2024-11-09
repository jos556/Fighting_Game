export type CharacterState = 
  | 'idle' 
  | 'walk' 
  | 'jump' 
  | 'fall' 
  | 'crouch'
  | 'crouchWalk';

export interface Position {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

export interface CharacterAnimation {
  state: CharacterState;
  direction: 'left' | 'right';
  position: Position;
  isGrounded: boolean;
} 