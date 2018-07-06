import Bird from './Bird'
import Constants from './Constants'
const {
  canvasSize,
  BIRD_FRAME_LIST,
} = Constants

export default class Game {
  constructor() {
    this.flaptimer = 0

    this.startBtn = document.querySelector('.js-start')
    const canvas = document.querySelector('.js-canvas')

    this.started = false
    this.failed = false

    this.renderer = PIXI.autoDetectRenderer({
      width:           canvasSize,
      height:          canvasSize,
      view:            canvas,
      backgroundColor: 0xC1FFFF,
    })
    this.stage = new PIXI.Container()
    this.stage.interactive = true
    this.stage.hitArea = new PIXI.Rectangle(0, 0, canvasSize, canvasSize)

    PIXI.loader
      .add(BIRD_FRAME_LIST)
      .load(this.init.bind(this))

    this.startBtn.addEventListener('click', () => {
      this.started = true

      if (this.failed) {
        this.failed = false
        this.bird.reset()
        this.draw()
      }
      this.startBtn.classList.add('hide')
    })
  }


  init() {
    this.bird = new Bird(this.stage)
    this.bird.on('collision', () => {
      this.failed = true
      this.startBtn.classList.remove('hide')
    })
    this.draw()
  }

  draw(time) {
    if (this.failed) return

    if (time - this.flaptimer > 200) {
      this.bird.flap()
      this.flaptimer = time
    }

    if (this.started) {
      this.bird.update()
    }

    this.renderer.render(this.stage)
    requestAnimationFrame(this.draw.bind(this))
  }
}
