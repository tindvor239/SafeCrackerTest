import * as Assets from '../assets';
import * as Consts from '../utils/constants'
import { Image, Button,Text} from 'phaser-ce'
import {Localization} from '../games/localization';
/*
    Preloader: preload all game resources
    Author : Thomas Tran
    email: thomas.tran@mfortune.co.uk
    git: https://github.com/OnePassio/mini_html5_game.git
 */
export default class Title extends Phaser.State {
  private aboutInfo: string[];
  private buttonPlay:Button; // button play again
  private textPlay:Text; // text play again

  public create(): void {
    this.game.stage.backgroundColor = '#071924'

    // About text
    this.aboutInfo = [
      '            Safe Cracker',
      '            By Thomas Tran',
      'Demo for Intouch testing'
    ]

    const startY = this.game.world.height/2-200;
    for (let i = 0; i < this.aboutInfo.length; i++) {
      const offset: number = i * 40;
      this.game.add.text(this.game.width/2-250, startY + offset, this.aboutInfo[i], { font: '40px Luckiest Guy', fill: '#aea' });
    }

     // play again button
    let xPos = this.game.width/2 -130;
    let yPos = this.game.height/2-50;
    this.buttonPlay=this.game.add.button(xPos,yPos, Assets.Images.SpritesheetsButton.getName(), this.goNext, this, 0, 0,1,0);
    this.textPlay = this.game.add.text(xPos+80, yPos+20, Localization.getTextByID(8), { font: '37px Luckiest Guy', fill: '#ffffff' })

    this.game.camera.flash(0x000000, 1000);

  }
  //
  private goNext(): void {
    this.game.state.start(Consts.SCENE_MAIN_GAME)
  }
}
