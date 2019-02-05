import React from 'react'
import {shallow} from 'enzyme'
import {expect} from 'chai'
import Board from '../../src/components/Board'
import PlayerBox from '../../src/components/PlayerBox'
import {getBoards} from '../fixtures/gameData'

describe('<Board/>', () => {
  let wrapper;
  
  before(() => {
    const boards = getBoards();
    wrapper = shallow(<Board data={boards[0]}/>);
  });

  it('should render <PlayerBox/> component', () => {
    expect(wrapper.find(PlayerBox)).to.have.lengthOf(1);
  });

  it('should render boxes', () => {
    expect(wrapper.find('.box')).to.have.lengthOf(22);
  });

  it('should render walls', () => {
    expect(wrapper.find('.wall')).to.have.lengthOf(39);
  });
  
  it('should render board', () => {
    expect(wrapper.find('.board')).to.have.lengthOf(1);
  });
})

