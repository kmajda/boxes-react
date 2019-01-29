const board = (state = {isBoardBlocked:false}, action) => {
  switch(action.type){
    case 'BLOCK_BOARD':
      return {...state, isBoardBlocked: true};
    case 'UNBLOCK_BOARD':
      return {...state, isBoardBlocked: false};
    default:
      return state;
  }
}

export default board;