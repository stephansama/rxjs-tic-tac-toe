import { Component, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type PlayerType = 'First' | 'Second';

type Cell = { index: number; player?: PlayerType | undefined };

const winConditions = [
  [0, 1, 2],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 4, 6],
  [3, 4, 5],
  [2, 5, 8],
  [6, 7, 8],
];

const intialCells = Array.from({ length: 9 }, (_, i) => ({ index: i, player: undefined }) as Cell);

function checkConditions(moves: number[]) {
  for (const condition of winConditions) {
    const metCondition = condition.every((step) => moves.includes(step));
    if (metCondition) return true;
  }
  return false;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('app');
  protected readonly cells = signal(intialCells);
  protected readonly currentPlayer = signal('First' as PlayerType);
  protected readonly winner = computed(() => {
    const cells = this.cells();
    const moves = cells.map((cell) => cell.player);
    const firstPlayer = moves
      .map((move, index) => (move === 'First' ? index : false))
      .filter((item) => typeof item === 'number');
    const secondPlayer = moves
      .map((move, index) => (move === 'Second' ? index : false))
      .filter((item) => typeof item === 'number');

    if (checkConditions(firstPlayer)) return 'First';
    if (checkConditions(secondPlayer)) return 'Second';

    return undefined;
  });
  protected click(cell: Cell) {
    const currentPlayer = this.currentPlayer();
    this.cells.set(
      this.cells().map((value, index) => {
        if (index !== cell.index) return value;
        return { index, player: currentPlayer };
      }),
    );
    this.currentPlayer.set(currentPlayer === 'First' ? 'Second' : 'First');
  }
}
