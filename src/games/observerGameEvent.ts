import 'phaser'
/**
 * The ObserverGameEvent : use for subscribe and listen event in game
 * Author : Thomas Tran
 * email: thomas.tran@mfortune.co.uk
 * git: https://github.com/OnePassio/mini_html5_game.git
 */
export interface Observer {
    // Receive update from subject.
    oncallbackEvent(message: GameEventData): void;
}
export enum GameEventType {
    SPIN_FINISH = 1,
    GAME_FINISH = 2,
    GAME_RESET  = 3,
    SPINNING    = 4,
    NEW_GAME    = 5

}
export class GameEventData {
    public index:number;
    public gameEvent:GameEventType;
    constructor(gameEvent:GameEventType,index:number,) {
        this.gameEvent=gameEvent;
        this.index=index;
    }
}
export class ObserverGameEvent {
     // create singleton for this class
    private static instance: ObserverGameEvent
    static get Instance(): ObserverGameEvent {
        if (this.instance === null || this.instance === undefined) {
            this.instance = new ObserverGameEvent()
            this.instance.observers=[];
        }
        return this.instance
    }

    private observers: Observer[] = [];
    public subscribe(observer):void {
        this.observers.push(observer);
    }
    public unsubscribe(observer): void {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex === -1) {
            console.log('Subject: Nonexistent observer.');
        }
        else {
            this.observers.splice(observerIndex, 1);
        }
    }
    public notify(message:GameEventData): void {
        for (const observer of this.observers)
            observer.oncallbackEvent(message);
    }
}