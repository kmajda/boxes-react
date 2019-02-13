// import {getIntendedPosition, arrowCodes, checkIfEndOfBoard, checkIfWallIsNear, checkIfExit, checkIfBoxIsNear, checkIfBoxIsBlocked} from '../../src/helpers/gameHelper'
import * as gameHelper from '../../src/helpers/gameHelper'
import {expect} from 'chai'
import sinon from 'sinon'

describe('gameHelper', () => {
  describe('.getIntendedPosition', () => {
    let position;
    let arrows = gameHelper.arrowCodes();

    beforeEach(() => {
      position = {x: 60, y: 30};
    });

    context('when moving right', () => {
      it('returns proper calculated position', () => {
        const result = gameHelper.getIntendedPosition(position, 39, arrows);
        expect(result).to.deep.equal({x: 90, y:30});
      })
    });

    context('when moving left', () => {
      it('returns proper calculated position', () => {
        const result = gameHelper.getIntendedPosition(position, 37, arrows);
        expect(result).to.deep.equal({x: 30, y:30});
      })
    });

    context('when moving up', () => {
      it('returns proper calculated position', () => {
        const result = gameHelper.getIntendedPosition(position, 38, arrows);
        expect(result).to.deep.equal({x: 60, y:0});
      })
    });

    context('when moving down', () => {
      it('returns proper calculated position', () => {
        const result = gameHelper.getIntendedPosition(position, 40, arrows);
        expect(result).to.deep.equal({x: 60, y:60});
      })
    });
  });

  describe('.checkIfEndOfBoard', () => {
    context('when end of board', () => {
      context('when reaching right border', () => {
        it('returns true', () => {
          expect(gameHelper.checkIfEndOfBoard({x: 450, y: 0})).to.be.true;
        });
      });

      context('when reaching left border', () => {
        it('returns true', () => {
          expect(gameHelper.checkIfEndOfBoard({x: -30, y: 0})).to.be.true;
        });
      });

      context('when reaching top border', () => {
        it('returns true', () => {
          expect(gameHelper.checkIfEndOfBoard({x: 0, y: -30})).to.be.true;
        });
      });

      context('when reaching bottom border', () => {
        it('returns true', () => {
          expect(gameHelper.checkIfEndOfBoard({x: 0, y: 300})).to.be.true;
        });
      });
    });

    context('when not end of board', () => {
      it('returns false', () => {
        expect(gameHelper.checkIfEndOfBoard({x: 0, y: 0})).to.be.false;
      });
    })
  });

  describe('.checkIfWallIsNear', () => {
    let position;
    const walls = [[0,0], [60,60], [0,90]];

    context('when wall is near', () => {
      before(() => {position = {x: 60, y: 60}});

      it('returns true', () => {
        expect(gameHelper.checkIfWallIsNear(position, walls)).to.be.true;
      });
    });

    context('when wall is not near', () => {
      before(() => {position = {x: 60, y: 90}});

      it('returns null', () => {
        expect(gameHelper.checkIfWallIsNear(position, walls)).to.be.false;
      });
    });
  });

  describe('.checkIfExit', () => {
    let position;
    const exit = [60,60];

    context('when inside exit', () => {
      before(() => {position = {x: 60, y: 60}});

      it('returns true', () => {
        expect(gameHelper.checkIfExit(position, exit)).to.be.true;
      });
    });

    context('when not inside exit', () => {
      before(() => {position = {x: 60, y: 90}});

      it('returns null', () => {
        expect(gameHelper.checkIfExit(position, exit)).to.be.false;
      });
    });
  });

  describe('.checkIfBoxIsNear', () => {
    let position;
    const boxes = [[0,0], [60,60], [0,90]];

    context('when box is near', () => {
      before(() => {position = {x: 60, y: 60}});

      it('returns true', () => {
        expect(gameHelper.checkIfBoxIsNear(position, boxes)).to.be.true;
      });
    });

    context('when box is not near', () => {
      before(() => {position = {x: 60, y: 90}});

      it('returns null', () => {
        expect(gameHelper.checkIfBoxIsNear(position, boxes)).to.be.false;
      });
    });
  });

  describe('.checkIfBoxIsBlocked', () => {

    context('when box is blocked', () => {
      it('returns true', () => {
        let stub = sinon.stub(gameHelper, 'checkIfEndOfBoard').returns(true);
        expect(gameHelper.checkIfBoxIsBlocked()).to.be.true;
        stub.restore();
      });
    });

    context('when box is not blocked', () => {
      it('returns false', () => {
        let stub1 = sinon.stub(gameHelper, 'checkIfEndOfBoard').returns(false);
        let stub2 = sinon.stub(gameHelper, 'checkIfWallIsNear').returns(false);
        let stub3 = sinon.stub(gameHelper, 'checkIfBoxIsNear').returns(false);
        let stub4 = sinon.stub(gameHelper, 'checkIfExit').returns(false);
        expect(gameHelper.checkIfBoxIsBlocked()).to.be.false;
        stub1.restore();
        stub2.restore();
        stub3.restore();
        stub4.restore();
      });
    });
  });
});