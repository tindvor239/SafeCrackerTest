import {Images}  from '../../assets';
import { Image, Text} from 'phaser-ce';

export class Display {
    protected image: Image;
    protected text?: Text;
    //#region Properties
    //image
    public get Image() : Image {
        return this.image;
    }
    public set Image(v : Image) {
        this.image = v;
    }
    //text.
    public get Text() : Text{
        return this.text;
    }
    //#endregion
    //#region Constructor
    public constructor(image: Image, text?: Text){
        this.image = image;
        this.image.anchor.setTo(0.5, 0.5);
        this.text = text;
        this.text.anchor.setTo(0.5, 0.5);
        this.image.addChild(this.text);
        this.text.bringToTop();
    }
    //#endregion
}
export class Screen extends Display {
    private displayNumbers: number[];
    public get DisplayNumbers(): number[] {
        return this.displayNumbers;
    }
    private get PairSpaceCount(): number {
        return (this.text.text.length - 1) / 3;
    }
    public get NumberCount(): number {
        return this.PairSpaceCount + 1;
    }
    public constructor(image: Image, text: Text) {
        super(image, text);
        this.displayNumbers = new Array<number>(this.NumberCount);
        this.getDisplayNumberIndex(this.PairSpaceCount);
    }
    private getDisplayNumberIndex(length: number): void {
        let textIndex: number = 0;
        for(let index = 0; index <= length; index++) {
            if(this.text.text[textIndex] == '-') {
                this.displayNumbers[index] = textIndex;
                textIndex += 3;
            }
        }
    }
    public setTextNumber(index: number, value: number): void {
        this.text.setText(this.text.text.substr(0, this.displayNumbers[index]) + value.toString() + this.text.text.substr(this.displayNumbers[index] + value.toString.length));
    }

    public win(): void {
        this.image.loadTexture(Images.ImagesScreenSafeWin.getName());
        this.text.setText('Win');
    }
}
export class Safe extends Display {
    private item: Item;
    private isOpen: boolean;
    //#region Properties
    //contentImage.
    public get Item(): Item {
        return this.item;
    }
    public get IsOpen(): boolean {
        return this.isOpen;
    }
    //#endregion
    //#region Constructor
    public constructor(image: Image, text: Text, item?: Item){
        super(image, text);
        this.isOpen = false;
        this.item = item;
        this.item.Image.anchor.setTo(0.5, 0.5);
        this.image.addChild(this.item.Image);
    }
    //#endregion
    //#region Method
    //Behavior
    public Open() {
        this.isOpen = true;
        let items = new ItemNames();
        this.image.loadTexture(Images.ImagesSafeOpenMinigame.getName());
        this.text.destroy();
        let itemName: string = items.getRandomItemName();
        this.item.Image.loadTexture(itemName);
        this.item.Name = itemName;
        // set item normal randomly.
    }

