export function getLevels() {
  return [
    {
      id: 1,
      player: {x: 30, y: 270},
      obstacles:{
        box: [[30,210]],
        wall: [[120,270],[120,240]],
        exit: [390, 270],
        border: [[0, -30], [30, -30], [60, -30], [90, -30], [120, -30], [150, -30], [180, -30], [210, -30], [240, -30], [270, -30], [300, -30], [330, -30], [360, -30], [390, -30], [420, -30], [0, 300], [30, 300], [60, 300], [90, 300], [120, 300], [150, 300], [180, 300], [210, 300], [240, 300], [270, 300], [300, 300], [330, 300], [360, 300], [390, 300], [420, 300], [-30, 0], [-30, 30], [-30, 60], [-30, 90], [-30, 120], [-30, 150], [-30, 180], [-30, 210], [-30, 240], [-30, 270], [-30, 300], [450, 0], [450, 30], [450, 60], [450, 90], [450, 120], [450, 150], [450, 180], [450, 210], [450, 240], [450, 270], [450, 300]]
      },
      withTimer: false
    }
  ]
}