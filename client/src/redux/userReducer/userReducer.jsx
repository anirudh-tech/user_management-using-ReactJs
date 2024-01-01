

const userReducer = (state = {isAuthenticated: false },action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            return {
                ...state, 
                user: action.payload,
                isAuthenticated: true
            }
        
        case 'LOGOUT_USER':
            return{
                ...state,
                user: '',
                isAuthenticated: false
            }

        default:
            return state
    }
}

export default userReducer;

