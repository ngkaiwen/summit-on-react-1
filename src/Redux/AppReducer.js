//define the initial state
const initialState = {
	all_raw_data: {},
	selected_course: "-L5cmwU2yj2HRmfDvIUP",
	auth: false,
	user: null,
	role: null,
	cc_data: null,
	cohort_data: null
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
	'koThLjSzltZLjZsBSohCCaQjpW53': ['admin','ADMINISTRATOR'], //admins
	'akD92Zz4hONCPibCqC48furBPmz1':['R6nSbDVly8PUnC6jQFcseDS9sgJ3','EDUCATOR'], //boesch
	"2DRYtqS33yeiFHyNS8HWALNMxQh1" : ['Ab947q6H2eQ1DjJzhu4GwQXQ9vz1','EDUCATOR'] //venu
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
		case "SET_CC_DATA":
			return {
				...state,
				cc_data: action.payload
			}
		case "SET_COHORT_DATA":
			return {
				...state,
				cohort_data: action.payload
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
				user: mapping[action.payload.uid][0],
				role: mapping[action.payload.uid][1]
			}
		case "FILTER_DATA":
			return {
				...state,
				all_raw_data: dataFilter(state.user ,state.all_raw_data)
			}
		default:
			return state
	}
}

export default MainAppReducer
