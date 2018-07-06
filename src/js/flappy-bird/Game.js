import Bird from './Bird'
import Constants from './Constants'
const {
  canvasSize,
  BIRD_FRAME_LIST,
} = Constants

export default class Game {
  constructor() {
    this.flaptimer = 0

    const canvas = document.querySelector('.js-canvas')
    this.renderer = PIXI.autoDetectRenderer({
      width:           canvasSize,
      height:          canvasSize,
      view:            canvas,
      backgroundColor: 0xC1FFFF,
    })
    this.stage = new PIXI.Container()


    PIXI.loader
      .add(BIRD_FRAME_LIST)
      .load(this.init.bind(this))
  }

  init() {
    this.bird = new Bird(this.stage)
    this.draw()
  }

  draw(time) {
    if (time - this.flaptimer > 200) {
      this.bird.flap()
      this.flaptimer = time
    }

    this.renderer.render(this.stage)
    requestAnimationFrame(this.draw.bind(this))
  }
}
