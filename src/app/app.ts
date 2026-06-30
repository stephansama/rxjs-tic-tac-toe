import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type PlayerType = 'First' | 'Second';

type Cell = {
  index: number;
  player?: PlayerType | undefined;
};

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('app');
  protected readonly cells = signal(
    Array.from(
      { length: 9 },
      (_, i) =>
        ({
          index: i,
          player: undefined,
        }) as Cell,
    ),
  );
  protected readonly currentPlayer = signal('First' as PlayerType);
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
