import { useGameStore } from './store/gameStore'
import { Menu } from './components/Menu/Menu'
import { CharacterSelect } from './components/CharacterSelect/CharacterSelect'
import { Battle } from './components/Battle/Battle'
import './App.css'

function App() {
  const currentState = useGameStore(state => state.currentState)

  const renderContent = () => {
    switch (currentState) {
      case 'menu':
        return <Menu />
      case 'characterSelect':
        return <CharacterSelect />
      case 'battle':
        return <Battle />
      case 'result':
        return <div>結果畫面 - 開發中</div>
      default:
        return <Menu />
    }
  }

  return (
    <div className="app">
      {renderContent()}
    </div>
  )
}

export default App 