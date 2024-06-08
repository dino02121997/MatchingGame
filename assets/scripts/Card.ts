import { _decorator, Color, Component, Node, Sprite, SpriteFrame, tween, v3 } from 'cc';
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

    onClickCardCallBack: (id: number) => void

    initCard(value: number, sprite: SpriteFrame, callback:(id: number) => void){
        this.value = value;
        this.fontSide.spriteFrame = sprite;
        this.onClickCardCallBack = callback;
    }

    initLockCard(){
        this.isLock = true;
        this.backSide.color = Color.BLACK;
    }

    flipUp(){
        tween(this.backSide.node)
            .to(this.flipDuration/2,{scale: v3(0,1,1)}).start()
        tween(this.fontSide.node)
            .to(this.flipDuration,{scale: v3(1,1,1)}).start()
    }

    flipDown(){
        tween(this.fontSide.node)
            .to(this.flipDuration/2,{scale: v3(1,1,1)}).start()
        tween(this.backSide.node)
            .to(this.flipDuration,{scale: v3(0,1,1)}).start()
    }

    onClickCard(){
        if(this.isLock) return;
        this.flipUp();
        this.onClickCardCallBack(this.value);
    }

}

