const INITIAL_STATE = {
    toggleValue: false
};

function appReducer (state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'TOGGLE':
            return {...state, toggleValue: !state.toggleValue};
        default:
            return state;
    }

}

export default appReducer;