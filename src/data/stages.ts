export interface Stage {
  id: number;
  name: string;
  description: {
    "zh-TW": string;
    "en-US": string;
    "ja-JP": string;
  };
  background: string;
  floor: string;
  music: string;
}

export const stages: Stage[] = [
  {
    id: 1,
    name: "太空站",
    description: {
      "zh-TW": "國際太空站外的戰鬥平台，背景是浩瀚的星空和地球。",
      "en-US": "Battle platform outside the space station.",
      "ja-JP": "宇宙ステーション外の戦闘プラットフォーム。",
    },
    background: "/stages/space/background.svg",
    floor: "/stages/space/floor.svg",
    music: "/music/space-battle.mp3",
  },
  {
    id: 2,
    name: "游泳池",
    description: {
      "zh-TW": "豪華度假村的室外泳池，周圍是熱帶植物和躺椅。",
      "en-US": "Outdoor pool at a luxury resort.",
      "ja-JP": "高級リゾートの屋外プール。",
    },
    background: "/stages/pool/background.svg",
    floor: "/stages/pool/floor.svg",
    music: "/music/pool-battle.mp3",
  },
  {
    id: 3,
    name: "花園",
    description: {
      "zh-TW": "日式庭園，櫻花紛飛，小橋流水。",
      "en-US": "Japanese garden with cherry blossoms.",
      "ja-JP": "桜の舞う日本庭園。",
    },
    background: "/stages/garden/background.svg",
    floor: "/stages/garden/floor.svg",
    music: "/music/garden-battle.mp3",
  },
  {
    id: 4,
    name: "籃球場",
    description: {
      "zh-TW": "室外籃球場，四周是歡呼的觀眾。",
      "en-US": "Outdoor basketball court with cheering crowd.",
      "ja-JP": "観客で賑わう屋外バスケットボールコート。",
    },
    background: "/stages/court/background.svg",
    floor: "/stages/court/floor.svg",
    music: "/music/court-battle.mp3",
  }
]; 