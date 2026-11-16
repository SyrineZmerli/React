import { useState } from 'react';
import Header from './components/Header';
import Counter from './components/Counter';
import AutoTimer from './components/AutoTimer';
import './App.css';

export default function App() {
  const [showTimer, setShowTimer] = useState(true);

  return (
    <div className="app-container">
      <Header
        titre="Mon Super Compteur React"
        sousTitre="Maitrise des Hooks fondamentaux useState et useEffect"
      />

      <main className="main-content">
        <Counter />

        <div className="timer-section">
          <button
            className="btn btn-toggle"
            onClick={() => setShowTimer((prev) => !prev)}
          >
            {showTimer ? 'Masquer le Chronometre' : 'Afficher le Chronometre'}
          </button>
          {showTimer && <AutoTimer />}
        </div>
      </main>
    </div>
  );
}
