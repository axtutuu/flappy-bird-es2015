const canvasSize = Math.min(Math.min(window.innerHeight, window.innerWidth), 512)

export default {
  canvasSize: canvasSize,
  GRAVITY: 0.15,
  JUMP: 3,
  BIRD_FRAME_LIST: [
    './images/frame-1.png',
    './images/frame-2.png',
    './images/frame-3.png',
    './images/frame-4.png',
  ],
}
