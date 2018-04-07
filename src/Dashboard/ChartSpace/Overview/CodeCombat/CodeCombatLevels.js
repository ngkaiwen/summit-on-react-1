import React, { Component } from 'react';
import CodeCombatLevelItem from './CodeCombatLevelItem';
import List from 'material-ui/List';

class CodeCombatLevels extends Component {

  obtainListLevels(){
  	var listOfLevels = [];
  	const levelData = this.props.data;

  	for (let level in levelData['AcrossLevelsChart']){ 
  		listOfLevels.push( 
  			<CodeCombatLevelItem 
  				name = {levelData['AcrossLevelsChart'][level]['levelName']} 
				key = {levelData['AcrossLevelsChart'][level]['LevelID']}
				keyclone = {levelData['AcrossLevelsChart'][level]['LevelID']}
  				levelClickHandler = {this.props.levelClickHandler}
  				/>
  		)
  	}
  	return listOfLevels
  }




  render() {
    //console.log(this.props.studentData)
    return (
    	<div style = {{ maxHeight:'95%', overflow:"auto", width:'95%'}}>
      		<List style = {{ maxHeight:'100%', overflow:"auto"}}>
        		{this.obtainListLevels()}
      		</List>
      	</div>
      );
  }
}

export default CodeCombatLevels;
