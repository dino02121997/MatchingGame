import { _decorator, Component, instantiate, Layout, Node, Prefab, SpriteFrame, UITransform } from 'cc';
import { Card } from './Card';
const { ccclass, property } = _decorator;

@ccclass('CardManager')
export class CardManager extends Component {

    @property(Prefab)
    cardPrefab: Prefab = null;

    @property(SpriteFrame)
    cardSprites: SpriteFrame[] = [];    

    cardValues: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];

    col: number=4;
    row: number=4;

    transform: UITransform;
    layout: Layout;

    onLoad(){
        this.initLayout();
        this.instanceCards();
    }

    initLayout(){
        this.transform = this.node.getComponent(UITransform);
        this.layout = this.node.getComponent(Layout);
        this.transform.width = this.col * this.layout.cellSize.width + ( this.col - 1 ) * this.layout.spacingX;
        this.transform.height = this.row * this.layout.cellSize.height + ( this.row - 1 ) * this.layout.spacingY;
        this.layout.constraintNum = this.col;

    }

    instanceCards(){
        const totalCard = this.row * this.col;
        const oddCards = totalCard % 2 === 1;
        const couple = Math.floor(totalCard / 2);
        const cardValues = this.getRandomPair(couple);
        const playableCard = oddCards ? totalCard - 1 : totalCard
        let count = 0;
        for(let i = 0; i < playableCard; i++){
            if(couple === i){
                count=0;
            }
            const value = cardValues[count]
            this.instanceCard(value,this.cardSprites[value],false)
            count++;
        }
        if(oddCards){
            this.instanceCard(999,this.cardSprites[0],true);
        }

    }

    getRandomPair(nCouple:number): number[] {
        return [...this.cardValues].sort(() => Math.random() - 0.5).slice(0,nCouple);
    }


    instanceCard(value: number,spriteFrame: SpriteFrame,isLock: boolean){
        const cardNode = instantiate(this.cardPrefab);
        if(isLock){
            cardNode.getComponent(Card).initLockCard();
        }
        cardNode.getComponent(Card).initCard(value, spriteFrame,this.onClickCard.bind(this));
        this.node.addChild(cardNode);
    }

    onClickCard(value: number){
        console.log(value);
    }
}

