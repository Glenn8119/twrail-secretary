export default ( state = false, action) => {
    switch(action.type){
        case "SET_SHOW":
            return true;
        case "SET_NOT_SHOW":
            return false;
        default :
            return state;
    }
}