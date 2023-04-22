//儲存所選時間
export const setSelectedFormTime = (time) => {
  return {
    type: 'SET_SELECTED_TIME',
    payload: time
  }
}
//儲存所選日期
export const setSelectedFormDate = (date) => {
  return {
    type: 'SET_SELECTED_DATE',
    payload: date
  }
}
