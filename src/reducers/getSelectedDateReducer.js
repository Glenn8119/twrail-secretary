export default (selectedDate = "", action ) => {
    switch(action.type){
        case "GET_SELECTED_DATE":
            return action.payload;
        default:
            return selectedDate;
    }
}
