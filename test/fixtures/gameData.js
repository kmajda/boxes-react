export function getBoards() {
  return [
    {
      id: 1,
      player: {x: 30, y: 270},
      boxes: [[30,210]],
      walls: [[120,270],[120,240]],
      exit: [390, 270],
      isFinished: false
    }
  ]
}