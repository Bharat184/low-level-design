import readline from "readline";

class Game {
    private board: Board;
    private rule: Rule;
    private players: Player[] = [];
    private playersCount: number;

    constructor(board: Board, rule: Rule, playersCount: number) {
        this.board = board;
        this.rule = rule;
        this.playersCount = playersCount;
    }

    addPlayer(player: Player): void {
      if (this.players.length >= this.playersCount) {
        throw new Error('Invalid Player');
      }
      this.players.push(player);
    }

    async play(): Promise<void> {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });

      while (!this.rule.isGameOver()) {
        const question = (q: string): Promise<string> => new Promise(resolve => rl.question(q, resolve));

        if (!this.canStartGame()) {
          const playerName = await question('Enter player name: ');
          const playerSymbol = await question('Enter symbol (max 1 character except -): ');
          
          console.log(playerName, playerSymbol);
          if (playerSymbol.length !== 1) {
            console.log('Invalid Symbol. Input again');
            continue;
          } else {
            this.addPlayer(
              new Player(new PlayerSymbol(playerSymbol), playerName)
            )
            continue;
          }
        }

        let currentPlayer = this.players.pop();
        console.log(currentPlayer!.getPlayerName() + '(' + currentPlayer!.getPlayerSymbol().getSymbolValue() + ')turn.');
        this.board.display();

        const row = await question('Enter row: ');
        const column = await question('Enter column: ');
        if (isNaN(Number(row)) || isNaN(Number(column))) {
          console.log('Invalid Number');
          this.players.push(currentPlayer);
          continue;
        }
        console.log(row, column);

        try {
            this.board.setCell(Number(row), Number(column), currentPlayer);
            this.players.unshift(currentPlayer);
        } catch (error) {
          console.log((error as Error).message);
          this.players.push(currentPlayer);
        }
      }
      
      rl.close();
      console.log(this.rule.getResult());
      return;
    }

    private canStartGame(): boolean {
      return this.players.length === this.playersCount;
    }
}

class Board {
    private matrix: Array<Array<Player>> = [];
    private row: number;
    private column: number;
    private nullPlayer: Player = new Player(new PlayerSymbol('-'), 'null');

    constructor(row: number, column: number) {
      this.row = row;
      this.column = column;
      this.matrix = Array.from({ length: 3 }, () =>
          new Array(column).fill(this.nullPlayer)
      );
    }

    getMatrix(): Array<Array<Player>> {
      return this.matrix;
    }

    setCell(row: number, column: number, player: Player): boolean {
      if (!this.isValidCell(row, column)) {
        throw new Error('Choose another cell');
      }
      this.matrix[row][column] = player;
      return true;
    }

    isValidCell(row: number, column: number): boolean {
      return row < this.row && row >= 0 && column >= 0 && column < this.column && this.matrix[row][column] === this.nullPlayer;
    }

    getCell(row: number, column: number): Player {
      if (this.isValidCell(row, column)) {
        return this.matrix[row][column];
      }
      throw new Error('Invalid Cell');
    }

    display(): void {
      for (let i=0;i<this.row;i++) {
        let str = "";
        for (let j=0;j<this.column;j++) {
          if (str) {
            str += ' | ';
          }
          str += this.matrix[i][j].getPlayerSymbol().getSymbolValue();
        }
        console.log(`          
          ${str}
          `);
      }
  }

}

class PlayerSymbol {
    private value: string;

    constructor(value: string) {
      this.value = value;
    }
    
    getSymbolValue() {
      return this.value;
    }
}

interface Irule {
  isWin(): boolean;
  isDraw(): boolean;
  isGameOver(): boolean;
  getResult(): string;
}

class Rule implements Irule {
    private winner: Player | null = null;
    private board: Board;
    private matrix: Array<Array<Player>>;

    constructor(board: Board) {
      this.board = board;
      this.matrix = this.board.getMatrix();
    }

    isWin(): boolean {
      for (let i=0;i<this.matrix.length;i++) {
        let flag = true;
        for (let j=1;j<this.matrix[0].length;j++) {
          if (this.matrix[i][0] !== this.matrix[i][j] || this.matrix[i][j].isNullPlayer() || this.matrix[i][0].isNullPlayer()) {
            flag = false;
            break;
          }
        }
        if (flag) {
          this.winner = this.matrix[i][0];
          return flag;
        }
      }

      return false;
    }

    isDraw(): boolean {
      for (let i=0;i<this.matrix.length;i++) {
        for (let j=0;j<this.matrix[0].length;j++) {
          if (this.matrix[i][j].isNullPlayer()) {
            return false;
          }
        }
       }
       return true;
    }

    isGameOver(): boolean {
      return this.isDraw() || this.isWin();
    }

    getResult(): string {
      if (this.winner === null) {
        return 'Game Drawn!';
      }
      return this.winner.getPlayerName() + ' Won!';
    }
}

class Player {
    private symbol: PlayerSymbol;

    private name: string;

    constructor(symbol: PlayerSymbol, name: string) {
      this.symbol = symbol;
      this.name = name;
    }

    getPlayerName(): string {
      return this.name;
    }

    getPlayerSymbol(): PlayerSymbol {
      return this.symbol;
    }

    isNullPlayer() {
      return this.name === 'null';
    }
}

class GameFactory {
  initialiseGame(): Game {
    let board = new Board(3, 3);
    let rule = new Rule(board);
    return new Game(board, rule, 2);
  }
}

let gameObj: Game = (new GameFactory()).initialiseGame();
gameObj.play()