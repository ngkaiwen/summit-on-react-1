//define the initial state
const initialState = {
	all_raw_data: {},
	selected_course: "",
	auth: false,
	user: null
}

function dataFilter(id,data) {
	if (id === 'admin'){
		return data;
	}
	let outDict = {};
	for (let key in data){
		if (data[key].courseInfo.owner === id) {
			outDict[key] = data[key];
		}
	}
	return outDict;
}

const mapping = {
	'JzuiJfncXmOzVqmXJJa7DgyJSXx1': 'admin', //admin
	'H5peGQPdl1ToA3647QnDMP7eHCf2':'R6nSbDVly8PUnC6jQFcseDS9sgJ3', //boesch
	"AstdRIojHghB3g4gRg4X3loJG2n2" : 'Ab947q6H2eQ1DjJzhu4GwQXQ9vz1' //venu
}

//define a reducer with an initialized state action
function MainAppReducer(state = initialState, action) {

	switch (action.type) {
		case "SET_SELECTED_COURSE":
			return {
				...state,
				selected_course: action.payload
			};
		case "SET_DATA":
			return {
				...state,
				all_raw_data: action.payload
			}
		case "SET_LAST_UPDATED":
			return {
				...state,
				last_updated_datetime: action.payload
			}
		case "ON_AUTH":
			return {
				...state,
				auth: true
			}
		case "OFF_AUTH":
			return {
				...state,
				auth: false
			}
		case "SET_USER":
			return {
				...state,
				user: mapping[action.payload.uid]
			}
		case "FILTER_DATA":
		console.log(state)
			return {
				...state,
				all_raw_data: dataFilter(state.user ,state.all_raw_data)
			}
		default:
			return state
	}
}

export default MainAppReducer