import { getIntendedPosition, checkIfEndOfBoard, arrowCodes, checkObstacles, checkObstaclesWithAddition } from '../../src/helpers/gameHelper'
import {expect} from 'chai'
import sinon from 'sinon'

describe('gameHelper', () => {
  describe('.getIntendedPosition', () => {
    let position;
    let arrows = arrowCodes();

    beforeEach(() => {
      position = {x: 60, y: 30};
    });

    context('when moving right', () => {
      it('returns proper calculated position', () => {
        const result = getIntendedPosition(position, 39, arrows);
        expect(result).to.deep.equal({x: 90, y:30});
      })
    });

    context('when moving left', () => {
      it('returns proper calculated position', () => {
        const result = getIntendedPosition(position, 37, arrows);
        expect(result).to.deep.equal({x: 30, y:30});
      })
    });

    context('when moving up', () => {
      it('returns proper calculated position', () => {
        const result = getIntendedPosition(position, 38, arrows);
        expect(result).to.deep.equal({x: 60, y:0});
      })
    });

    context('when moving down', () => {
      it('returns proper calculated position', () => {
        const result = getIntendedPosition(position, 40, arrows);
        expect(result).to.deep.equal({x: 60, y:60});
      })
    });
  });

  describe('.checkIfEndOfBoard', () => {
    context('when end of board', () => {
      context('when reaching right border', () => {
        it('returns true', () => {
          expect(checkIfEndOfBoard({x: 450, y: 0})).to.be.true;
        });
      });

      context('when reaching left border', () => {
        it('returns true', () => {
          expect(checkIfEndOfBoard({x: -30, y: 0})).to.be.true;
        });
      });

      context('when reaching top border', () => {
        it('returns true', () => {
          expect(checkIfEndOfBoard({x: 0, y: -30})).to.be.true;
        });
      });

      context('when reaching bottom border', () => {
        it('returns true', () => {
          expect(checkIfEndOfBoard({x: 0, y: 300})).to.be.true;
        });
      });
    });

    context('when not end of board', () => {
      it('returns false', () => {
        expect(checkIfEndOfBoard({x: 0, y: 0})).to.be.false;
      });
    })
  });

  describe('.checkObstacles', () => {
    let position;
    const obstacles = [[0,0], [60,60], [0,90]];

    context('when obstacle is near', () => {
      before(() => {position = {x: 60, y: 60}});

      it('returns true', () => {
        expect(checkObstacles(position, obstacles)).to.be.true;
      });
    });

    context('when obstacle is not near', () => {
      before(() => {position = {x: 60, y: 90}});

      it('returns null', () => {
        expect(checkObstacles(position, obstacles)).to.be.false;
      });
    });
  });

  describe('checkObstaclesWithAddition', () => {
    let position;
    const obstacles = [[0,0], [60,60], [0,90]];

    context('when additional callback returns true', () => {
      before(() => {position = {x: 60, y: 60}});

      it('returns true and obstacle callback not called', () => {
        let obstacleCallback = sinon.stub();
        let additionCallback = sinon.stub().returns(true);
        const result = checkObstaclesWithAddition(obstacleCallback)(position, obstacles, additionCallback)

        expect(result).to.be.true;
        expect(obstacleCallback.called).to.be.false;
        expect(additionCallback.getCall(0).args).to.deep.equal([position]);
      })
    })

    context('when additional callback returns false', () => {
      before(() => {position = {x: 60, y: 60}});

      it('returns obstacle callback result and assert callback called with proper arguments', () => {
        let obstacleCallback = sinon.stub().returns(true);
        let additionCallback = sinon.stub().returns(false);
        const result = checkObstaclesWithAddition(obstacleCallback)(position, obstacles, additionCallback)

        expect(result).to.be.true;
        expect(additionCallback.getCall(0).args).to.deep.equal([position]);
        expect(obstacleCallback.getCall(0).args).to.deep.equal([position, obstacles]);
      })
    })
  })
});