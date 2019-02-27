import { getIntendedPositions, arrowCodes, checkObstacles, tryMove } from '../../src/helpers/gameHelper'
import {expect} from 'chai'
import sinon from 'sinon'

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

  describe('.tryMove', () => {
    let intendedPositions, obstacles, stubMoveCallback, sandbox;

    before(() => {
      intendedPositions = {player: {x: 60, y: 60}, box: {x: 90, y: 60}};
      obstacles = {};
      sandbox = sinon.createSandbox()
    })

    beforeEach(function () {
      stubMoveCallback = sandbox.stub();
    });

    afterEach(function () {
      sandbox.restore();
    });

    context('when there are no obstacles', () => {
      let stubCheckObstaclesCallback = sinon.stub().returns(null);

      it('call checkObstacles and move ones with proper params', () => {
        let expectedResult = {obstacleForPlayer: null};
        tryMove(intendedPositions, obstacles, stubCheckObstaclesCallback, stubMoveCallback);
        expect(stubCheckObstaclesCallback.callCount).to.equal(1)
        expect(stubCheckObstaclesCallback.getCall(0).args).to.deep.equal([intendedPositions.player, obstacles]);
        expect(stubMoveCallback.getCall(0).args).to.deep.equal([intendedPositions, expectedResult]);
      });
    });

    context('when there is obstacle for player', () => {
      context('when wall obstacle for player', () => {
        let stubCheckObstaclesCallback = sinon.stub().onCall(0).returns({type: 'wall', index: 1});

        it('call checkObstaclesCallback once and not call moveCallback', () => {
          tryMove(intendedPositions, obstacles, stubCheckObstaclesCallback, stubMoveCallback);
          expect(stubCheckObstaclesCallback.callCount).to.equal(1);
          expect(stubMoveCallback.callCount).to.equal(0);
          expect(stubCheckObstaclesCallback.getCall(0).args).to.deep.equal([intendedPositions.player, obstacles]);
        });
      })

      context('when box obstacle for player', () => {
        context('when box has obstacle', () => {
          let stubCheckObstaclesCallback = sinon.stub().onCall(0).returns({type: 'box', index: 1});
          stubCheckObstaclesCallback.onCall(1).returns({type: 'wall', index: 2});

          it('call checkObstaclesCallback twice and not call moveCallback', () => {
            tryMove(intendedPositions, obstacles, stubCheckObstaclesCallback, stubMoveCallback);
            expect(stubCheckObstaclesCallback.callCount).to.equal(2);
            expect(stubMoveCallback.callCount).to.equal(0);
            expect(stubCheckObstaclesCallback.getCall(0).args).to.deep.equal([intendedPositions.player, obstacles]);
            expect(stubCheckObstaclesCallback.getCall(1).args).to.deep.equal([intendedPositions.box, obstacles]);
          });
        })

        context('when box does not have obstacle', () => {
          let stubCheckObstaclesCallback = sinon.stub().onCall(0).returns({type: 'box', index: 1});
          stubCheckObstaclesCallback.onCall(1).returns(null);

          it('call checkObstaclesCallback twice and call moveCallback', () => {
            let expectedResult = {obstacleForPlayer: {type: 'box', index: 1}, obstacleForBox: null };
            tryMove(intendedPositions, obstacles, stubCheckObstaclesCallback, stubMoveCallback);
            expect(stubCheckObstaclesCallback.callCount).to.equal(2);
            expect(stubMoveCallback.callCount).to.equal(1);
            expect(stubCheckObstaclesCallback.getCall(0).args).to.deep.equal([intendedPositions.player, obstacles]);
            expect(stubCheckObstaclesCallback.getCall(1).args).to.deep.equal([intendedPositions.box, obstacles]);
            expect(stubMoveCallback.getCall(0).args).to.deep.equal([intendedPositions, expectedResult]);
          });
        })
      })
    });
  });
});