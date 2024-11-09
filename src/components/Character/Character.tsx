import { useEffect, useState } from 'react';
import { CharacterAnimation, CharacterState, Position } from '@/types/animation';
import { AttackType } from '@/types/combat';
import { CharacterProps } from '@/types/props';
import styles from './Character.module.css';

export const Character = ({ character, isPlayer1, combatSystem, onAttack }: CharacterProps) => {
  const [animation, setAnimation] = useState<CharacterAnimation>({
    state: 'idle',
    direction: isPlayer1 ? 'right' : 'left',
    position: {
      x: isPlayer1 ? 200 : 1600,
      y: 400,
      velocityX: 0,
      velocityY: 0
    },
    isGrounded: true
  });

  const MOVEMENT_SPEED = 5;
  const JUMP_FORCE = -15;
  const GRAVITY = 0.8;
  const GROUND_Y = 400;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 玩家控制
  useEffect(() => {
    if (isPlayer1) {
      const keys = new Set<string>();
      
      const handleKeyDown = (e: KeyboardEvent) => {
        const key = e.key.toLowerCase();
        keys.add(key);
        
        // 攻擊處理
        switch (key) {
          case 'f':
            console.log('F key pressed - Normal attack');
            handleAttack('punch');
            break;
          case 'g':
            console.log('G key pressed - Strong attack');
            handleAttack('kick');
            break;
          case 'h':
            console.log('H key pressed - Special attack');
            if (combatSystem) {
              const stats = combatSystem.getStats();
              const playerStats = isPlayer1 ? stats.player1 : stats.player2;
              if (playerStats.meter >= 100) {
                handleAttack('special');
              }
            }
            break;
        }
      };
      
      const handleKeyUp = (e: KeyboardEvent) => {
        keys.delete(e.key.toLowerCase());
      };

      // 移動更新循環
      const updatePlayer = () => {
        setAnimation(prev => {
          const newState = { ...prev };
          const pos = { ...prev.position };

          // 移動控制
          if (keys.has('d')) {
            pos.velocityX = MOVEMENT_SPEED;
            newState.direction = 'right';
            if (!['punch', 'kick', 'special'].includes(prev.state)) {
              newState.state = prev.isGrounded ? 'walk' : prev.state;
            }
          } else if (keys.has('a')) {
            pos.velocityX = -MOVEMENT_SPEED;
            newState.direction = 'left';
            if (!['punch', 'kick', 'special'].includes(prev.state)) {
              newState.state = prev.isGrounded ? 'walk' : prev.state;
            }
          } else {
            pos.velocityX = 0;
            if (!['punch', 'kick', 'special', 'jump', 'fall'].includes(prev.state)) {
              newState.state = 'idle';
            }
          }

          // 跳躍控制
          if (keys.has('w') && prev.isGrounded) {
            pos.velocityY = JUMP_FORCE;
            newState.isGrounded = false;
            newState.state = 'jump';
          }

          // 更新位置
          pos.x += pos.velocityX;
          pos.x = Math.max(0, Math.min(pos.x, screenWidth - 100));

          pos.y += pos.velocityY;
          if (!prev.isGrounded) {
            pos.velocityY += GRAVITY;
            if (pos.velocityY > 0 && prev.state === 'jump') {
              newState.state = 'fall';
            }
          }

          if (pos.y >= GROUND_Y) {
            pos.y = GROUND_Y;
            pos.velocityY = 0;
            newState.isGrounded = true;
            if (newState.state === 'jump' || newState.state === 'fall') {
              newState.state = 'idle';
            }
          }

          newState.position = pos;
          return newState;
        });
      };

      const gameLoop = setInterval(updatePlayer, 1000 / 60);

      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        clearInterval(gameLoop);
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
  }, [isPlayer1, combatSystem, screenWidth]);

  // AI 控制邏輯
  useEffect(() => {
    if (!isPlayer1 && combatSystem) {
      let lastActionTime = Date.now();
      const AI_ACTION_INTERVAL = 500; // 降低到 0.5 秒
      const AI_ATTACK_CHANCE = 0.6;   // 提高攻擊機率
      const AI_MOVE_CHANCE = 0.8;     // 提高移動機率

      const aiLoop = setInterval(() => {
        const currentTime = Date.now();
        if (currentTime - lastActionTime < AI_ACTION_INTERVAL) return;

        setAnimation(prev => {
          const newState = { ...prev };
          const pos = { ...prev.position };
          const action = Math.random();

          // AI 決策
          if (action < AI_ATTACK_CHANCE) {
            // 選擇攻擊類型
            const attackRoll = Math.random();
            let attackType: AttackType;
            
            if (attackRoll < 0.6) {
              attackType = 'punch';  // 60% 機率普通攻擊
            } else if (attackRoll < 0.9) {
              attackType = 'kick';   // 30% 機率使用 G 鍵攻擊
            } else {
              attackType = 'special'; // 10% 機率使用大招
            }

            handleAttack(attackType);
            lastActionTime = currentTime;
          } else if (action < AI_MOVE_CHANCE) {
            // 隨機選擇新的目標位置
            const targetX = Math.random() * (screenWidth - 300) + 150;
            
            // 向目標移動
            if (pos.x < targetX) {
              pos.velocityX = MOVEMENT_SPEED;
              newState.direction = 'right';
              newState.state = 'walk';
            } else {
              pos.velocityX = -MOVEMENT_SPEED;
              newState.direction = 'left';
              newState.state = 'walk';
            }

            // 更新位置
            pos.x += pos.velocityX;
            pos.x = Math.max(100, Math.min(pos.x, screenWidth - 200));
          } else {
            // 待機
            pos.velocityX = 0;
            if (!['punch', 'kick', 'special'].includes(prev.state)) {
              newState.state = 'idle';
            }
          }

          newState.position = pos;
          return newState;
        });
      }, 50); // 更頻繁檢查 AI 狀態

      return () => clearInterval(aiLoop);
    }
  }, [isPlayer1, combatSystem, screenWidth]);

  // 處理攻擊
  const handleAttack = (attackType: AttackType) => {
    if (!combatSystem) return;

    // 設置攻擊動畫
    setAnimation(prev => ({
      ...prev,
      state: attackType
    }));

    // 執行攻擊判定
    const result = combatSystem.handleAttack(
      isPlayer1 ? 'player1' : 'player2',
      attackType,
      animation.position,
      animation.direction
    );

    // 如果攻擊成功，通知父組件更新 UI
    if (result.damage > 0) {
      console.log('Attack hit:', { attackType, damage: result.damage });
      onAttack(attackType);
    }

    // 設置攻擊動畫時間
    const animationDuration = {
      punch: 300,
      kick: 400,
      special: 800
    }[attackType];

    // 攻擊動畫結束後恢復待機狀態
    setTimeout(() => {
      setAnimation(prev => ({
        ...prev,
        state: prev.isGrounded ? 'idle' : prev.state
      }));
    }, animationDuration);
  };

  return (
    <div 
      className={styles.character}
      style={{
        transform: `translate(${animation.position.x}px, ${animation.position.y}px) 
                   scaleX(${animation.direction === 'left' ? -1 : 1})`,
      }}
    >
      <div 
        className={`${styles.characterSprite} ${styles[animation.state]}`}
        key={`${animation.state}-${Date.now()}`}
      >
        <img 
          src={character.sprites[animation.state]}
          alt={character.name}
          className={styles.sprite}
        />
      </div>
    </div>
  );
};