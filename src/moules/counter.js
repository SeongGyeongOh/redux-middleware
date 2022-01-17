const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'

export const increase = () => ({type: INCREASE})
export const decrease = () => ({type: DECREASE})

const initialState = {
  number: 0
}

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return state.number + 1

    case DECREASE:
      return state.number - 1

    default: 
      return state
  }  
}