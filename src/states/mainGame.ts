
import * as Assets from '../assets';
import { Image, State, Text } from 'phaser-ce';
import * as UI from '../components/UI/displayUIs';
/*
 * MainGame: scene of main game
 * Author : Thomas Tran
 * email: thomas.tran@mfortune.co.uk
 * git: https://github.com/OnePassio/mini_html5_game.git
 */
enum GameState {play, win, gameover};
export default class MainGame extends Phaser.State {
  private gameState: GameState = GameState.play;
  //ui variable
  private point: number;
  private miniSafes: UI.Safe[] = [];
  private safeSpinner: UI.Spinner;
  private screenSafeMiniGame: UI.Screen;
  private backGroundPanel:Image;
  private screenStateText: Text;

  public create(): void {
    this.game.stage.backgroundColor = '#ffffff'


    //set background image
    const backImg = Assets.Images.ImagesBackgroundSafeMinigame.getName();
    this.backGroundPanel = this.game.add.image(0,0,backImg);
    //create screen state text
    this.screenStateText = this.game.add.text(this.backGroundPanel.width / 2, 70, '',{ font: '70px Luckiest Guy', fill: 'black' });
    this.screenStateText.anchor.setTo(0.5, 0.5);
    this.backGroundPanel.addChild(this.screenStateText);
    //create mini safes group
    let miniSafeName:string = Assets.Images.ImagesSafeMinigame.getName();
    let miniSafePosX:number = this.backGroundPanel.width / 6.5;
    let miniSafePosY:number = this.backGroundPanel.height / 2.55;
    let posY:number = miniSafePosY;
    let posX:number = miniSafePosX;
    let count:number = 1;
    for(let column = 0; column < 3; column++){
      if(column <= 0)
        posY = miniSafePosY;
      for(let row = 0; row < 3; row++){
        let miniSafe:UI.Safe;
        let miniSafeImage:Image;
        let miniSafeText:Text;
        if(row <= 0)
          posX = miniSafePosX;
        miniSafeImage = this.game.add.image(posX, posY, miniSafeName);
        miniSafeText = this.game.add.text(8, 2, count.toString(),{ font: '70px Luckiest Guy', fill: '#ffffff' });
        //create item object
        let miniSafeItemImage = this.game.add.image(22, 4, null)
        let miniSafeItemName = '';
        let miniSafeItem = new UI.Item(miniSafeItemImage, miniSafeItemName);
        //create mini safe object
        miniSafe = new UI.Safe(miniSafeImage, miniSafeText, miniSafeItem);
        this.miniSafes[count - 1] = miniSafe;
        posX += miniSafeImage.width + 10;
        count++;
      }
      this.miniSafes
      posY += 140;
    }

    // screen safe minigame
    posX = (this.backGroundPanel.width / 1.3) + 30;
    posY = (this.backGroundPanel.height / 3) + 10;
    let screenSafeMiniGameImage : Image;
    let screenSafeMiniGameText : Text;
    screenSafeMiniGameImage = this.game.add.image(posX, posY, Assets.Images.ImagesScreenSafeMinigame.getName());
    screenSafeMiniGameText = this.game.add.text(0, -2, '-  -  -  -', { font: '70px Luckiest Guy', fill: '#ffffff' });
    this.screenSafeMiniGame = new UI.Screen(screenSafeMiniGameImage, screenSafeMiniGameText);
    //create spinner panel
    posX = (this.backGroundPanel.width / 1.3) + 30;
    posY = (this.backGroundPanel.height / 1.6) + 40;
    let supportSafeDialMinigame : Image;
    supportSafeDialMinigame = this.game.add.image(posX, posY, Assets.Images.ImagesSupportSafeDialMinigame.getName());
    //create spinner object
    let safeSpinnerImage: Image;
    safeSpinnerImage = this.game.add.image(0, 15, Assets.Images.ImagesSafeDialMinigameNormal.getName());
    this.safeSpinner = new UI.Spinner(safeSpinnerImage, supportSafeDialMinigame);
    
    //
    // effect when screen is opening
    this.game.camera.flash(0x000000, 1000)
  }

  public update(): void {
    switch (this.gameState) {
      case GameState.play:
        this.setScreenStateText();
        if(this.safeSpinner.ClickCount < this.screenSafeMiniGame.NumberCount) {
          this.safeSpinner.spin();
        }
        else {
          this.gameState = GameState.gameover;
        }
        switch (this.safeSpinner.State) {
          case UI.State.Stop:
            this.screenSafeMiniGame.setTextNumber(this.safeSpinner.ClickCount, this.safeSpinner.getNumber());
            this.miniSafes[this.safeSpinner.getNumber() - 1].Open();
            this.checkGameStateWin();
            this.safeSpinner.ClickCount++;
            this.safeSpinner.State = UI.State.Ready;
            break;
        }
        break;
    case GameState.win:
      var currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'EUR'});
      this.screenStateText.addColor('#ffffff', 0);
      this.screenStateText.setText(currency.format(this.point));
      this.safeSpinner.changeSpinnerImageWin();
      this.safeSpinner.steadySpin();
      break;
    case GameState.gameover:
      this.screenStateText.setText('GameOver');
      this.screenStateText.addColor('#ff0000', 0);
      this.safeSpinner.changeSpinnerImageGameOver();
      break;
    default:
      break;
    }
  }

  private setScreenStateText(): void {
    let display: string;
    if(this.safeSpinner.State == UI.State.SpinningReverse || this.safeSpinner.State == UI.State.Spinning)
      display = 'Spining';
    else
      display = 'Ready';
    this.screenStateText.setText(display);
  }
  private checkGameStateWin(): void {
    for(let i = 0; i < this.miniSafes.length; i++) {
      if(this.miniSafes[i].IsOpen) {
        for(let j = 0; j < this.miniSafes.length; j++) {
          if(this.miniSafes[j].IsOpen && j != i && this.miniSafes[i].Item.Name == this.miniSafes[j].Item.Name) {
            this.screenSafeMiniGame.win();
            this.point = this.pointCombo(this.miniSafes[i].Item.Name);
            this.miniSafes[i].Item.setShinyItem();
            this.miniSafes[j].Item.setShinyItem();
            this.gameState = GameState.win;
          }
        }
      }
    }
  }
  private pointCombo(name: string): number {
    let point: number = 0;
    if(name == Assets.Images.ImagesCoinsNormal.getName()) {
      point = 100;
      point *= 15;
    }
    else if(name == Assets.Images.ImagesNotesNormal.getName()) {
      point = 1000;
      point *= 16;
    }
    else if(name == Assets.Images.ImagesGoldNormal.getName()) {
      point = 10000;
      point *= 17;
    }
    else if(name == Assets.Images.ImagesDiamondNormal.getName()) {
      point = 100000;
      point *= 18;
    }
    else {
      point = 110000;
      point *= 19;
    }

    return point;
  }
}
