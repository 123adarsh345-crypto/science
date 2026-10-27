import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Flame, RotateCcw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Sparkles, Award } from 'lucide-react';

// Fusion progression chain: H (1) -> He (2) -> C (4) -> O (8) -> Ne (16) -> Mg (32) -> Si (64) -> Fe (128)
interface ElementTile {
  id: number;
  val: number; // 2, 4, 8, 16, 32, 64, 128, etc.
  symbol: string;
  name: string;
  color: string;
}

const ELEMENT_MAP: Record<number, { symbol: string; name: string; color: string }> = {
  2: { symbol: 'H', name: 'Hydrogen', color: 'from-blue-600 to-cyan-500' },
  4: { symbol: 'He', name: 'Helium', color: 'from-cyan-600 to-teal-500' },
  8: { symbol: 'C', name: 'Carbon', color: 'from-amber-600 to-yellow-500' },
  16: { symbol: 'O', name: 'Oxygen', color: 'from-orange-600 to-red-500' },
  32: { symbol: 'Ne', name: 'Neon', color: 'from-rose-600 to-pink-500' },
  64: { symbol: 'Mg', name: 'Magnesium', color: 'from-purple-600 to-indigo-500' },
  128: { symbol: 'Si', name: 'Silicon', color: 'from-indigo-600 to-blue-500' },
  256: { symbol: 'Fe', name: 'Iron (Peak!)', color: 'from-red-600 to-rose-700' },
};

