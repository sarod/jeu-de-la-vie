import './App.css'
import { Grid } from './components/Grid';
import { makeRandomCellStateMatrix } from './game/makeCellStateMatrix';
import { useState, useEffect } from 'react';
import { playIteration } from './game/playIteration';
import { toggleCellState } from './game/toggleCellState';
import { adaptMatrixSize } from './game/adaptMatrixSize';


function App() {
  const [lineCount, setLineCount] = useState(50);
  const [rowCount, setRowCount] = useState(50);
  const [cellStateMatrix, setCellStateMatrix] = useState(() => makeRandomCellStateMatrix(lineCount, rowCount));
  const [speedFactor, setSpeedFactor] = useState(1);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }
    const interval = setInterval(() => {
      setCellStateMatrix((cellStateMatrix) => playIteration(cellStateMatrix));
    },
      1000 / speedFactor);
    return () => clearInterval(interval);
  }, [speedFactor, paused]);

  return (
    <>
      <h1>Le Jeu de la vie</h1>
      <details>
        <summary>Configuration</summary>
        <div>
          Grille Aéatoire (% vivante):
          {[90, 75, 50, 30, 10, 0].map((percent) =>
          (
            <button onClick={() => setCellStateMatrix(makeRandomCellStateMatrix(lineCount, rowCount, percent / 100))}>{percent}%</button>
          )
          )}
        </div>
        <div>
          <label htmlFor="lineCount">Lines: </label>
          <input id="lineCount" type="number" value={lineCount} onChange={(e) => {
            setLineCount(Number(e.target.value));
            setCellStateMatrix(adaptMatrixSize(cellStateMatrix, Number(e.target.value), rowCount));
          }} />
          <label htmlFor="rowCount">Rows: </label>
          <input id="rowCount" type="number" value={rowCount} onChange={(e) => {
            setRowCount(Number(e.target.value));
            setCellStateMatrix(adaptMatrixSize(cellStateMatrix, lineCount, Number(e.target.value)));
          }} />

          <label htmlFor="speedFactor">
            Vitesse ({speedFactor}x):
          </label>
          <input id="speedFactor" type="range"
            onChange={(e) => setSpeedFactor(Number(e.target.value))}
            min={0.5}
            max={20}
            step={0.5}
            value={speedFactor}></input>
          <button aria-label="Démarrer/Arrêter" title="Démarrer/Arrêter" onClick={() => setPaused(!paused)}>{paused ? "▶️" : "⏸️"}</button>
          {paused ? <button aria-label="Démarrer pas a pas" title="Démarrer pas à pas" onClick={() => setCellStateMatrix(playIteration(cellStateMatrix))}>⏯️</button> : ""}
        </div>
      </details>
      <Grid
        cellules={cellStateMatrix} cellSize={8}
        onCellClick={(idxLigne, idxColonne) => setCellStateMatrix(toggleCellState(cellStateMatrix, idxLigne, idxColonne))} />

    </>
  )
}

export default App
