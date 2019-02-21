import { getIntendedPositions, arrowCodes, checkObstacles } from '../../src/helpers/gameHelper'
import {expect} from 'chai'

describe('gameHelper', () => {
  describe('.getIntendedPositions', () => {
    let position;
    let arrows = arrowCodes();

    beforeEach(() => {
      position = {x: 60, y: 30};
    });

    context('when moving right', () => {
      it('returns proper calculated position', () => {
        const result = getIntendedPositions(position, 39, arrows);
        expect(result).to.deep.equal( {player: {x: 90, y:30}, box: {x: 120, y: 30} } );
      })
    });

    context('when moving left', () => {
      it('returns proper calculated position', () => {
        const result = getIntendedPositions(position, 37, arrows);
        expect(result).to.deep.equal({player: {x: 30, y:30}, box: {x: 0, y: 30}});
      })
    });

    context('when moving up', () => {
      it('returns proper calculated position', () => {
        const result = getIntendedPositions(position, 38, arrows);
        expect(result).to.deep.equal({player: {x: 60, y:0}, box: {x: 60, y: -30}});
      })
    });

    context('when moving down', () => {
      it('returns proper calculated position', () => {
        const result = getIntendedPositions(position, 40, arrows);
        expect(result).to.deep.equal({player: {x: 60, y:60}, box: {x: 60, y: 90}});
      })
    });
  });

  describe('.checkObstacles', () => {
    let obstacles = {
      exit: [[0,0]],
      box: [[180,180],[120,60],[210,210]],
      wall: [[30,60]],
      border: [[-30,60]],
    }

    context('when no obstacles', () => {
      let intendedPosition = {x: 60, y: 60}

      it('returns null', () => {
        expect(checkObstacles(intendedPosition, obstacles)).to.be.null;
      });
    });

    context('when box obstacle', () => {
      let intendedPosition = {x: 120, y: 60}

      it('returns proper result', () => {
        let expectedResult ={type: 'box', index: 1}
        expect(checkObstacles(intendedPosition, obstacles)).to.deep.equal(expectedResult);
      });
    });
  });
});