export const blockBoard = () => ({
  type: 'BLOCK_BOARD',
  isBoardBlocked: true
});

export const unBlockBoard = () => ({
  type: 'UNBLOCK_BOARD',
  isBoardBlocked: false
})