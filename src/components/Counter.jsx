import { useState, useEffect } from 'react';

const MIN = -50;
const MAX = 50;

export default function Counter() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem('mon_compteur_valeur');
    return saved !== null ? parseInt(saved, 10) : 0;
  });

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState('Aucun clic pour le moment');
  const [totalClics, setTotalClics] = useState(0);

  const [historique, setHistorique] = useState(() => {
    const saved = localStorage.getItem('mon_compteur_historique');
    return saved !== null ? JSON.parse(saved) : [];
  });

  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    document.title = 'Compteur : ' + count;
  }, [count]);

  useEffect(() => {
    localStorage.setItem('mon_compteur_valeur', count.toString());
  }, [count]);

  useEffect(() => {
    localStorage.setItem('mon_compteur_historique', JSON.stringify(historique));
  }, [historique]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        setCount((prev) => {
          if (prev + step > MAX) {
            setAlertMsg(`Seuil maximal de ${MAX} atteint !`);
            return prev;
          }
          setAlertMsg('');
          const next = prev + step;
          setMessage('Ajout de ' + step);
          setTotalClics((c) => c + 1);
          setHistorique((h) => [...h, '+' + step]);
          return next;
        });
      } else if (e.key === 'ArrowDown') {
        setCount((prev) => {
          if (prev - step < MIN) {
            setAlertMsg(`Seuil minimal de ${MIN} atteint !`);
            return prev;
          }
          setAlertMsg('');
          const next = prev - step;
          setMessage('Retrait de ' + step);
          setTotalClics((c) => c + 1);
          setHistorique((h) => [...h, '-' + step]);
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [step]);

  const handleIncrement = () => {
    if (count + step > MAX) {
      setAlertMsg(`Seuil maximal de ${MAX} atteint !`);
      return;
    }
    setAlertMsg('');
    const next = count + step;
    setCount(next);
    setMessage('Ajout de ' + step);
    setTotalClics(totalClics + 1);
    setHistorique([...historique, '+' + step]);
  };

  const handleDecrement = () => {
    if (count - step < MIN) {
      setAlertMsg(`Seuil minimal de ${MIN} atteint !`);
      return;
    }
    setAlertMsg('');
    const next = count - step;
    setCount(next);
    setMessage('Retrait de ' + step);
    setTotalClics(totalClics + 1);
    setHistorique([...historique, '-' + step]);
  };

  const handleReset = () => {
    setCount(0);
    setMessage('Remise a zero');
    setTotalClics(totalClics + 1);
    setHistorique([]);
    setAlertMsg('');
  };

  const getStyleClass = () => {
    if (count > 0) return 'counter-display positive';
    if (count < 0) return 'counter-display negative';
    return 'counter-display zero';
  };

  return (
    <div className="counter-card">
      <div className={getStyleClass()}>{count}</div>

      {alertMsg && <div className="alert-message">{alertMsg}</div>}

      <div className="btn-group">
        <button
          className="btn btn-dec"
          onClick={handleDecrement}
          disabled={count - step < MIN}
        >
          -{step}
        </button>
        <button className="btn btn-reset" onClick={handleReset}>
          Reset
        </button>
        <button
          className="btn btn-inc"
          onClick={handleIncrement}
          disabled={count + step > MAX}
        >
          +{step}
        </button>
      </div>

      <div className="step-control">
        <label>Pas d'incrémentation : </label>
        <select
          value={step}
          onChange={(e) => setStep(parseInt(e.target.value, 10))}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
        </select>
      </div>

      <p className="keyboard-hint">
        Utilisez les flèches <kbd>↑</kbd> et <kbd>↓</kbd> du clavier pour piloter le compteur
      </p>

      <div className="history-card">
        <p>
          <strong>Dernière action : </strong> {message}
        </p>
        <p>
          <strong>Nombre total de clics : </strong> {totalClics}
        </p>
        {historique.length > 0 && (
          <p>
            <strong>Historique simple : </strong> {historique.join(', ')}
          </p>
        )}
      </div>
    </div>
  );
}
