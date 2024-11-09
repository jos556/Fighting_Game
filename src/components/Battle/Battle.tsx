import { useEffect, useState } from 'react';
import { useGameStore } from '@/store/gameStore';
import { stages } from '@/data/stages';
import { Character } from '@/components/Character/Character';
import { CombatSystem } from '@/systems/CombatSystem';
import { CharacterCombatStats, AttackType } from '@/types/combat';
import styles from './Battle.module.css';

export const Battle = () => {
  const { selectedCharacters, setGameState } = useGameStore();
  const [currentStage] = useState(() => stages[Math.floor(Math.random() * stages.length)]);
  const [timeLeft, setTimeLeft] = useState(99);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<'player1' | 'player2' | null>(null);
  
  // 初始化 CombatSystem
  const [combatSystem] = useState(() => new CombatSystem(
    selectedCharacters.player1!.combatStats,
    selectedCharacters.player2!.combatStats
  ));

  // 戰鬥狀態
  const [combatStats, setCombatStats] = useState<{
    player1: CharacterCombatStats;
    player2: CharacterCombatStats;
  }>({
    player1: selectedCharacters.player1!.combatStats,
    player2: selectedCharacters.player2!.combatStats
  });

  // 計時器
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          // 時間到，判定勝負
          const winner = combatStats.player1.health > combatStats.player2.health ? 'player1' : 'player2';
          setWinner(winner);
          setGameOver(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 處理攻擊事件
  const handleAttack = (playerId: 'player1' | 'player2', attackType: AttackType) => {
    if (!combatSystem || gameOver) return;

    // 獲取攻擊前的狀態
    const beforeStats = combatSystem.getStats();
    
    // 執行攻擊並立即獲取新狀態
    const afterStats = combatSystem.getStats();
    
    // 檢查血量變化
    const p1HealthChange = beforeStats.player1.health - afterStats.player1.health;
    const p2HealthChange = beforeStats.player2.health - afterStats.player2.health;
    
    // 更新狀態
    setCombatStats(afterStats);

    console.log('Combat stats updated:', {
      before: beforeStats,
      after: afterStats,
      p1Change: p1HealthChange,
      p2Change: p2HealthChange
    });

    // 如果有傷害，添加視覺效果
    if (p1HealthChange > 0 || p2HealthChange > 0) {
      // 添加傷害數字效果
      const damageNumber = document.createElement('div');
      damageNumber.className = styles.damageNumber;
      damageNumber.textContent = `-${p1HealthChange || p2HealthChange}`;
      damageNumber.style.left = `${playerId === 'player1' ? '60%' : '40%'}`;
      damageNumber.style.top = '40%';
      document.querySelector(`.${styles.battleContainer}`)?.appendChild(damageNumber);
      setTimeout(() => damageNumber.remove(), 500);

      // 添加打擊特效
      const hitEffect = document.createElement('div');
      hitEffect.className = styles.hitEffect;
      hitEffect.style.left = `${playerId === 'player1' ? '60%' : '40%'}`;
      hitEffect.style.top = '50%';
      document.querySelector(`.${styles.battleContainer}`)?.appendChild(hitEffect);
      setTimeout(() => hitEffect.remove(), 300);
    }

    // 檢查是否有人血量歸零
    if (afterStats.player1.health <= 0) {
      setWinner('player2');
      setGameOver(true);
    } else if (afterStats.player2.health <= 0) {
      setWinner('player1');
      setGameOver(true);
    }
  };

  return (
    <div className={styles.battleContainer}>
      <div 
        className={styles.background}
        style={{ backgroundImage: `url(${currentStage.background})` }}
      />
      
      <div className={styles.characters}>
        <Character 
          character={selectedCharacters.player1!}
          isPlayer1={true}
          combatSystem={combatSystem}
          onAttack={(type) => handleAttack('player1', type)}
        />
        
        <Character 
          character={selectedCharacters.player2!}
          isPlayer1={false}
          combatSystem={combatSystem}
          onAttack={(type) => handleAttack('player2', type)}
        />
      </div>

      <div className={styles.ui}>
        {/* 血量條 */}
        <div className={styles.healthBar1}>
          <div 
            className={styles.healthFill} 
            style={{ 
              width: `${(combatStats.player1.health / combatStats.player1.maxHealth) * 100}%` 
            }} 
          />
        </div>
        
        <div className={styles.healthBar2}>
          <div 
            className={styles.healthFill} 
            style={{ 
              width: `${(combatStats.player2.health / combatStats.player2.maxHealth) * 100}%` 
            }} 
          />
        </div>

        {/* 能量條 */}
        <div className={styles.meterBar1}>
          <div 
            className={styles.meterFill} 
            style={{ 
              width: `${(combatStats.player1.meter / combatStats.player1.maxMeter) * 100}%` 
            }} 
          />
        </div>
        
        <div className={styles.meterBar2}>
          <div 
            className={styles.meterFill} 
            style={{ 
              width: `${(combatStats.player2.meter / combatStats.player2.maxMeter) * 100}%` 
            }} 
          />
        </div>

        {/* 計時器 */}
        <div className={styles.timer}>{timeLeft}</div>
      </div>

      {/* 遊戲結束畫面 */}
      {gameOver && (
        <div className={styles.gameOverOverlay}>
          <div className={styles.gameOverContent}>
            <h2>{winner === 'player1' ? 'Player 1 Wins!' : 'Player 2 Wins!'}</h2>
            <button onClick={() => setGameState('select')} className={styles.restartButton}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 