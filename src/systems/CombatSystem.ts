import { CharacterCombatStats, AttackType, HitboxData, HitDirection } from '@/types/combat';

export class CombatSystem {
  private player1Stats: CharacterCombatStats;
  private player2Stats: CharacterCombatStats;

  constructor(p1Stats: CharacterCombatStats, p2Stats: CharacterCombatStats) {
    this.player1Stats = { ...p1Stats };
    this.player2Stats = { ...p2Stats };
  }

  handleAttack(
    attackerId: 'player1' | 'player2',
    attackType: AttackType,
    position: { x: number; y: number },
    direction: HitDirection
  ): { success: boolean; damage: number } {
    // 1. 獲取攻擊者和防守者
    const attacker = attackerId === 'player1' ? this.player1Stats : this.player2Stats;
    const defender = attackerId === 'player1' ? this.player2Stats : this.player1Stats;

    // 2. 設置攻擊數值
    let damage = 0;
    let hitRange = 0;

    switch (attackType) {
      case 'punch':  // F鍵普通攻擊
        damage = 50;
        hitRange = 60;  // 調整為 60
        break;
      case 'kick':   // G鍵攻擊 (保持不變)
        damage = 80;
        hitRange = 100;
        break;
      case 'special': // H鍵大招 (保持不變)
        if (attacker.meter >= 100) {
          damage = 300;
          hitRange = 150;
        } else {
          console.log('Attack failed: Not enough meter');
          return { success: true, damage: 0 };
        }
        break;
    }

    // 3. 計算距離和方向
    const attackerX = position.x;
    const defenderX = attackerId === 'player1' ? attackerX + 50 : attackerX - 50; // 調整為 50
    const distance = Math.abs(defenderX - attackerX);

    // 4. 檢查方向 (普通攻擊時放寬方向判定)
    let isDirectionCorrect = false;
    if (attackType === 'punch') {
      // 普通攻擊時只要大致方向正確即可
      isDirectionCorrect = attackerId === 'player1' ?
        (defenderX > attackerX) :  // 玩家1的目標在右邊即可
        (defenderX < attackerX);   // 玩家2的目標在左邊即可
    } else {
      // 其他攻擊保持原有的嚴格方向判定
      isDirectionCorrect = attackerId === 'player1' ?
        (direction === 'right' && defenderX > attackerX) :
        (direction === 'left' && defenderX < attackerX);
    }

    // 5. 判定命中
    if (distance <= hitRange && isDirectionCorrect) {
      // 扣血
      const oldHealth = defender.health;
      defender.health = Math.max(0, defender.health - damage);

      // 增加能量
      if (attackType === 'special') {
        attacker.meter = 0;
      } else {
        attacker.meter = Math.min(attacker.maxMeter, attacker.meter + 10);
      }

      console.log('Attack hit!', {
        type: attackType,
        damage,
        oldHealth,
        newHealth: defender.health
      });

      return { success: true, damage };
    }

    console.log('Attack missed:', {
      type: attackType,
      direction,
      isDirectionCorrect,
      distance,
      hitRange
    });

    return { success: true, damage: 0 };
  }

  getStats(): { player1: CharacterCombatStats; player2: CharacterCombatStats } {
    return {
      player1: { ...this.player1Stats },
      player2: { ...this.player2Stats }
    };
  }
} 