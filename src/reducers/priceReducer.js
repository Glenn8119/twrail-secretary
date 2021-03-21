export default (state=[], action) => {
    switch(action.type){
        case "FETCH_PRICE":
            return action.payload;
        default:
            return state;
    }
}