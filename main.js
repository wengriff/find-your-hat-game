const prompt = require('prompt-sync')({sigint: true});

class Field {
  constructor(arr) {
    this._arr = arr;
    this._playerX = 0;
    this._playerY = 0;
  }

  print() {
    for(let x = 0; x < 15; x++){
        console.log('\n');
    }
    this._arr[this._playerX][this._playerY] = '*';
    for(let i = 0; i < this._arr.length; i++) {
      console.log(this._arr[i].join(''));
    }
    console.log('\n');
  }

  findHat() {
    let hatIndex = [];
    for(let i = 0; i < this._arr.length; i++){
      for(let j = 0; j < this._arr[i].length; j++) {
        if(this._arr[i][j] === '^')
          hatIndex.push(i, j);
      }
    }
    return hatIndex;
  }

  result() {
    let hatIndex = this.findHat();
    let starIndex = [this._playerX, this._playerY];

    if(hatIndex[0] === starIndex[0] && hatIndex[1] === starIndex[1]) {
      return 'Congrats! You found your hat.';
    }

    if((starIndex[0] > this._arr.length - 1) ||
      (starIndex[0] < 0) ||
      (starIndex[1] > this._arr[0].length - 1) ||
      (starIndex[1] < 0)) {
      return 'You are out of bound';
    }

    if(this._arr[starIndex[0]][starIndex[1]] === 'O') {
      return 'Sorry, you fell down a hole.';
    }
    return false;
  }

  askQuestion() {

    let answer = prompt('Which way? ').toUpperCase();

    switch (answer) {
      case 'W':
        this._playerX -= 1;
        break;
      case 'S':
        this._playerX += 1;
        break;
      case 'D':
        this._playerY += 1;
        break;
      case 'A':
        this._playerY -= 1;
        break;
      default:
        console.log('Enter W, S, A or D.');
        this.askQuestion();
        break;
    }
  }

  static generateField(height, width, percentage) {

    let arr = [];
    const hat = '^';
    let hatPosition = [];
    const hole = 'O';
    let holesIndex = [];
    const fieldCharacter = '░';
    const pathCharacter = '*';
    let starPosition = [0, 0]

    let randomHatPositionX = Math.floor(Math.random() * height);
    let randomHatPositionY = Math.floor(Math.random() * width);

    let numberOfHoles = Math.floor((percentage / 100) * (height * width));

    while((randomHatPositionX === starPosition[0]) && (randomHatPositionY === starPosition[1])) {
      randomHatPositionX = Math.floor(Math.random() * height);
      randomHatPositionY = Math.floor(Math.random() * width);
    }

    hatPosition = [randomHatPositionX, randomHatPositionY];

    for(let i = 0; i < height; i++) {
      arr[i] = [];
      for(let j = 0; j < width; j++) {
        arr[i][j] = fieldCharacter;
      }
    }

    for(let i = 0; i <= numberOfHoles; i++) {
      holesIndex[i] = [];
      for(let j = 0; j <= 1; j++) {
        if(j === 0){
          holesIndex[i][j] = Math.floor(Math.random() * height);
          while(holesIndex[i][j] === starPosition[0] && holesIndex[i][j] === hatPosition[0]){
            holesIndex[i][j] = Math.floor(Math.random() * height);
          }
        }
        if(j === 1){
          holesIndex[i][j] = Math.floor(Math.random() * width);
          while(holesIndex[i][j] === starPosition[1] && holesIndex[i][j] === hatPosition[1]){
            holesIndex[i][j] = Math.floor(Math.random() * width);
          }
        }
      }
    }

    for(let i = 0; i < numberOfHoles; i++) {
      for(let j = 0; j < 1; j++) {
        arr[holesIndex[i][j]][holesIndex[i][j+1]] = hole;
      }
    }

    arr[hatPosition[0]][hatPosition[1]] = hat;

    return arr;
  }

  playGame() {
    let result = false;
    while(result === false) {
      this.print();
      this.askQuestion();
      result = this.result();
    }
    console.log(result);
  }
}

const myField = new Field(Field.generateField(20, 20, 20));

myField.playGame();