export const StellarAlchemyGame: React.FC = () => {
  const [grid, setGrid] = useState<number[][]>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [reachedIron, setReachedIron] = useState<boolean>(false);

  const spawnTile = (currentGrid: number[][]): number[][] => {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentGrid[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return currentGrid;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newGrid = currentGrid.map(row => [...row]);
    newGrid[randomCell.r][randomCell.c] = Math.random() < 0.8 ? 2 : 4;
    return newGrid;
  };

  const initGame = () => {
    let empty = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    empty = spawnTile(empty);
    empty = spawnTile(empty);
    setGrid(empty);
    setScore(0);
    setGameOver(false);
    setReachedIron(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const slideRow = (row: number[]) => {
    const filtered = row.filter(val => val !== 0);
    let pointsEarned = 0;
    const newRow: number[] = [];

    for (let i = 0; i < filtered.length; i++) {
      if (i + 1 < filtered.length && filtered[i] === filtered[i + 1]) {
        const mergedVal = filtered[i] * 2;
        newRow.push(mergedVal);
        pointsEarned += mergedVal;
        if (mergedVal === 256 && !reachedIron) {
          setReachedIron(true);
          confetti({ particleCount: 100, spread: 70 });
        }
        i++; // skip next since merged
      } else {
        newRow.push(filtered[i]);
      }
    }

    while (newRow.length < 4) {
      newRow.push(0);
    }

    return { row: newRow, points: pointsEarned };
  };

  const move = (dir: 'left' | 'right' | 'up' | 'down') => {
    if (gameOver) return;

    let totalPoints = 0;
    let changed = false;
    let newGrid = grid.map(r => [...r]);

    if (dir === 'left') {
      for (let r = 0; r < 4; r++) {
        const { row, points } = slideRow(newGrid[r]);
        totalPoints += points;
        if (row.some((val, idx) => val !== newGrid[r][idx])) changed = true;
        newGrid[r] = row;
      }
    } else if (dir === 'right') {
      for (let r = 0; r < 4; r++) {
        const reversed = [...newGrid[r]].reverse();
        const { row, points } = slideRow(reversed);
        totalPoints += points;
        const finalRow = row.reverse();
        if (finalRow.some((val, idx) => val !== newGrid[r][idx])) changed = true;
        newGrid[r] = finalRow;
      }
    } else if (dir === 'up') {
      for (let c = 0; c < 4; c++) {
        const col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
        const { row, points } = slideRow(col);
        totalPoints += points;
        for (let r = 0; r < 4; r++) {
          if (newGrid[r][c] !== row[r]) changed = true;
          newGrid[r][c] = row[r];
        }
      }
    } else if (dir === 'down') {
      for (let c = 0; c < 4; c++) {
        const col = [newGrid[3][c], newGrid[2][c], newGrid[1][c], newGrid[0][c]];
        const { row, points } = slideRow(col);
        totalPoints += points;
        for (let r = 0; r < 4; r++) {
          if (newGrid[3 - r][c] !== row[r]) changed = true;
          newGrid[3 - r][c] = row[r];
        }
      }
    }

    if (changed) {
      const spawnedGrid = spawnTile(newGrid);
      setGrid(spawnedGrid);
      setScore(s => {
        const next = s + totalPoints;
        setBestScore(b => Math.max(b, next));
        return next;
      });

      // Check game over
      let hasMoves = false;
      for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
          if (spawnedGrid[r][c] === 0) hasMoves = true;
          if (r < 3 && spawnedGrid[r][c] === spawnedGrid[r + 1][c]) hasMoves = true;
          if (c < 3 && spawnedGrid[r][c] === spawnedGrid[r][c + 1]) hasMoves = true;
        }
      }
      if (!hasMoves) setGameOver(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) { e.preventDefault(); move('up'); }
      if (['ArrowDown', 'KeyS'].includes(e.code)) { e.preventDefault(); move('down'); }
      if (['ArrowLeft', 'KeyA'].includes(e.code)) { e.preventDefault(); move('left'); }
      if (['ArrowRight', 'KeyD'].includes(e.code)) { e.preventDefault(); move('right'); }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="w-full bg-gray-950 rounded-2xl border border-gray-800 shadow-2xl overflow-hidden flex flex-col">
      {/* Game Header */}
      <div className="p-4 bg-gray-900 border-b border-gray-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-orange-950/60 border border-orange-800/40 text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">Stellar Alchemy: The Core Collapse</h3>
            <p className="text-xs text-gray-400">
              Fuse lighter elements (H ➔ He ➔ C ➔ O ➔ Ne ➔ Mg ➔ Si ➔ Fe)
            </p>
          </div>
        </div>

        {/* Score & Reset */}
        <div className="flex items-center gap-3">
          <div className="bg-gray-950 px-3.5 py-1.5 rounded-xl border border-gray-800 text-xs">
            <span className="text-gray-400 block text-[10px]">Binding Energy</span>
            <span className="font-mono font-bold text-amber-300 text-sm">{score} MeV</span>
          </div>

          <button
            onClick={initGame}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors"
            title="Restart Star"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid Viewport */}
      <div className="p-6 flex flex-col items-center justify-center space-y-5">
        <div className="relative w-full max-w-[360px] aspect-square p-3 bg-gray-900/90 rounded-2xl border border-gray-800 grid grid-cols-4 gap-2.5 shadow-2xl">
          {grid.map((row, r) =>
            row.map((val, c) => {
              const info = ELEMENT_MAP[val];
              return (
                <div
                  key={`${r}-${c}`}
                  className={`w-full h-full rounded-xl flex flex-col items-center justify-center font-mono font-bold text-base transition-all duration-150 select-none ${
                    val === 0
                      ? 'bg-gray-950/60 border border-gray-800/50'
                      : `bg-gradient-to-tr ${info?.color || 'from-gray-700 to-gray-600'} text-white shadow-md border border-white/20`
                  }`}
                >
                  {val > 0 && (
                    <>
                      <span className="text-lg leading-none font-bold">{info?.symbol}</span>
                      <span className="text-[9px] font-sans font-medium opacity-80 mt-0.5">{info?.name}</span>
                    </>
                  )}
                </div>
              );
            })
          )}

          {/* Game Over Banner */}
          {gameOver && (
            <div className="absolute inset-0 bg-gray-950/90 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center p-4 text-center">
              <h4 className="text-xl font-bold font-display text-white">Supernova Ignition</h4>
              <p className="text-xs text-gray-300 mt-1">Stellar core ran out of fusion pathways!</p>
              <button
                onClick={initGame}
                className="mt-3 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold cursor-pointer"
              >
                Ignite New Protostar
              </button>
            </div>
          )}
        </div>

        {/* Directional Pad for Mobile/Touch */}
        <div className="flex flex-col items-center gap-1.5 pt-2">
          <button
            onClick={() => move('up')}
            className="p-3 bg-gray-800 active:bg-cyan-600 rounded-xl text-gray-200"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => move('left')}
              className="p-3 bg-gray-800 active:bg-cyan-600 rounded-xl text-gray-200"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => move('down')}
              className="p-3 bg-gray-800 active:bg-cyan-600 rounded-xl text-gray-200"
            >
              <ArrowDown className="w-5 h-5" />
            </button>
            <button
              onClick={() => move('right')}
              className="p-3 bg-gray-800 active:bg-cyan-600 rounded-xl text-gray-200"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
