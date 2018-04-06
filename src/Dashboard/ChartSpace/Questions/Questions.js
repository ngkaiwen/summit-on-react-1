import React, { Component } from 'react';
import { connect } from 'react-redux';
import QuestionCard from './QuestionCard';
import Spinner from '../../../Misc/Spinner';

class Questions extends Component {

    state = {
        data: (this.props.state["all_raw_data"][this.props.selected_course] ? this.props.state["all_raw_data"][this.props.selected_course]["chats"] :null)
    }

    render() {

        let out = <Spinner />;

        if(this.props.state["all_raw_data"][this.props.selected_course]){
            let rawList = Object.keys(this.props.state["all_raw_data"][this.props.selected_course]["chats"]);
            let cleanList = rawList.map( key => {return this.props.state["all_raw_data"][this.props.selected_course]["chats"][key]})
            out = cleanList.map( m => { return <div className="Questions-item" key={m['message']+m['from']}><QuestionCard msg={m['message']} from={m['from']} time={m['time']}/></div>}).reverse()
        }
        
        return (
            <div style={{textAlign:'center', marginTop:'60px'}}>
                <h1>RealTime Questions</h1>
                <div className="Questions-container">
                    {out}
                </div>
            </div>
        );
    }

}

function mapStateToProps(state){
    var selected_course = state["selected_course"]; //Obtain data for the selected course
    if (selected_course != null){ //Check if the redux store has been updated with data from firebase
        return {selected_course:selected_course,
                state:state}
    }
    else { return {} }
}

export default connect(mapStateToProps)(Questions);
