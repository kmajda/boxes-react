import * as gameData from '../../src/helpers/gameData'
import { mount } from 'enzyme'
import Game from '../../src/components/Game'
import React from 'react'
import { expect } from 'chai'
import { getLevels } from '../fixtures/gameData'
import sinon from 'sinon'
import { wrappComponent } from '../utils/react-redux'


describe('<Game/>', () => {
  let getLevelsStub, levels;

  before(() => {
    levels = getLevels();
  })

  beforeEach(() => {
    getLevelsStub = sinon.stub(gameData, 'getLevels').returns(levels);
  });

  afterEach(() => {
    gameData.getLevels.restore();
  });

  context('when current level with timer', () => {
    it('renders <Timer/> component', () => {
      const wrapper = mount(wrappComponent(<Game/>));
      wrapper.find('Game').setState({currentLevel: levels[1]})
      expect(wrapper.find('Timer')).to.have.lengthOf(1);
    });
  });

  context('when current level without timer', () => {
    it('not renders <Timer/> component', () => {
      const wrapper = mount(wrappComponent(<Game/>));
      expect(wrapper.find('Timer')).to.have.lengthOf(0);
    });
  });
});

