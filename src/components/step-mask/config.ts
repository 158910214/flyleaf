export const DEFAULT_STATE_INDE = 0 // 默认初始状态

export const emits = {
  next: 'next', // 每点击下一步时触发
  finish: 'finish', // 结束时触发
  updateState: 'updateState', // 状态外围管理切换时,实时更新状态
}