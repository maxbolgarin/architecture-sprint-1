
const SET_USER = 'SET_USER';
const CLEAR_USER = 'CLEAR_USER';

const initialState = {
  user: null
};

export function setUser(user) {
  return { 
      type: SET_USER,
      user: user
  };
}
  
export function clearUser() {
  return { 
      type: CLEAR_USER,
  };
}

export function userReducer(state=initialState, action) {
  switch (action.type) {
    case SET_USER:   return { ...state, user: action.user };
    case CLEAR_USER: return { ...state, user: null };;
    default: return state;
  }
}