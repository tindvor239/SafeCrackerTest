import * as Assets from '../assets'
import * as AssetUtils from '../utils/assetUtils'
import * as Consts from '../utils/constants'
/*
    Preloader: preload all game resources
    Author : Thomas Tran
    email: thomas.tran@mfortune.co.uk
    git: https://github.com/OnePassio/mini_html5_game.git
 */

export default class Preloader extends Phaser.State {
    private preloadBarSprite: Phaser.Sprite = null
    private preloadFrameSprite: Phaser.Sprite = null

    public preload(): void {
        this.preloadBarSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadBar)
        this.preloadBarSprite.anchor.setTo(0, 0.5)
        this.preloadBarSprite.x -= this.preloadBarSprite.width * 0.5

        this.preloadFrameSprite = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, Assets.Atlases.AtlasesPreloadSpritesArray.getName(), Assets.Atlases.AtlasesPreloadSpritesArray.Frames.PreloadFrame)
        this.preloadFrameSprite.anchor.setTo(0.5)

        this.game.load.setPreloadSprite(this.preloadBarSprite)

        AssetUtils.Loader.loadAllAssets(this.game, this.waitForSoundDecoding, this)

        //load spritesheet

        this.game.load.spritesheet(
            Assets.Images.SpritesheetsSafeDialMinigamenotes2752753.getName(),
            Assets.Images.SpritesheetsSafeDialMinigamenotes2752753.getPNG(),275,275,3);

        this.game.load.spritesheet(
            Assets.Images.SpritesheetsLedsSafeDialMinigame11844.getName(),
            Assets.Images.SpritesheetsLedsSafeDialMinigame11844.getPNG(),118,44,3);

        this.game.load.spritesheet(
            Assets.Images.SpritesheetsMarker3867.getName(),
            Assets.Images.SpritesheetsMarker3867.getPNG(),38,67,3);

        this.game.load.spritesheet(
            Assets.Images.SpritesheetsCoins200164.getName(),
            Assets.Images.SpritesheetsCoins200164.getPNG(),200,164,2);

        this.game.load.spritesheet(
            Assets.Images.SpritesheetsGold200164.getName(),
            Assets.Images.SpritesheetsGold200164.getPNG(),200,164,2);
        this.game.load.spritesheet(
            Assets.Images.SpritesheetsNotes200164.getName(),
            Assets.Images.SpritesheetsNotes200164.getPNG(),200,164,2);
        this.game.load.spritesheet(
            Assets.Images.SpritesheetsRingnotes200164.getName(),
            Assets.Images.SpritesheetsRingnotes200164.getPNG(),200,164,2);
        this.game.load.spritesheet(
            Assets.Images.SpritesheetsDiamond200164.getName(),
            Assets.Images.SpritesheetsDiamond200164.getPNG(),200,164,2);

        this.game.load.spritesheet(
            Assets.Images.SpritesheetsButton.getName(),
            Assets.Images.SpritesheetsButton.getPNG(),240,94,3);

        this.game.load.spritesheet(
            Assets.Images.SpritesheetsSpinSafeDialEffect.getName(),
            Assets.Images.SpritesheetsSpinSafeDialEffect.getPNG(),72,61,2);

    }

    private waitForSoundDecoding(): void {
        AssetUtils.Loader.waitForSoundDecoding(this.startGame, this)
    }

    private startGame(): void {
        this.game.camera.onFadeComplete.addOnce(this.loadTitle, this)
        this.game.camera.fade(0x000000, 1000)
    }

    private loadTitle(): void {
        this.game.state.start(Consts.SCENE_MAIN_MENU)
    }
}
