import Navigation from '../../src/components/Navigation'
import React from 'react'
import { expect } from 'chai'
import { getLevels } from '../fixtures/gameData'
import { shallow } from 'enzyme'
import sinon from 'sinon'

describe('<Navigation/>', () => {
  let levels, currentLevelId, onLevelClick;

  before(() => {
    levels = getLevels();
    currentLevelId = levels[1].id;
    onLevelClick = sinon.spy();
  });

  it('renders levels li tags', () => {
    const wrapper = shallow(<Navigation levels={levels} currentLevelId={currentLevelId} onLevelClick={onLevelClick}/>);
    expect(wrapper.find('li')).to.have.lengthOf(2);
  });

  it('sets .active class to proper level', () => {
    const wrapper = shallow(<Navigation levels={levels} currentLevelId={currentLevelId} onLevelClick={onLevelClick}/>);
    expect(wrapper.find('.active')).to.have.lengthOf(1);
    expect(wrapper.find('.active').text()).to.equal('LEVEL 2');
  });
});