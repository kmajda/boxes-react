export function getBoards() {
  return [
    {
      id: 1,
      player: {
        x: 0,
        y: 0
      },
      boxes: [
        [80,80], [120,80],[160,0]
      ],
      walls: [[40,0], [200,0]],
      exit: [240, 80],
      isFinished: false
    },
    {
      id: 2,
      player: {
        x: 0,
        y: 0
      },
      boxes: [
        [80,80], [120,80],[160,0]
      ],
      walls: [[40,0], [200,0]],
      exit: [240, 120],
      isFinished: false
    }
  ]
}