    public Bingo() {
        //set item to shiny.
    }
    //#endregion
}
export enum State {Spinning, SpinningReverse, Stop, Ready}
export class Spinner {
    private state: State = State.Ready;
    private panel: Image;
    private spinImage: Image;
    private spinTime: number = 0;
    private spinDelay: number = 2;
    private clickCount: number = 0;
    private isSetAngle: boolean = false;
    private angles: number[] = [];
    private fixAngle: number;
    //#region Properties
    private get Angles(): number[] {
        let angles: number[] = [40, 0, -40, -80, -120, -160, 160, 120, 80]
        return angles;
    }
    public get Panel(): Image {
        return this.panel;
    }
    public get SpinImage(): Image {
        return this.spinImage;
    }
    public get State(): State {
        return this.state;
    }
    public set State(value) {
        this.state = value;
    }
    public get SpinDelay(): number {
        return this.spinDelay;
    }
    private get RandomSpinSpeed(): number {
        return this.getRandomInt(1, 4);
    }
    public get ClickCount(): number {
        return this.clickCount;
    }
    public set ClickCount(value: number) {
        this.clickCount = value;
    }
    //#endregion
    //#region Constructor
    public constructor(spinImage: Image, panel: Image) {
        this.spinImage = spinImage;
        this.panel = panel;
        this.panel.anchor.setTo(0.5, 0.5);
        this.spinImage.anchor.setTo(0.5, 0.5);
        this.panel.addChild(this.spinImage);
        this.angles = this.Angles;
        this.spinImage.bringToTop();
        this.spinImage.inputEnabled = true;
        this.spinImage.events.onInputDown.add(startSpin, this);
        function startSpin() {
            if(this.state == State.Ready) {
                this.state = State.Spinning;
            }
          }
    }
    //#endregion
    //#region Method
    //behavior
    private getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    public spin(): void {
        switch (this.state) {
            case State.Spinning:
                this.spinTime += 0.01;
                this.spinImage.angle += this.RandomSpinSpeed;
                if(this.spinTime > this.spinDelay){
                    this.state = State.SpinningReverse;
                    this.spinTime = 0;
                }
                break;
            case State.SpinningReverse:
                if(this.isSetAngle == false) {
                    let random = new Random();
                    this.fixAngle = this.angles[random.range(0, this.angles.length - 1)];
                    this.angles = this.removeAngle(this.fixAngle);
                    this.isSetAngle = true;
                }
                this.spinImage.angle -= this.RandomSpinSpeed;
                if(this.spinImage.angle <= this.fixAngle) {
                    this.spinImage.angle = this.fixAngle;
                    this.stopSpin();
                }
                break;    
            default:
                
                break;
        }
    }
    public steadySpin(): void {
        this.spinImage.angle += 2;
    }
    public changeSpinnerImageWin(): void {
        this.spinImage.loadTexture(Images.ImagesSafeDialMinigameWin.getName());
    }
    public changeSpinnerImageGameOver(): void {
        this.spinImage.loadTexture(Images.ImagesSafeDialMinigameFail.getName());
    }
    public changeSpinnerImageNormal(): void {
        this.spinImage.loadTexture(Images.ImagesSafeDialMinigameNormal.getName());
    }
    private removeAngle(angle: number): number[] {
        let anglesResult: number[] = [];
        let count = 0;
        for(let i = 0; i < this.Angles.length; i++) {
            if(this.Angles[i] != angle) {
                anglesResult[count] = this.Angles[i];
                count++;
            }
        }
        return anglesResult;
    }
    private stopSpin(): void {
        this.isSetAngle = false;
        this.state = State.Stop;
    }
    public getNumber(): number {
        if(this.spinImage.angle == 40)
            return 1;
        else if(this.spinImage.angle == 0)
            return 2;
        else if(this.spinImage.angle == -40)
            return 3;
        else if(this.spinImage.angle == -80)
            return 4;
        else if(this.spinImage.angle == -120)
            return 5;
        else if(this.spinImage.angle == -160)
            return 6;
        else if(this.spinImage.angle == 160)
            return 7;
        else if(this.spinImage.angle == 120)
            return 8;
        else if(this.spinImage.angle == 80)
            return 9;
        else
            return 5;
    }
    //#endregion
}
export class Random {
    public range(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}
export class Item {
    image: Image;
    name: string;
    //#region Properties
    public get Image() : Image {
        return this.image;
    }
    public get Name(): string {
        return this.name;
    }
    public set Name(value : string) {
        this.name = value;
    }
    //#endregion
    //#region Constructor
    public constructor(image: Image, name: string) {
        this.image = image;
        this.name = name;
    }
    //#endregion
    //#region Method
    public setShinyItem(): void {
        let items = new ItemNames();
        for(let i = 0; i < items.NormalItems.length; i++ ) {
            if(items.NormalItems[i] == this.name) {
                this.image.loadTexture(items.ShinyItems[i]);
            }
        }
    }
    
    public setNormalItem(): void {
        let items = new ItemNames();
        for(let i = 0; i < items.NormalItems.length; i++ ) {
            if(items.NormalItems[i] == this.name) {
                this.image.loadTexture(items.NormalItems[i]);
            }
        }
    }
    //#endregion
}
export class ItemNames {
    private normalItems: string[] = [
        Images.ImagesCoinsNormal.getName(),
        Images.ImagesDiamondNormal.getName(),
        Images.ImagesGoldNormal.getName(),
        Images.ImagesNotesNormal.getName(),
        Images.ImagesRingNormal.getName()
    ];
    private shinyItems: string[] = [
        Images.ImagesCoinsShiny.getName(),
        Images.ImagesDiamondShiny.getName(),
        Images.ImagesGoldShiny.getName(),
        Images.ImagesNotesShiny.getName(),
        Images.ImagesRingShiny.getName()
    ];
    //#region Properties
    public get NormalItems(): string[] {
        return this.normalItems;
    }
    public get ShinyItems(): string[] {
        return this.shinyItems;
    }
    //#endregion
    public getRandomItemName():string {
        let random = new Random();
        return this.normalItems[random.range(0, this.normalItems.length -1)];
    }
}