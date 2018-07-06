import _ from 'lodash'
import Constants from './Constants'
import EventEmitter from 'events'
const {
  canvasSize,
  BIRD_FRAME_LIST,
} = Constants

export default class Bird extends EventEmitter {
  constructor(stage) {
    super()
    this.flapCounter = 0
    this.bird = new PIXI.Container()

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
}
