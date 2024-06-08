import { _decorator, Color, Component, Node, Sprite, SpriteFrame, tween, UIOpacity, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Card')
export class Card extends Component {

    @property(Sprite)
    backSide: Sprite = null;

    @property(Sprite)
    fontSide: Sprite = null;

    @property()
    flipDuration: number = 0.2;

    value: number;
        
    isLock: boolean = false;

    isUp: boolean = false;

    onClickCardCallBack: (card: Card) => void

    opacity: UIOpacity;
    
    onLoad() {
        this.opacity = this.node.getComponent(UIOpacity);
    }

    initCard(value: number, sprite: SpriteFrame, callback:(card: Card) => void){
        this.value = value;
        this.fontSide.spriteFrame = sprite;
        this.onClickCardCallBack = callback;
    }

    initLockCard(){
        this.isLock = true;
        this.backSide.color = Color.BLACK;
    }

    flipUp(callback?: ()=>void){
        this.isUp = true;
        tween(this.backSide.node)
            .to(this.flipDuration/2,{scale: v3(0,1,1)}).start();
        tween(this.fontSide.node)
            .to(this.flipDuration,{scale: v3(1,1,1)}, {
                onComplete: () => {
                    if(callback){
                        callback();
                    }
                }
            }).start();
    }

    flipDown(callback?: ()=>void){
        setTimeout(()=>{
            tween(this.fontSide.node)
                .to(this.flipDuration/2,{scale: v3(0,1,1)}).start();
            tween(this.backSide.node)
                .to(this.flipDuration,{scale: v3(1,1,1)},{
                    onComplete: () => {
                        if(callback){
                            callback();
                        }
                        this.isUp = false;
                    }
                }).start();
        },400);

    }

    onClickCard(){
        if(this.isLock || this.isUp) return;
        this.onClickCardCallBack(this.node.getComponent(Card));
    }

    hiddenCard(callback?:() => void){
        tween(this.opacity)
            .to(this.flipDuration,{opacity: 0},{
                onComplete:() => { 
                    if(callback){
                        callback();
                    } 
             }}).start();
    }

}

