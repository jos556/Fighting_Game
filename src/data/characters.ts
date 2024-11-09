import { Character, AttackData, SpecialMoveData } from '@/types'

export const characters: Character[] = [
  {
    id: 1,
    name: "空手道家",
    description: {
      "zh-TW": "專精於快速打擊和防禦的空手道家，擅長近距離連續技。",
      "en-US": "Karate master specializing in quick strikes and defense.",
      "ja-JP": "素早い攻撃と防御を得意とする空手家。",
    },
    health: 1000,
    speed: 8,
    specialMeterGain: 10,
    sprites: {
      idle: "/characters/karate/idle.svg",
      walk: "/characters/karate/walk.svg",
      punch: "/characters/karate/punch.svg",
      kick: "/characters/karate/kick.svg",
      special: "/characters/karate/special.svg",
      hurt: "/characters/karate/hurt.svg",
      victory: "/characters/karate/victory.svg",
    },
    moves: {
      punch: {
        damage: 50,
        frameData: { startup: 5, active: 3, recovery: 8 },
        hitbox: { width: 50, height: 30, offsetX: 40, offsetY: 0 },
      },
      kick: {
        damage: 70,
        frameData: { startup: 8, active: 5, recovery: 12 },
        hitbox: { width: 60, height: 40, offsetX: 50, offsetY: 20 },
      },
      special: {
        damage: 150,
        frameData: { startup: 15, active: 10, recovery: 20 },
        hitbox: { width: 100, height: 60, offsetX: 60, offsetY: 0 },
        meterCost: 50,
        type: 'melee',
      },
    },
    combatStats: {
      health: 1000,
      maxHealth: 1000,
      meter: 0,
      maxMeter: 100,
      attacks: {
        punch: {
          damage: 50,
          range: 60,
          speed: 5,
          meterGain: 10,
          hitStun: 10
        } as AttackData,
        kick: {
          damage: 70,
          range: 80,
          speed: 8,
          meterGain: 15,
          hitStun: 15
        } as AttackData,
        special: {
          damage: 200,
          range: 100,
          speed: 15,
          meterGain: 0,
          meterCost: 100,
          hitStun: 30,
          type: 'melee'
        } as SpecialMoveData
      }
    }
  },
  {
    id: 2,
    name: "劍士",
    description: {
      "zh-TW": "使用日本武士刀的劍術高手，擅長中距離戰鬥和快速斬擊。",
      "en-US": "Swordsman with mastery of the katana.",
      "ja-JP": "日本刀の達人、中距離戦闘が得意。",
    },
    health: 950,
    speed: 7,
    specialMeterGain: 8,
    sprites: {
      idle: "/characters/swordsman/idle.svg",
      walk: "/characters/swordsman/idle.svg",
      jump: "/characters/swordsman/jump.svg",
      fall: "/characters/swordsman/fall.svg",
      crouch: "/characters/swordsman/crouch.svg",
      punch: "/characters/swordsman/slash.svg",
      kick: "/characters/swordsman/thrust.svg",
      special: "/characters/swordsman/special.svg",
      hurt: "/characters/swordsman/hurt.svg",
      victory: "/characters/swordsman/victory.svg",
    },
    moves: {
      punch: {
        damage: 60,
        frameData: { startup: 6, active: 4, recovery: 10 },
        hitbox: { width: 70, height: 30, offsetX: 50, offsetY: 0 },
      },
      kick: {
        damage: 80,
        frameData: { startup: 10, active: 6, recovery: 14 },
        hitbox: { width: 80, height: 30, offsetX: 60, offsetY: 10 },
      },
      special: {
        damage: 180,
        frameData: { startup: 18, active: 12, recovery: 25 },
        hitbox: { width: 120, height: 50, offsetX: 70, offsetY: 0 },
        meterCost: 60,
        type: 'melee',
      },
    },
    combatStats: {
      health: 950,
      maxHealth: 950,
      meter: 0,
      maxMeter: 80,
      attacks: {
        punch: {
          damage: 60,
          range: 70,
          speed: 6,
          meterGain: 10,
          hitStun: 10
        } as AttackData,
        kick: {
          damage: 80,
          range: 90,
          speed: 7,
          meterGain: 12,
          hitStun: 12
        } as AttackData,
        special: {
          damage: 180,
          range: 120,
          speed: 15,
          meterGain: 0,
          meterCost: 80,
          hitStun: 25,
          type: 'melee'
        } as SpecialMoveData
      }
    }
  },
  {
    id: 3,
    name: "法師",
    description: {
      "zh-TW": "精通元素魔法的法師，擅長遠距離攻擊和範圍傷害。",
      "en-US": "Mage specializing in elemental magic.",
      "ja-JP": "元素魔法を操る魔術師。",
    },
    health: 850,
    speed: 5,
    specialMeterGain: 12,
    sprites: {
      idle: "/characters/mage/idle.svg",
      walk: "/characters/mage/walk.svg",
      jump: "/characters/mage/jump.svg",
      fall: "/characters/mage/jump.svg",
      crouch: "/characters/mage/crouch.svg",
      punch: "/characters/mage/fireball.svg",
      kick: "/characters/mage/lightning.svg",
      special: "/characters/mage/special.svg",
      hurt: "/characters/mage/hurt.svg",
      victory: "/characters/mage/victory.svg",
    },
    moves: {
      punch: {
        damage: 40,
        frameData: { startup: 8, active: 5, recovery: 12 },
        hitbox: { width: 40, height: 40, offsetX: 100, offsetY: 0 },
      },
      kick: {
        damage: 60,
        frameData: { startup: 12, active: 8, recovery: 15 },
        hitbox: { width: 50, height: 200, offsetX: 80, offsetY: -100 },
      },
      special: {
        damage: 200,
        frameData: { startup: 20, active: 15, recovery: 30 },
        hitbox: { width: 150, height: 150, offsetX: 0, offsetY: 0 },
        meterCost: 70,
        type: 'projectile',
      },
    },
    combatStats: {
      health: 850,
      maxHealth: 850,
      meter: 0,
      maxMeter: 120,
      attacks: {
        punch: {
          damage: 40,
          range: 50,
          speed: 4,
          meterGain: 10,
          hitStun: 10
        } as AttackData,
        kick: {
          damage: 60,
          range: 70,
          speed: 5,
          meterGain: 12,
          hitStun: 12
        } as AttackData,
        special: {
          damage: 200,
          range: 150,
          speed: 20,
          meterGain: 0,
          meterCost: 100,
          hitStun: 30,
          type: 'projectile'
        } as SpecialMoveData
      }
    }
  },
  {
    id: 4,
    name: "柔道家",
    description: {
      "zh-TW": "精通摔投技的柔道家，擅長抓取和近身制敵。",
      "en-US": "Judo master specializing in throws and grapples.",
      "ja-JP": "投げ技の達人である柔道家。",
    },
    health: 1100,
    speed: 6,
    specialMeterGain: 9,
    sprites: {
      idle: "/characters/judo/idle.svg",
      walk: "/characters/judo/walk.svg",
      punch: "/characters/judo/grab.svg",
      kick: "/characters/judo/throw.svg",
      special: "/characters/judo/special.svg",
      hurt: "/characters/judo/hurt.svg",
      victory: "/characters/judo/victory.svg",
    },
    moves: {
      punch: {
        damage: 45,
        frameData: { startup: 7, active: 4, recovery: 9 },
        hitbox: { width: 40, height: 40, offsetX: 30, offsetY: 0 },
      },
      kick: {
        damage: 90,
        frameData: { startup: 15, active: 10, recovery: 20 },
        hitbox: { width: 50, height: 50, offsetX: 40, offsetY: 0 },
      },
      special: {
        damage: 160,
        frameData: { startup: 12, active: 8, recovery: 18 },
        hitbox: { width: 60, height: 60, offsetX: 30, offsetY: 0 },
        meterCost: 55,
        type: 'melee',
      },
    },
    combatStats: {
      health: 1100,
      maxHealth: 1100,
      meter: 0,
      maxMeter: 90,
      attacks: {
        punch: {
          damage: 45,
          range: 55,
          speed: 5,
          meterGain: 10,
          hitStun: 10
        } as AttackData,
        kick: {
          damage: 90,
          range: 100,
          speed: 6,
          meterGain: 15,
          hitStun: 15
        } as AttackData,
        special: {
          damage: 160,
          range: 60,
          speed: 12,
          meterGain: 0,
          meterCost: 60,
          hitStun: 18,
          type: 'melee'
        } as SpecialMoveData
      }
    }
  },
  {
    id: 5,
    name: "武術家",
    description: {
      "zh-TW": "精通中國武術的高手，擅長靈活的攻防轉換。",
      "en-US": "Kung Fu master with versatile combat skills.",
      "ja-JP": "中国武術の達人、攻守の切り替えが得意。",
    },
    health: 950,
    speed: 9,
    specialMeterGain: 11,
    sprites: {
      idle: "/characters/kungfu/idle.svg",
      walk: "/characters/kungfu/walk.svg",
      punch: "/characters/kungfu/punch.svg",
      kick: "/characters/kungfu/kick.svg",
      special: "/characters/kungfu/special.svg",
      hurt: "/characters/kungfu/hurt.svg",
      victory: "/characters/kungfu/victory.svg",
    },
    moves: {
      punch: {
        damage: 45,
        frameData: { startup: 4, active: 3, recovery: 7 },
        hitbox: { width: 45, height: 35, offsetX: 45, offsetY: 0 },
      },
      kick: {
        damage: 65,
        frameData: { startup: 7, active: 4, recovery: 10 },
        hitbox: { width: 55, height: 45, offsetX: 55, offsetY: 15 },
      },
      special: {
        damage: 140,
        frameData: { startup: 14, active: 12, recovery: 22 },
        hitbox: { width: 90, height: 70, offsetX: 65, offsetY: 0 },
        meterCost: 45,
        type: 'melee',
      },
    },
    combatStats: {
      health: 950,
      maxHealth: 950,
      meter: 0,
      maxMeter: 110,
      attacks: {
        punch: {
          damage: 45,
          range: 55,
          speed: 8,
          meterGain: 10,
          hitStun: 10
        } as AttackData,
        kick: {
          damage: 65,
          range: 75,
          speed: 9,
          meterGain: 12,
          hitStun: 12
        } as AttackData,
        special: {
          damage: 140,
          range: 90,
          speed: 14,
          meterGain: 0,
          meterCost: 50,
          hitStun: 22,
          type: 'melee'
        } as SpecialMoveData
      }
    }
  },
  {
    id: 6,
    name: "泰拳手",
    description: {
      "zh-TW": "精通泰拳的格鬥家，擅長強力的肘擊和膝擊。",
      "en-US": "Muay Thai fighter specializing in powerful strikes.",
      "ja-JP": "ムエタイの達人、強力な肘打ちと膝蹴りが特徴。",
    },
    health: 1050,
    speed: 7,
    specialMeterGain: 10,
    sprites: {
      idle: "/characters/muaythai/idle.svg",
      walk: "/characters/muaythai/walk.svg",
      punch: "/characters/muaythai/elbow.svg",
      kick: "/characters/muaythai/knee.svg",
      special: "/characters/muaythai/special.svg",
      hurt: "/characters/muaythai/hurt.svg",
      victory: "/characters/muaythai/victory.svg",
    },
    moves: {
      punch: {
        damage: 55,
        frameData: { startup: 6, active: 4, recovery: 9 },
        hitbox: { width: 45, height: 40, offsetX: 35, offsetY: 0 },
      },
      kick: {
        damage: 75,
        frameData: { startup: 9, active: 6, recovery: 13 },
        hitbox: { width: 50, height: 45, offsetX: 40, offsetY: 10 },
      },
      special: {
        damage: 170,
        frameData: { startup: 16, active: 10, recovery: 24 },
        hitbox: { width: 80, height: 70, offsetX: 50, offsetY: 0 },
        meterCost: 55,
        type: 'melee',
      },
    },
    combatStats: {
      health: 1050,
      maxHealth: 1050,
      meter: 0,
      maxMeter: 100,
      attacks: {
        punch: {
          damage: 55,
          range: 65,
          speed: 6,
          meterGain: 10,
          hitStun: 10
        } as AttackData,
        kick: {
          damage: 75,
          range: 85,
          speed: 7,
          meterGain: 12,
          hitStun: 12
        } as AttackData,
        special: {
          damage: 170,
          range: 80,
          speed: 16,
          meterGain: 0,
          meterCost: 60,
          hitStun: 24,
          type: 'melee'
        } as SpecialMoveData
      }
    }
  },
]

// 添加其他5個角色的數據，每個角色都有類似的結構但不同的屬性值 