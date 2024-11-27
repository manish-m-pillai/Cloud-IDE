import './App.css'
import Terminal from './components/terminal/Terminal'

function App() {
  return(
    <div className='playground-container'>
      <div className='editor-container'>
        <div className="files"></div>
        <div className="editor"></div>
      </div>
      <div className='terminal-container'>
        <Terminal />
      </div>
    </div>
  )
}

export default App
