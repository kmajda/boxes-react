import {getIntendedPosition, arrowCodes, checkIfEndOfBoard} from '../../src/helpers/gameHelper'
import {expect} from 'chai'

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
})