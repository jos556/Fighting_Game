import { useState, useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'
import { characters } from '@/data/characters'
import SoundManager from '@/utils/SoundManager'
import styles from './CharacterSelect.module.css'

export const CharacterSelect = () => {
  const { settings, setGameState, selectCharacter } = useGameStore()
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null)
  const [hoveredCharacter, setHoveredCharacter] = useState<number | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [aiCharacter, setAiCharacter] = useState<number | null>(null)

  useEffect(() => {
    SoundManager.init();
    SoundManager.setVolume(settings.volume.sfx);
  }, [settings.volume.sfx]);

  const handleCharacterSelect = (charIndex: number) => {
    if (selectedCharacter === charIndex) {
      setSelectedCharacter(null)
      SoundManager.play('cancel')
    } else if (selectedCharacter === null) {
      setSelectedCharacter(charIndex)
      selectCharacter('player1', characters[charIndex])
      SoundManager.play('select')
    }
  }

  const handleCharacterHover = (charIndex: number) => {
    if (hoveredCharacter !== charIndex) {
      setHoveredCharacter(charIndex)
      SoundManager.play('hover')
    }
  }

  const handleConfirm = () => {
    if (selectedCharacter !== null && !isConfirming) {
      setIsConfirming(true)
      SoundManager.play('confirm')
      
      // 隨機選擇AI對手(不能選擇玩家已選的角色)
      const availableOpponents = characters
        .map((_, index) => index)
        .filter(index => index !== selectedCharacter)
      const randomOpponent = availableOpponents[
        Math.floor(Math.random() * availableOpponents.length)
      ]
      
      setAiCharacter(randomOpponent)
      selectCharacter('player2', characters[randomOpponent])
      
      // 1秒後進入戰鬥畫面
      setTimeout(() => setGameState('battle'), 1000)
    }
  }

  const getCharacterPath = (name: string) => {
    const characterMap: { [key: string]: string } = {
      "空手道家": "karate",
      "劍士": "swordsman",
      "法師": "mage",
      "柔道家": "judo",
      "武術家": "kungfu",
      "泰拳手": "muaythai"
    };
    
    return `/characters/${characterMap[name]}/idle.svg`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>選擇你的角色</h2>
      
      {selectedCharacter !== null && !isConfirming && (
        <button 
          className={styles.confirmButton}
          onClick={handleConfirm}
        >
          確認選擇
        </button>
      )}
      
      <div className={styles.characterGrid}>
        {characters.map((char, index) => (
          <div
            key={char.id}
            className={`${styles.characterCard} ${
              selectedCharacter === index ? styles.selectedP1 : ''
            } ${
              aiCharacter === index ? styles.selectedP2 : ''
            }`}
            onClick={() => {
              if (!isConfirming) {
                handleCharacterSelect(index)
              }
            }}
            onMouseEnter={() => handleCharacterHover(index)}
          >
            <div className={styles.characterImage}>
              <img 
                src={getCharacterPath(char.name)}
                alt={char.name}
                className={styles.characterSprite}
              />
            </div>
            <div className={styles.characterInfo}>
              <h3>{char.name}</h3>
              <p>{char.description[settings.language]}</p>
              <div className={styles.stats}>
                <div>生命值: {char.health}</div>
                <div>速度: {char.speed}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.instructions}>
        {selectedCharacter === null ? (
          <p>請選擇你的角色</p>
        ) : !isConfirming ? (
          <p>點擊右上角確認選擇</p>
        ) : aiCharacter !== null ? (
          <p>AI 選擇了 {characters[aiCharacter].name}！準備戰鬥！</p>
        ) : (
          <p>AI 正在選擇...</p>
        )}
      </div>
    </div>
  )
} 