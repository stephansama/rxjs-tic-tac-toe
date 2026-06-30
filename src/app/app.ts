import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

type PlayerType = 'First' | 'Second';

type Cell = {
  index: number;
  player?: PlayerType;
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
        }) satisfies Cell,
    ),
  );
  protected readonly currentPlayer = signal('First' as PlayerType);
  protected click(index: Cell) {
    console.info(index.index);
  }
}
