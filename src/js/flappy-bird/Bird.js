import _ from 'lodash'
import Constants from './Constants'
import EventEmitter from 'events'
const {
  canvasSize,
  BIRD_FRAME_LIST,
  GRAVITY,
  JUMP,
} = Constants

export default class Bird extends EventEmitter {
  constructor(stage) {
    super()
    this.flapCounter = 0
    this.bird = new PIXI.Container()
    this.speedY = 0

    let i = 1
    _.map(PIXI.loader.resources, (resouce) => {
      const sprite = new PIXI.Sprite(resouce.texture)
      sprite.number = i++
      sprite.visible = false
      sprite.anchor.set(0.5, 0.5)
      this.bird.addChild(sprite)
    })
    this.bird.x = canvasSize / 5
    this.bird.y = canvasSize / 2.5
    this.bird.scale.y = this.bird.scale.x = 0.065
    stage.addChild(this.bird)

    document.addEventListener('keydown', e => {
      if (e.keyCode == 32) this.jump()
    })
    stage.on('pointerdown', () => this.jump())
  }

  update() {
    this.speedY += GRAVITY;
    this.bird.y += this.speedY;
  }

  flap() {
    this.flapCounter++
    _.map(this.bird.children, v => {
      if (v.number ==  this.flapCounter) {
        v.visible = true
      } else {
        v.visible = false
      }
    })

    if (this.flapCounter >= BIRD_FRAME_LIST.length) this.flapCounter = 0
  }

  jump() {
    this.speedY -= JUMP
  }

}
