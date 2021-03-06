export const obstacleTypes = {
  BOX: 'box',
  WALL: 'wall',
  EXIT: 'exit',
  BORDER: 'border'
}

export function getLevels() {
  return [
    {
      id: 1,
      player: {
        x: 30,
        y: 270
      },
      obstacles: {
        box: [[30,210],[90,210],[60,180],[60,120],[60,90],[90,90],[60,30],[90,30],[150,0],[150,60],[180,30],[210,180],[360,180],[330,150],[330,120],[390,120],[390,90],[360,60],[330,30],[390,60],[420,30],[390,30]],
        wall: [[120,270],[120,240],[120,210],[180,240],[180,210],[0,150],[30,150],[60,150],[90,150],[150,120],[180,150],[180,120],[180,90],[120,90],[120,60],[60,0],[180,0],[240,30],[240,60],[240,120],[240,180],[270,180],[300,180],[300,210],[300,240],[300,270],[330,270],[330,210],[360,30],[360,120],[360,270],[390,150],[390,180],[420,270],[270,60],[300,60],[270,120],[300,120],[300,30]],
        exit: [[390, 270]],
        border: [[0, -30], [30, -30], [60, -30], [90, -30], [120, -30], [150, -30], [180, -30], [210, -30], [240, -30], [270, -30], [300, -30], [330, -30], [360, -30], [390, -30], [420, -30], [0, 300], [30, 300], [60, 300], [90, 300], [120, 300], [150, 300], [180, 300], [210, 300], [240, 300], [270, 300], [300, 300], [330, 300], [360, 300], [390, 300], [420, 300], [-30, 0], [-30, 30], [-30, 60], [-30, 90], [-30, 120], [-30, 150], [-30, 180], [-30, 210], [-30, 240], [-30, 270], [-30, 300], [450, 0], [450, 30], [450, 60], [450, 90], [450, 120], [450, 150], [450, 180], [450, 210], [450, 240], [450, 270], [450, 300]]
      },
      withTimer: false
    },
    {
      id: 2,
      player: {
        x: 240,
        y: 150
      },
      obstacles: {
        box: [[60,240],[90,270],[90,90],[120,30],[120,90],[120,150],[120,210],[150,240],[180,210],[180,60],[210,240],[270,270],[270,210],[270,30],[300,0],[300,60],[300,240],[330,270],[330,210],[330,120],[330,60],[330,30],[360,30],[360,90],[360,240],[390,270],[390,210],[390,60],[390,0],[420,30],[420,240]],
        wall: [[0,210],[30,180],[60,150],[90,150],[60,0],[120,120],[150,270],[150,210],[150,150],[150,30],[180,30],[210,30],[210,90],[210,120],[210,150],[210,180],[240,240],[240,210],[240,90],[240,60],[240,30],[270,90],[300,90],[300,180]],
        exit: [[180, 150]],
        border: [[0, -30], [30, -30], [60, -30], [90, -30], [120, -30], [150, -30], [180, -30], [210, -30], [240, -30], [270, -30], [300, -30], [330, -30], [360, -30], [390, -30], [420, -30], [0, 300], [30, 300], [60, 300], [90, 300], [120, 300], [150, 300], [180, 300], [210, 300], [240, 300], [270, 300], [300, 300], [330, 300], [360, 300], [390, 300], [420, 300], [-30, 0], [-30, 30], [-30, 60], [-30, 90], [-30, 120], [-30, 150], [-30, 180], [-30, 210], [-30, 240], [-30, 270], [-30, 300], [450, 0], [450, 30], [450, 60], [450, 90], [450, 120], [450, 150], [450, 180], [450, 210], [450, 240], [450, 270], [450, 300]]
      },
      withTimer: false
    },
    {
      id: 3,
      player: {
        x: 0,
        y: 120
      },
      obstacles: {
        box: [[0,150],[30,150],[60,150],[90,150],[120,150],[150,150],[180,150],[210,150],[240,150],[270,150],[300,150],[330,150],[360,150],[390,150],[420,150],[240,30],[270,30],[300,30],[360,0]],
        wall: [[30,210],[30,180],[30,120],[0,90],[30,90],[60,90],[120,90],[150,90],[180,90],[180,120],[180,180],[180,210],[150,210],[120,210],[120,180],[120,120],[240,90],[300,90],[300,120],[300,180],[300,210],[270,210],[240,210],[240,180],[240,120],[360,90],[360,120],[360,180],[360,210],[390,210],[420,210],[210,0],[210,30],[270,60],[270,90]],
        exit: [[270, 0]],
        border: [[0, -30], [30, -30], [60, -30], [90, -30], [120, -30], [150, -30], [180, -30], [210, -30], [240, -30], [270, -30], [300, -30], [330, -30], [360, -30], [390, -30], [420, -30], [0, 300], [30, 300], [60, 300], [90, 300], [120, 300], [150, 300], [180, 300], [210, 300], [240, 300], [270, 300], [300, 300], [330, 300], [360, 300], [390, 300], [420, 300], [-30, 0], [-30, 30], [-30, 60], [-30, 90], [-30, 120], [-30, 150], [-30, 180], [-30, 210], [-30, 240], [-30, 270], [-30, 300], [450, 0], [450, 30], [450, 60], [450, 90], [450, 120], [450, 150], [450, 180], [450, 210], [450, 240], [450, 270], [450, 300]]
      },
      withTimer: true
    }
  ]
}