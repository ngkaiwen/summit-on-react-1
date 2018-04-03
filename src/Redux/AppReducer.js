//define the initial state
const initialState = {
	all_raw_data: {},
	selected_course: "",
}

//define a reducer with an initialized state action
function MainAppReducer(state = initialState, action) {

	switch (action.type) {
		case "SET_SELECTED_COURSE":
			console.log("Changed course to " + action.payload)
			return {
				...state,
				selected_course: action.payload
			};
		case "SET_DATA":
			return {
				...state,
				all_raw_data: action.payload
			}
		default:
			return state
	}
}

export default MainAppReducer