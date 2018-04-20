import os.path
import json
import requests
import math
import copy
import statistics
import collections
import time
import numpy as np
from collections import Counter
from operator import itemgetter
from datetime import datetime as datetime, timedelta
from dateutil import parser, relativedelta
from pytz import timezone

def run():

#################CONFIG SECTION#########################
    ## ASK US FOR MORE DETAILS ##
#################CONFIG SECTION#########################
 
    start_time = time.time()
    
    ### Commonly Used Functions
    def write_to_firebase(dataToWrite,url):
        print("Writing to firebase...")
        resp = requests.put(url=url, data = json.dumps(dataToWrite))

    def epoch2Datetime(epoch): #for submission time - value for each key of submittedSolutions under each student
        timeStr = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(int(epoch)/1000.0))
        timeActual = convertTTimetoDatetime(timeStr)
        return timeActual

    def compareEarlierDate(timeA, timeB): #to select date when there are duplicate submissions of the same date
        submit = datetime.strptime(timeB, '%Y-%m-%d %H:%M:%S')
        create = datetime.strptime(timeA, '%Y-%m-%d %H:%M:%S')
        if create>submit:
            return create-submit
        elif submit>create:
            return -(create-submit)
        else:
            return 0

    def convertTTimetoDatetime(timeUnfiltered):
        year = int(timeUnfiltered[0:4])
        month = int(timeUnfiltered[5:7])
        date = int(timeUnfiltered[8:10])
        hour = int(timeUnfiltered[11:13])
        minute = int(timeUnfiltered[14:16])
        timeActual = datetime(year, month, date, hour, minute, 00)
        return timeActual

    def convertTTimetoWeek(timeUnfiltered):
        year = int(timeUnfiltered[0:4])
        month = int(timeUnfiltered[5:7])
        date = int(timeUnfiltered[8:10])
        hour = int(timeUnfiltered[11:13])
        minute = int(timeUnfiltered[14:16])
        timeActual = datetime(year, month, date, hour, minute, 00).isocalendar()[1]
        return timeActual

    def convertDateTimeToEpochTime(data):
        temp = data.timetuple()
        timeNow = time.mktime(temp)
        return timeNow

    #Function to obtain data from a specific file
    def obtain_data(fileName):
        with open(fileName,encoding='utf-8') as file:
            data = json.load(file)
        return data

    os.chdir(dataDirectory)
    #print(os.listdir())

    
    ### Wailun Kaiwen Charts
    #Function to write to different levels of a nested dictionary
    def internalRun1():
        
        solutionData = obtain_data("solutions.json")
        assignmentData = obtain_data("assignments.json")
        courseMembersData = obtain_data("courseMembers.json")
        UsersData = obtain_data("users.json")
        
        def write_to_dict(dictionary,listOfSubLevels,contentToWrite):
            nextNestedLevel = listOfSubLevels[0]
            if type(dictionary) != dict: dictionary = {} #Allow the function to create new nested levels where a dictionary didn't exist previously
            if len(listOfSubLevels) == 1: #Base case
                dictionary[nextNestedLevel] = contentToWrite
                return dictionary
            else:
                if nextNestedLevel not in dictionary.keys(): #Check if the next nested level already exists
                    dictionary[nextNestedLevel] = {} #If not, create an empty dictionary
                dictionary[nextNestedLevel] = write_to_dict(
                            dictionary[nextNestedLevel],
                            listOfSubLevels[1:],
                            contentToWrite)
            return dictionary

        #Method 1: Create course dictionary structure
        def create_courses(courseData):
            print("CREATING COURSES")
            createdCourseDict = {}
            for course in courseData:
                createdCourseDict = write_to_dict(
                    createdCourseDict,
                    [course,"courseInfo"],
                    courseData[course])

            return createdCourseDict

        #Method 2
        def add_members_to_all_courses(existingDict,courseMembers):
            print("ADDING MEMBERS")
            for course in existingDict:
                oneCourseMembers = {} if course not in courseMembers.keys() else courseMembers[course]
                existingDict = add_members_to_one_course(
                    existingDict,
                    oneCourseMembers,
                    course)
            return existingDict

        #Method 2.1
        def add_members_to_one_course(existingDict,oneCourseMembers,courseID):
            existingDict = write_to_dict(
                existingDict,
                [courseID,"students"],
                oneCourseMembers)
            return existingDict

        #Method 3
        def add_user_profiles_to_all_courses(existingDict,userData):
            print("ADDING ALL USER PROFILES")
            for course in existingDict:
                existingDict = add_user_profiles_to_one_course(
                    existingDict,
                    existingDict[course]["students"],
                    userData,
                    course)
            return existingDict

        #Method 3.1
        def add_user_profiles_to_one_course(existingDict,courseDict,userData,courseID):
            for student in courseDict:
                dataToWrite = userData[student]
                if "displayName" not in dataToWrite.keys():
                    dataToWrite["displayName"] = "DID NOT ENTER NAME"
                    dataToWrite["photoURL"] = ""
                existingDict = write_to_dict(
                    existingDict,
                    [courseID,"students",student,"profile"],
                    dataToWrite)
            return existingDict

        #Method 4
        def add_solutions_for_all_courses(existingDict,solutionData):
            print("ADDING SOLUTION RECORDS FOR ALL USERS")
            for course in existingDict:
                for student in existingDict[course]["students"]:
                    dataToWrite = get_solution_data_for_student(course,student,solutionData)
                    existingDict = write_to_dict(
                        existingDict,
                        [course,"students",student,"submittedSolutions"],
                        dataToWrite)
            return existingDict

        #Method 4.1               
        def get_solution_data_for_student(course,student,solutionData):
            if course in solutionData:
                if student in solutionData[course]:
                    return solutionData[course][student]
            return {}

        #Method 5
        def add_assignments_for_all_courses(existingDict,assignmentData):
            print("ADDING ASSIGNMENTS FOR ALL COURSES")
            for course in existingDict:
                dataToWrite = get_assignments_for_one_course(course,assignmentData)
                existingDict = write_to_dict(
                    existingDict,
                    [course,"assignments"],
                    dataToWrite)
            return existingDict

        def get_assignments_for_one_course(courseID,assignmentData):
            if courseID in assignmentData.keys():
                return assignmentData[courseID]
            return {}

        #Method 6 for Assignment
        def get_course_assignment_completion(solutionData,courseMembersData,UsersData):
            course_assignment_submissions ={}
            def assignment_completion(course,solutionData,courseMembersData,UsersData):
                number_of_people = len(courseMembersData[course])
                completion_rate = {}
                students_completed = {}
                names_completed = {}
                id_notcompleted = {}
                names_notcompleted = {}
                for user in solutionData[course]:
                    for assignment in solutionData[course][user]:
                        if assignment not in completion_rate.keys():
                            completion_rate[assignment] = {"pie":{"data":{"0":{"Name":"Complete","Value":1},"1":{"Name":"Not Complete","Value":number_of_people-1}}}}             
                        elif assignment in completion_rate.keys():
                            completion_rate[assignment]["pie"]["data"]["0"]["Value"] += 1
                            completion_rate[assignment]["pie"]["data"]["1"]["Value"] -= 1           
                        try:
                            students_completed[assignment].append(user)
                            names_completed[assignment].append(UsersData[user]["displayName"])
                        except:
                            students_completed[assignment] = [user]
                            try:
                                names_completed[assignment] = [UsersData[user]["displayName"]]
                            except:
                                try:
                                    names_completed[assignment].append("displayName not found")
                                except:
                                    names_completed[assignment] = ["displayName not found"]
                        try:
                            del id_notcompleted[assignment][user]
                        except:
                            id_notcompleted[assignment] = copy.deepcopy(courseMembersData[course])
                            del id_notcompleted[assignment][user]
                for k,v in id_notcompleted.items():
                    for id_num in v:
                        try:
                            names_notcompleted[k].append(UsersData[id_num]["displayName"]) 

                        except:
                            try:
                                names_notcompleted[k] = [UsersData[id_num]["displayName"]]
                            except:
                                try:
                                    names_notcompleted[k].append("displayName not found")
                                except:
                                    names_notcompleted[k] = ["displayName not found"]
                return[completion_rate,students_completed,names_completed,id_notcompleted,names_notcompleted]
            for k in solutionData.keys():
                course_assignment_submissions[k] = assignment_completion(k,solutionData,courseMembersData,UsersData)
            return course_assignment_submissions

        def insert_assignment_completion(data,completion_list):
            for course,c_info in data.items():
                if data[course]["assignments"] == {}:
                    continue
                for assignment in data[course]["assignments"].keys():
                    try:
                        data[course]["assignments"][assignment]["displayData"] = completion_list[course][0][assignment]
                    except:
                        continue
                    try:
                        data[course]["assignments"][assignment]["completed student ids"] = completion_list[course][1][assignment]
                    except:
                        continue
                    try:
                        data[course]["assignments"][assignment]["completed student names"] = completion_list[course][2][assignment]
                    except:
                        continue
                    try:
                        data[course]["assignments"][assignment]["not completed student ids"] = completion_list[course][3][assignment]
                    except:
                        continue
                    try:
                        data[course]["assignments"][assignment]["not completed student names"] =  completion_list[course][4][assignment]
                    except:
                        continue
            return data

        #Process the data to obtain one final dictionary
        def obtain_final_data(userData,courseData,courseMembers,solutionData,assignmentData):
            finalData = create_courses(courseData)
            finalData = add_members_to_all_courses(finalData,courseMembers)
            finalData = add_user_profiles_to_all_courses(finalData,userData)
            finalData = add_solutions_for_all_courses(finalData,solutionData)
            finalData = add_assignments_for_all_courses(finalData,assignmentData)

            return finalData


        #Use the above functions to obtain finalised dataset
        #First obtain data
        #Main function to call
        def create_data_by_course(dataDirectory):
            os.chdir(dataDirectory)
            userData = obtain_data("users.json")
            courseData = obtain_data("courses.json")
            courseMembers = obtain_data("courseMembers.json")
            solutionData = obtain_data("solutions.json")
            assignmentData = obtain_data("assignments.json")
            
            return obtain_final_data(userData,courseData,courseMembers,solutionData,assignmentData)

        #Write to firebase
        def write_to_firebase(dataToWrite,url):
            print("Writing to firebase...")
            resp = requests.put(url=url, data = json.dumps(dataToWrite))

        initDataDic = create_data_by_course(dataDirectory)
        completion_list = get_course_assignment_completion(solutionData,courseMembersData,UsersData)
        data2=insert_assignment_completion(initDataDic,completion_list)

        return data2

    WLData = internalRun1()

    #### Candice CC Data
    def internalRun2(studentDictionary):
        
        solutionData = obtain_data("solutions.json")
        assignmentData = obtain_data("assignments.json")
        courseMembersData = obtain_data("courseMembers.json")
        UsersData = obtain_data("users.json")
        
        #Function to write to different levels of a nested dictionary
        def write_to_dict(dictionary,listOfSubLevels,contentToWrite):
            nextNestedLevel = listOfSubLevels[0]
            if type(dictionary) != dict: dictionary = {} #Allow the function to create new nested levels where a dictionary didn't exist previously
            if len(listOfSubLevels) == 1: #Base case
                dictionary[nextNestedLevel] = contentToWrite
                return dictionary
            else:
                if nextNestedLevel not in dictionary.keys(): #Check if the next nested level already exists
                    dictionary[nextNestedLevel] = {} #If not, create an empty dictionary
                dictionary[nextNestedLevel] = write_to_dict(
                            dictionary[nextNestedLevel],
                            listOfSubLevels[1:],
                            contentToWrite)
            return dictionary

        def epoch2human(epoch): #for submission time - value for each key of submittedSolutions under each student
            return time.strftime('%Y-%m-%d %H:%M:%S', 
                time.localtime(int(epoch)/1000.0)) 

        def get_date(dateString): #for assignment release time
          from dateutil.parser import parse
          from datetime import datetime
          theDate = parse(dateString)
          # Return a format that can be easily sorted. 
          return "{:%Y-%m-%d %H:%M:%S}".format(theDate)

        def compareEarlierDate(timeA, timeB): #to select date when there are duplicate submissions of the same date
          submit = datetime.strptime(timeB, '%Y-%m-%d %H:%M:%S')
          create = datetime.strptime(timeA, '%Y-%m-%d %H:%M:%S')
          
          if create>submit:
              return 2
          elif submit>create:
              return 1
          else:
              return 0

        #Method 1: Add additional student information to existing data dictionary
        """Adds students joined date and code combat username"""
        def addCodeCombatUserAndJoinedDate(studentDictionary,solutionData):
            print("ADDING CODECOMBAT USER AND JOINED DATE")
            for school in studentDictionary:         
                if solutionData.get(school):
                    schoolSolutions = solutionData.get(school)
                    for student in studentDictionary.get(school).get("students"):
                        if schoolSolutions.get(student):
                            createdTimeStamp = [] #in the event that there >2 entries
                            userLogs = schoolSolutions.get(student)
                            counter=0
                            for log in userLogs: #ensure that the wrong data is not retrieved
                                if counter==0:#assume first
                                    codeCombatUser = userLogs[log]["value"] 
                                createdTimeStamp.append([log,userLogs[log]["createdAt"]])
                                counter+=1
                            joinedDate = epoch2human(createdTimeStamp[0][1])
                            if len(createdTimeStamp)>1:
                                for i in range(len(createdTimeStamp)):
                                    comparedDate = epoch2human(createdTimeStamp[i][1])
                                    if compareEarlierDate (joinedDate,comparedDate)==2:
                                        joinedDate = comparedDate
                            studentDictionary[school]["students"][student]["profile"]["joinedDate"]= joinedDate
                            studentDictionary[school]["students"][student]["profile"]["codeCombatUser"] = codeCombatUser
            return studentDictionary

        #Method 2: Flatten code combat data so that it is easier to add it to students without requiring exponential time
        def preprocessAchievementsData(codeCombatAchievementsData): #assume there should be no duplicate information within each event log
            print("FLATTENING ACHIEVEMENTS DATA")
            codeCombatFlattenDict={}
            for eventLog in codeCombatAchievementsData:
                if codeCombatAchievementsData[eventLog].get("CodeCombat"):
                    userInfo = codeCombatAchievementsData[eventLog].get("CodeCombat")
                    userName = userInfo.get("id")
                    if userName!="":
                        userValue = codeCombatFlattenDict.get(userName,"0")
                        if userValue=="0": #does not exist in dictionary
                            codeCombatFlattenDict[userName]={"lastUpdate": epoch2human(userInfo.get("lastUpdate")),"totalAchievements": userInfo.get("totalAchievements") }
                            codeCombatFlattenDict[userName]["achievements"]={}
                            
                            levelSpecificData = userInfo.get("achievements")
                            if levelSpecificData: #Important check
                                for level in levelSpecificData:
                                    leveldict = {}    #there should only be 1 complete attempt & the earliest completed attempt. #Other info can be failed attempts 
                                    for field in levelSpecificData[level]:
                                        if field!="complete" and (field!="created" and field!="playtime"):
                                            leveldict[field] = levelSpecificData[level][field] #just add level information
                                        if "complete" in levelSpecificData[level].keys() and levelSpecificData[level].get("complete") == False:
                                            leveldict["failed"] = {}
                                            leveldict["failed"]["1"] = {}
                                            if levelSpecificData[level].get("created"):
                                                newDate = get_date( levelSpecificData.get(level).get("created"))
                                                leveldict["failed"]["1"]["created"] = newDate
                                            if levelSpecificData[level].get("playtime"):
                                                leveldict["failed"]["1"]["playtime"] = levelSpecificData.get(level).get("playtime")
                                        elif field=="complete":
                                            leveldict[field] = levelSpecificData[level].get(field)  
                                            if(levelSpecificData[level].get("playtime")):
                                                leveldict["playtime"] = levelSpecificData[level].get("playtime")
                                        else:
                                            if levelSpecificData[level].get("created"):
                                                newDate = get_date( levelSpecificData.get(level).get("created"))
                                                leveldict["created"] = newDate
                                            else:
                                                leveldict[field] = levelSpecificData[level].get(field)

                                    codeCombatFlattenDict[userName]["achievements"][level] = {"attempts": leveldict}   #this will consider failed attempts     
                                    
                        else: #deal with future data and duplicates & fill in missing "created" data if given
                            smallerValue = compareEarlierDate(epoch2human(userInfo.get("lastUpdate")),userValue.get("lastUpdate"))
                            if(smallerValue==2): #userInfo is the latest information
                                userValue["lastUpdate"] = epoch2human(userInfo.get("lastUpdate"))
                            if userInfo.get("totalAchievements") > userValue.get("totalAchievements"):
                                userValue["totalAchievements"] = userInfo.get("totalAchievements")
                            levelSpecificData = userInfo.get("achievements")
                            existingLevelData = userValue.get("achievements") #codeCombatFlattenDict
                            
                            if levelSpecificData: 
                                for newLevel in levelSpecificData:
                                    if existingLevelData.get(newLevel): #level data exists
                                        getAttempts = existingLevelData.get(newLevel).get("attempts") #dictionary of attempts. 
                                        
                                        if userInfo.get("achievements")[newLevel].get("complete")==True: #succeeded attempts do not always have timestamps
                                            if getAttempts.get("complete") == True: #level has already been completed
                                                if(getAttempts.get("playtime")==False and userInfo.get("achievements").get(newLevel).get("playtime")):
                                                    getAttempts["playtime"] = userInfo.get("achievements").get(newLevel).get("playtime")
                                                    
                                                    if(getAttempts.get("created")==False and userInfo.get("achievements").get(newLevel).get("created")==True): #no time stamp
                                                        attemptedTime = get_date(userInfo.get("achievements").get(newLevel).get("created"))
                                                        getAttempts["created"] = attemptedTime #add timestamp
                                                    elif userInfo.get("achievements").get(newLevel).get("created")==True: #compare who has the earlier timestamp
                                                        timestamp1 = get_date(userInfo.get("achievements").get(newLevel).get("created"))
                                                        timestamp2 = getAttempts.get("created")
                                                        earlier = compareEarlierDate(timestamp1,timestamp2)
                                                        if earlier==1:
                                                            getAttempts["created"] = timestamp1
                                                
                                        else: #include failed attempts
                                            add = True
                                            for attempts in getAttempts["failed"]:
                                                if(getAttempts["failed"][attempts].get("created")==True and userInfo.get("achievements").get(newLevel).get("created")==True):
                                                    timestamp1 = get_date(userInfo.get("achievements").get(newLevel).get("created"))
                                                    timestamp2 = getAttempts[attempts]["failed"].get("created")
                                                    earlier = compareEarlierDate(timestamp1,timestamp2)
                                                    if earlier ==0: #check that it is not duplicate data
                                                        add = False
                                            if add:
                                                newNum = len(getAttempts["failed"])+1
                                                attemptdict = {}
                                                for field in userInfo.get("achievements").get(newLevel):
                                                    if field=="created":
                                                        attemptdict[field] = get_date(userInfo.get("achievements").get(newLevel)[field])
                                                    elif field=="playtime":
                                                        attemptdict[field] = userInfo.get("achievements").get(newLevel)[field]
                                                getAttempts["failed"][str(newNum)] = attemptdict
         
                                    else: #level does not exist
                                        leveldict = {}    #there should only be 1 complete attempt & the earliest completed attempt. #Other info can be failed attempts 
                                        for field in levelSpecificData[newLevel]:
                                            if field!="complete" and (field!="created" and field!="playtime"):
                                                leveldict[field] = levelSpecificData[newLevel][field] #just add level information
                                            elif levelSpecificData[newLevel]["complete"] == False:
                                                leveldict["failed"] = {}
                                                leveldict["failed"]["1"] = {}
                                                if levelSpecificData[newLevel].get("created"):
                                                    newDate = timestamp1 = get_date(levelSpecificData.get(newLevel).get("created"))
                                                    leveldict["failed"]["1"]["created"] = newDate
                                                if levelSpecificData[newLevel].get("playtime"):
                                                    leveldict["failed"]["1"]["playtime"] = levelSpecificData[newLevel].get("playtime")
                                            else:
                                                leveldict[field] = levelSpecificData[level].get(field)
                                        existingLevelData[newLevel] = {"attempts": leveldict}   #this will consider failed attempts  
            return codeCombatFlattenDict        


        #Method 3: Aggregate total playtime (per level and in total for the user), create new key for list of all playtimes
        def aggregateAchievementsData(flattenedAchievementsData): #assume there should be no duplicate information within each event log
            print("ADDING AGGREGATED CODE COMBAT STATISTICS")
            for user in flattenedAchievementsData:
                totalPlayTime = 0
                if(flattenedAchievementsData[user].get("achievements")):
                    for level in flattenedAchievementsData[user].get("achievements"):
                        levelPlayTime = 0
                        totalAttempts = 0
                        allAttempts = []
                        if flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("playtime"):
                            totalPlayTime += flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("playtime")
                            levelPlayTime += flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("playtime")
                            allAttempts.append(flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("playtime"))
                        if flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("failed"):
                            for attempt in flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("failed"):
                                totalAttempts+=1
                                if flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("failed").get(attempt).get("playtime"):
                                    totalPlayTime += flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("failed").get(attempt).get("playtime")
                                    levelPlayTime += flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("failed").get(attempt).get("playtime")
                                    allAttempts.append(flattenedAchievementsData[user].get("achievements").get(level).get("attempts").get("failed").get(attempt).get("playtime"))
                        if(totalAttempts==0): #account for completed
                            totalAttempts+=1
                        flattenedAchievementsData[user]["achievements"][level]["playTimeList"] = allAttempts
                        flattenedAchievementsData[user]["achievements"][level]["numAttempts"] = totalAttempts
                        flattenedAchievementsData[user]["achievements"][level]["levelPlayTime"] = levelPlayTime
                    flattenedAchievementsData[user]["totalPlayTime"] = totalPlayTime
            return flattenedAchievementsData
            
        #Method 4: Combines code combat data with student data
        def add_student_codecombatLevels(existingDict,aggregateAchievementsData):
            print("ADDING CODE COMBAT DATA TO STUDENTS AND COURSE SIZE")
            codeCombat = {}

            for course in existingDict:
                if existingDict.get(course).get("students"): #course has students
                    existingDict[course]["courseInfo"]["courseSize"] = len(existingDict.get(course).get("students"))
                    for student in existingDict.get(course).get("students"):
                        if existingDict.get(course).get("students").get(student).get("profile").get("codeCombatUser"): #has a code combat account
                            codeCombatUser = existingDict.get(course).get("students").get(student).get("profile").get("codeCombatUser")
                            codeCombatData = aggregateAchievementsData.get(codeCombatUser)
                            #sum playTime
                            if codeCombatData:
                               codeCombat = write_to_dict(
                                        existingDict,
                                        [course,"students",student,"codeCombatData"],
                                        codeCombatData)
            return codeCombat

        #Use the above functions to obtain finalised dataset
        #Sub Nodes which make up NCCCodeCombat
        #Process the data to obtain one final dictionary

        def obtain_final_CC_data(studentDictionary, solutionData,codeCombatAchievementsData):
            existingdict = addCodeCombatUserAndJoinedDate(studentDictionary,solutionData)
            flattenedAchievementsData = preprocessAchievementsData(codeCombatAchievementsData)
            processedAchievementsData = aggregateAchievementsData(flattenedAchievementsData)
            studentData = add_student_codecombatLevels(existingdict,processedAchievementsData)
            return studentData

        def create_data_by_cohort(dataDirectory, studentDictionary):
            os.chdir(dataDirectory)    
            solutionData = obtain_data("solutions.json")
            codeCombatAchievementsData = obtain_data("achievements-prod-userAchievements-export.json")
            return obtain_final_CC_data(studentDictionary, solutionData,codeCombatAchievementsData)
                               
        finalCCDict = create_data_by_cohort(dataDirectory, studentDictionary)

        return finalCCDict

    data = internalRun2(WLData)
    
    ##### Wailun and XG Charts
    def internalRun3(dataToWrite):
        
        def create_completion_pie_data(dataToWrite):
            print("1. Creating completion pie chart") 
            #Process the data by course
            for course in dataToWrite:
                
                #First check if the course actually has assignments
                if "assignments" in dataToWrite[course].keys(): 
                    numberOfAssignmentsInCourse = len(dataToWrite[course]["assignments"])
                    
                    
                    #Process each student in the course
                    for student in dataToWrite[course]["students"]:
                        thisStudent = dataToWrite[course]["students"][student]

                        #Create the display data node if it doesn't exist
                        if "displayData" not in thisStudent.keys(): 
                            thisStudent["displayData"] = {}

                        #Check if this student actually submitted solutions
                        if "submittedSolutions" not in thisStudent.keys():
                            submitted = 0
                        else:
                            submitted = len(thisStudent["submittedSolutions"])

                        #Create the actual data
                        title = "Assignment submission status"
                        thisStudent["displayData"]["pie"] = {"title":title}
                        pieChart = thisStudent["displayData"]["pie"]
                        pieChart["data"] = {}
                        pieChart["data"][0] = {"Name":"Complete","Value":submitted}
                        pieChart["data"][1] = {"Name":"Not complete","Value":numberOfAssignmentsInCourse-submitted}                
                        thisStudent["displayData"]["pie"] = pieChart

                        dataToWrite[course]["students"].update({student:thisStudent})

            return dataToWrite

        #Method 2
        def create_completion_line_chart(dataToWrite):
            print("2. Creating completion line chart")
            #Do this for each course
            for course in dataToWrite:
                earliestDate = get_earliest_assignment_date(dataToWrite,course)
                #Check if there were any assignments posted at all
                if (earliestDate):

                    #Obtain the size of time steps to use
                    numberOfSteps = 30
                    earliestDate = parser.parse(earliestDate)
                    timeStep = (datetime.now() - earliestDate)/numberOfSteps

                    #Check if timeStep is less than a day
                    timeStepInHours = False
                    if timeStep.days == 0:
                        timeStepInHours = True

                    #Initialise the list of time stamps (which will be used to generate the chart)
                    listOfSteps = []

                    #Initialise list of total assignments submitted across students in this course (used to compute the average)
                    totalListOfCompletedAssignmentsAtEachTimeStamp = [0]*(numberOfSteps+1)

                    #Create the list of time stamps to check against
                    for step in range(0,numberOfSteps+1):
                        listOfSteps.append(earliestDate + timeStep*step)
                    
                    #Do this for each student
                    for student in dataToWrite[course]["students"]:

                        #Initialise list of assignments completed by student over time
                        listOfCompletedAssignmentsAtEachTimeStamp = [0]*(numberOfSteps+1)
                        thisStudentsAssignments = dataToWrite[course]["students"][student]["submittedSolutions"]
                        
                        #Loop through all assignments under this student and create the data for the chart
                        for assignment in thisStudentsAssignments:

                            #Obtain the time at which the solution was submtited by the student
                            timeCreated = thisStudentsAssignments[assignment]["createdAt"]
                            timeCreated = datetime.fromtimestamp(timeCreated/1000)

                            #Loop through the time stamp list from the back,
                            #checking if this assignment was done before each time stamp
                            for time in range(numberOfSteps,0,-1):
                                assignmentDoneBeforeThisDate = timeCreated < listOfSteps[time]

                                #If it is, add 1 to the corresponding position in the listOfCompletedAssignmentsAtEachTimeStamp list
                                if assignmentDoneBeforeThisDate:
                                    listOfCompletedAssignmentsAtEachTimeStamp[time] += 1
                                    totalListOfCompletedAssignmentsAtEachTimeStamp[time] +=1
                                else:
                                    continue
                            
                        #Create the xAxis list to prepare for writing to the actual dictionary
                        xAxis = []
                        formatString = "%Y-%m-%d %H:%M" if timeStepInHours else "%Y-%m-%d"

                        #Go through all the time steps and convert them from datetime to python string format
                        for time in range(0,numberOfSteps+1):
                            xAxis.append(listOfSteps[time].strftime(formatString))

                        #Add to student's data
                        studentData = dataToWrite[course]["students"][student]
                        for dataPoint in range(0,numberOfSteps+1):
                            data = {"Label":xAxis[dataPoint],"Completed assignments":listOfCompletedAssignmentsAtEachTimeStamp[dataPoint]}
                            studentData = add_to_student_charts(studentData,"submissionsVStime",dataPoint,data,"Submissions over time")

                        #Update the main dictionary
                        dataToWrite[course]["students"][student] = studentData

                    #Add average for students in the course
                    numberOfStudents = len(dataToWrite[course]["students"].keys())
                    if numberOfStudents > 0:
                        avgData = [round(i/numberOfStudents,1) for i in totalListOfCompletedAssignmentsAtEachTimeStamp]
                        for student in dataToWrite[course]["students"]:
                            studentData = dataToWrite[course]["students"][student]
                            for dataPoint in range(0,numberOfSteps+1):
                                studentData["displayData"]["submissionsVStime"]["data"][dataPoint]["Course average"] = avgData[dataPoint]
                            dataToWrite[course]["students"][student] = studentData
                        

            return dataToWrite                               

        #Helper method 2.1
        def get_earliest_assignment_date(dataToWrite,course):
            assignments = dataToWrite[course]["assignments"]
            for assignment in assignments:
                if assignments[assignment]["orderIndex"] == 1:
                    return assignments[assignment]["open"]
            return None

        #Helper method 2.2
        def get_date_difference(date1,date2):
            difference = date2-date1
            return difference.days

        #Helper method 2.3
        def add_to_student_charts(studentData,nameOfChart,index,data,title):
            if "displayData" not in studentData.keys(): 
                studentData["displayData"] = {}
            if nameOfChart not in studentData["displayData"].keys():
                studentData["displayData"][nameOfChart] = {"data":{},"title":title}
            studentData["displayData"][nameOfChart]["data"][index] = data
            return studentData

        #Method 3
        def create_percentile_chart(dateToWrite):
            print("3. Creating assignment percentile chart") 
            #loop through all courses
            for course in dataToWrite:

                #Obtain dictionary of all assignments in the course
                assignments = dataToWrite[course]["assignments"]
                allPercentiles = {}
                orderOfAssignments = {}
                for assignment in assignments:
                    allPercentiles[assignment] = {}
                    orderOfAssignments[assignment] = assignments[assignment]["orderIndex"]

                #loop through all students and obtain solution timings for all assignments
                for student in dataToWrite[course]["students"]:
                    studentData = dataToWrite[course]["students"][student]
                    
                    #Add each assignment timing to the dictionary of all assignments
                    for submission in allPercentiles:
                        timing = 9999999999999
                        if submission in studentData["submittedSolutions"].keys():
                            timing = studentData["submittedSolutions"][submission]["createdAt"]
                        allPercentiles[submission][student] = timing

                #Sort each assignment's timing
                allPercentilesProcessed = {}
                for assignment in allPercentiles:
                    thisAssignment = [(value,key) for (key,value) in allPercentiles[assignment].items()]
                    thisAssignmentSorted = sorted(thisAssignment,key= lambda x:x[0])
                    allPercentilesProcessed[assignment] = process_into_percentiles(thisAssignmentSorted)
                            
                #Now go through each student in the course once again and add chartData
                for student in dataToWrite[course]["students"]:
                    displayData = dataToWrite[course]["students"][student]["displayData"]
                    displayData["assignmentPercentiles"] = {"data":[],"title":"Assignment percentiles"}

                    #Go through all assignments and add the percentiles to this student's graph
                    for assignment in allPercentilesProcessed:
                        order = orderOfAssignments[assignment]
                        assignmentName = "Assignment " + str(order)
                        percentile = allPercentilesProcessed[assignment][student]
                        displayData["assignmentPercentiles"]["data"].append({"Name":assignmentName, "Percentile":percentile, "Order":order})
                    displayData["assignmentPercentiles"]["data"] = sorted(displayData["assignmentPercentiles"]["data"], key = lambda x:x["Order"])

                    #Get average
                    listOfCompletionTimingsForThisStudent = list(map(list_average,displayData["assignmentPercentiles"]["data"]))
                    displayData["assignmentPercentiles"]["average"] = round(sum(listOfCompletionTimingsForThisStudent)/len(listOfCompletionTimingsForThisStudent))
                        
                    dataToWrite[course]["students"][student]["displayData"] = displayData            

            return dataToWrite
                
        #Helper method 3.1
        def process_into_percentiles(thisAssignmentSorted):
            totalNumber = len(thisAssignmentSorted)
            count = 0
            dictionaryOfStudentsForThisAssignment = {}

            #Traverse the sorted list from the back
            for rank in range(totalNumber-1,-1,-1):
                thisStudent = thisAssignmentSorted[rank]
                
                #Check if student even did the assignment or not
                if thisStudent[0] == 9999999999999:
                    dictionaryOfStudentsForThisAssignment[thisStudent[1]] = 0

                else:
                    dictionaryOfStudentsForThisAssignment[thisStudent[1]] = round((totalNumber - rank)/totalNumber*100)

            return dictionaryOfStudentsForThisAssignment

        #Helper method 3.2
        def list_average(assignmentPercentiles):
            return assignmentPercentiles["Percentile"]
        

        dataToWrite = create_completion_pie_data(dataToWrite)
        dataToWrite = create_completion_line_chart(dataToWrite)
        dataToWrite = create_percentile_chart(dataToWrite)

        #Process video data
        def process_data(solutionsData, assignmentData):
            print("CREATING DATA")
            for courseKey in solutionsData:
                for uID in solutionsData[courseKey]:
                    event = solutionsData[courseKey][uID]
                    for assignmentID in event:
                        specifics = event[assignmentID]
                        try:
                            vidPlay = specifics['createdAt']
                            if (type(specifics["value"]) is str):
                                assignmentData[courseKey][assignmentID] += [{'Completion Time': vidPlay, 'value': specifics['value'] }]
                            else:
                                assignmentData[courseKey][assignmentID] += [{'Completion Time': vidPlay}]
                        except:
                            continue
            return assignmentData

        #Returns: {CourseID:{AssignmentID:[]}}
        def process_assignment(assignmentData):
            dictToReturn = {}
            for courseKey in assignmentData:
                dictToReturn[courseKey] = {}
                for assignmentKey in assignmentData[courseKey]:
                    dictToReturn[courseKey][assignmentKey] = []
            return dictToReturn

        #Returns: {CourseID:{assignments:{AssignmentID:{Charts:{}}}}}
        def process_assignment2(assignmentData):
            dictToReturn = {}
            for courseKey in assignmentData:
                dictToReturn[courseKey] = {'assignments':{}}
                for assignmentKey in assignmentData[courseKey]:
                    dictToReturn[courseKey]['assignments'][assignmentKey] = {'Chart':{}}
            return dictToReturn

        #Retrieve data
        def retrievedData_byCourse(courseID, dataset):
            #print(dataset[courseID])
            return dataset[courseID]

        #Retrieve Timeseries
        #[{"Completion Time": time, "Number": number}]
        def retrievedData_Assignment(assignmentID, dataset):
            retrieved = dataset[assignmentID]
            dictToReturn = []
            counter = 0
            retrieved = sorted(retrieved, key=itemgetter('Completion Time'))
            midDictionary = {}
            for item in retrieved:
                t = item['Completion Time']
                now = str(datetime.fromtimestamp(t/1000))
                timeData = now[:10]
                counter += 1
                midDictionary[timeData] = counter
            for key in midDictionary:
                dictToReturn += [{"Date": key, "Students": midDictionary[key]}]
            return dictToReturn

        def CreateData(assignmentData, solutionDataProcessed):
            container = process_assignment(assignmentData)
            #Returns: {CourseID:{AssignmentID:[]}}
            for courseID in container:
                selectedData_course = retrievedData_byCourse(courseID, solutionDataProcessed)
                for assignmentID in container[courseID]:
                    container[courseID][assignmentID] = retrievedData_Assignment(assignmentID, selectedData_course)
            return container

        def midFunction(dataDirectory):
            os.chdir(dataDirectory)
            solutionData2 = obtain_data("solutions.json")
            assignmentData2 = obtain_data("assignments.json")
            assignmentDataProcessed = process_assignment(assignmentData2)
            solutionDataProcessed = process_data(solutionData2, assignmentDataProcessed)
            firstIteration = CreateData(assignmentData2, solutionDataProcessed)
            return firstIteration

        firstIteration = midFunction(dataDirectory)

        def CreateData2(toBeDone, toBeInserted):
            for courseID in toBeDone:
                for assignmentID in toBeDone[courseID]['assignments']:
                    toBeDone[courseID]['assignments'][assignmentID]["Charts"] = {"StudentsByTime": toBeInserted[courseID][assignmentID]}
                    #print(toBeDone[courseID]['assignments'][assignmentID])
            return toBeDone

        dataToWrite = CreateData2(dataToWrite, firstIteration)

        def obtain_allData():
            #Process video data
            def process_data(solutionsData, assignmentData):
                print("CREATING DATA")
                for courseKey in solutionsData:
                    for uID in solutionsData[courseKey]:
                        event = solutionsData[courseKey][uID]
                        for assignmentID in event:
                            specifics = event[assignmentID]
                            try:
                                vidPlay = specifics['value']["youtubeEvents"]
                                for eventID in vidPlay:
                                    if vidPlay[eventID]['event'] == 'pause':
                                        vidTiming = math.ceil(vidPlay[eventID]['videoTime'])
                                        try:
                                            assignmentData[courseKey][assignmentID][vidTiming] += 1
                                        except:
                                            assignmentData[courseKey][assignmentID][vidTiming] = 1                    #print(temp)
                            except:
                                continue
                return assignmentData

            #Returns: {CourseID:{AssignmentID}}
            def process_assignment(assignmentData):
                dictToReturn = {}
                for courseKey in assignmentData:
                    dictToReturn[courseKey] = {}
                    for assignmentKey in assignmentData[courseKey]:
                        dictToReturn[courseKey][assignmentKey] = {}
                return dictToReturn

            #Retrieve data
            def retrievedData_byCourse(courseID, dataset):
                #print(dataset[courseID])
                return dataset[courseID]

            #Gets timeseries
            #[{"value": value, "time": time},..., {"value": value, "time": time}]
            def retrievedData_Assignment(assignmentID, dataset):
                retrieved = dataset[assignmentID]
                dictToReturn = []
                maxTime = 0
                for time in retrieved:
                    if time > maxTime:
                        maxTime = time
                for i in range(0,maxTime+1):
                    dictToReturn += [{"value": 0, "time": i}]
                dictToReturn = sorted(dictToReturn, key=itemgetter('time'))
                for time in retrieved:
                    value = retrieved[time]
                    dictToReturn += [{"value": value, "time": time}]
                    dictToReturn.remove(dictToReturn[time])
                    dictToReturn = sorted(dictToReturn, key=itemgetter('time'))
                #print(dictToReturn)
                return dictToReturn

            #Use the above functions to obtain finalised dataset
            #First obtain data
            solutionData = obtain_data("solutions.json")
            assignmentData = obtain_data("assignments.json")

            #Then process data
            assignmentDataProcessed = process_assignment(assignmentData)
            solutionDataProcessed = process_data(solutionData, assignmentDataProcessed)

            def CreateData(assignmentData, solutionDataProcessed):
                container = process_assignment(assignmentData)
                #Returns: {CourseID:{AssignmentID:[]}}
                for courseID in container:
                    selectedData_course = retrievedData_byCourse(courseID, solutionDataProcessed)
                    for assignmentID in container[courseID]:
                        container[courseID][assignmentID] = retrievedData_Assignment(assignmentID, selectedData_course)
                        #print(container[courseID][assignmentID])
                return container

            dataToWrite = CreateData(assignmentData, solutionDataProcessed)

            #Returns: {CourseID:{AssignmentID}}
            def process_assignmentDates(assignmentData):
                dictToReturn = {}
                for courseKey in assignmentData:
                    dictToReturn[courseKey] = []
                    for assignmentKey in assignmentData[courseKey]:
                        time = assignmentData[courseKey][assignmentKey]['open']
                        timeDate = convertTTimetoWeek(time)
                        dictToReturn[courseKey] += [{assignmentKey: timeDate}]
                #print(dictToReturn)
                return dictToReturn

            dataToWrite2 = process_assignmentDates(assignmentData)

            allData = [dataToWrite, dataToWrite2]
            return allData

        createdData = obtain_allData()

        def getAssignmentWeeksContainer(data):
            container = {}
            for course in data:
                container.update({course:{}})
                container[course].update({"AssignmentByWeek":{}})
                container[course].update({"minWeek":1000})
                for item in data[course]:
                    minWeek = container[course]["minWeek"]
                    if course == "-L5cmwU2yj2HRmfDvIUP":
                        minWeek = datetime(2018, 1, 15).isocalendar()[1]
                    for assignment in item:
                        week = item[assignment]
                        minWeek = min(week, minWeek)
                        if course == "-L5cmwU2yj2HRmfDvIUP":
                            tempWeek = datetime(2018, 1, 26).isocalendar()[1]
                            if week > tempWeek:
                                week -= 1
                        container[course]["AssignmentByWeek"].update({str(week):[]})
                        container[course]["minWeek"] = minWeek
                for item in data[course]:
                    for assignment in item:
                        week = item[assignment]
                        if course == "-L5cmwU2yj2HRmfDvIUP":
                            tempWeek = datetime(2018, 1, 26).isocalendar()[1]
                            if week > tempWeek:
                                week -= 1
                        container[course]["AssignmentByWeek"][str(week)].append(assignment)
            return container

        def getAssignmentWeeksInter(container):
            for course in container:
                container[course].update({"Assignment Figure":{}})
                for week in container[course]["AssignmentByWeek"]:
                    container[course]["Assignment Figure"].update({str(week):{}})
                    container[course]["Assignment Figure"][str(week)].update({"Figure":0})
                    container[course]["Assignment Figure"][str(week)].update({"Data":{}})
                for week in container[course]["AssignmentByWeek"]:
                    sizeWeek = len(container[course]["AssignmentByWeek"][week])
                    container[course]["Assignment Figure"][str(week)]["Data"] = container[course]["AssignmentByWeek"][week]
                    container[course]["Assignment Figure"][str(week)]["Figure"] = sizeWeek
            tempCont = {}
            for course in container:
                tempCont.update({course:{}})
                minWeek = container[course]["minWeek"]
                tempCont[course].update({"Assignment Figure":{}})
                for week in container[course]["AssignmentByWeek"]:
                    weekNew = int(week) - int(minWeek) + 1
                    tempCont[course]["Assignment Figure"].update({str(weekNew):{}})
                    tempCont[course]["Assignment Figure"][str(weekNew)].update({"Figure":0})
                    tempCont[course]["Assignment Figure"][str(weekNew)].update({"Data":{}})
                for week in container[course]["AssignmentByWeek"]:
                    sizeWeek = len(container[course]["AssignmentByWeek"][week])
                    weekNew = int(week) - int(minWeek) + 1
                    tempCont[course]["Assignment Figure"][str(weekNew)]["Data"] = container[course]["AssignmentByWeek"][week]
                    tempCont[course]["Assignment Figure"][str(weekNew)]["Figure"] = sizeWeek
            return tempCont
            

        weekData2 = getAssignmentWeeksContainer(createdData[1])
        weekData = getAssignmentWeeksInter(weekData2)
        createdData[1] = weekData

        def CreateData3(toBeDone, toBeInserted):
            for courseID in toBeDone:
                #print(toBeDone[courseID]['courseInfo']["Charts"])
                try:
                    toBeDone[courseID]['courseInfo']["Charts"] = {"AssignmentsByTime": toBeInserted[1][courseID]}
                except:
                    continue
            return toBeDone

        def CreateData4(toBeDone, toBeInserted):
            for courseID in toBeDone:
                for assignmentID in toBeDone[courseID]['assignments']:
                    if toBeInserted[0][courseID][assignmentID] != [{'value': 0, 'time': 0}] :
                        try:
                            toBeDone[courseID]['assignments'][assignmentID]["Charts"]["YoutubeCharts"] = toBeInserted[0][courseID][assignmentID]
                        except:
                            continue
                        #print(toBeDone[courseID]['assignments'][assignmentID])
            return toBeDone

        dataToWrite = CreateData3(dataToWrite, createdData)
        dataToWrite = CreateData4(dataToWrite, createdData)
        youtubeAndStudents = dataToWrite

        return youtubeAndStudents

    data2 = internalRun3(data)

    ###### Candice CC Data
    def internalRun4(consolidatedDict):

        def dictionaryDepth(d): #to ensure that we do not exceed the json depth limit that Firebase has
            if (not isinstance(d, dict) or not d):
                return 0
            else:
                return max(dictionaryDepth(v) for k, v in d.items()) + 1

        #Function: Data Cleansing
        def dataCleansingRemoveEmptyCourses(consolidatedDict): #Remove nonsense courses with no students
            print("REMOVED EMPTY COURSES")
            cleansedDictionary = {}
            for course in consolidatedDict:
                if consolidatedDict.get(course).get("students"): #students exist
                    cleansedDictionary[course] = consolidatedDict.get(course)
            return cleansedDictionary

        ##Method 1:loops through every school, get min and max playtime levels within each school
        def collateLevelplayTimeByCourse(consolidatedDict):
            print("COLLATE MAXIMUM AND MINIMUM PLAYTIME FOR EACH LEVEL OF EACH SCHOOL")
            courselevelDictionary = {}
            finalDict = {}
            for course in consolidatedDict:
                courselevelDictionary[course]= {}
                if consolidatedDict.get(course).get("students"): #students exist 
                    for student in consolidatedDict.get(course).get("students"):
                        if consolidatedDict.get(course).get("students").get(student).get("codeCombatData"):
                            if consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements"):
                                for level in consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements"):
                                    if courselevelDictionary[course].get(level) == None: #create level
                                        courselevelDictionary[course][level] = {}
                                        courselevelDictionary[course][level]["name"] = consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("attempts").get("name")
                                        courselevelDictionary[course][level]["playTime"] = []
                                    if consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("levelPlayTime")!=0:
                                        playTimeArray = courselevelDictionary[course][level]["playTime"]
                                        playTimeArray.append(consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("levelPlayTime"))
                                        courselevelDictionary[course][level]["playTime"] = playTimeArray  
           #remove empty dictionaries
            for course in courselevelDictionary:
                if courselevelDictionary.get(course) != {}:
                    for level in courselevelDictionary.get(course):
                        if courselevelDictionary.get(course).get(level).get("playTime")!=[]:
                            numpyArray = np.array(courselevelDictionary.get(course).get(level).get("playTime"))
                            minimum = np.amin(numpyArray)
                            maximum = np.amax(numpyArray)
                            courselevelDictionary[course][level]["minimumPlay"] = minimum.item() #convert from numpy.int64
                            courselevelDictionary[course][level]["maximumPlay"] = maximum.item()
                    finalDict[course] = courselevelDictionary[course]
            return finalDict            

        #Method 2: Get the median and average time spent by each student for codecombat assignments as well as for each Code combat level as compared to the course min and max
            """Not all students will have charts, and not all levels by each students will have charts; it depends on whether playtime information is recorded"""
        def createChartForTimeSpentPerLevelComparedToCourse(consolidatedDict): #There will be no chart if timePerLevel does not exist: there are missing playtime information for students
            print("4. Creating charts to show the median time spent on code combat levels for each student")
            aggregatedLevelTimeBySchool = collateLevelplayTimeByCourse(consolidatedDict)  
            for course in consolidatedDict:
                if consolidatedDict.get(course).get("students"): #students exist
                    for student in consolidatedDict.get(course).get("students"):
                        if consolidatedDict.get(course).get("students").get(student).get("codeCombatData"):
                            allPlayTimes = [] #convert into numpy array later for median
                            if consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements"):
                                for level in consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements"):
                                    allPlayTimes.append(consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("levelPlayTime"))
                                if allPlayTimes!=[] and not all([ v == 0 for v in allPlayTimes]): #with the consolidated playTime per level, retrieve median and ensure that allPlayTimes is not all 0, else it is meaningless   
                                    courseLevelData = aggregatedLevelTimeBySchool.get(course) #data should exist
                                    numpyArray = np.array(allPlayTimes)
                                    numpyArray = np.trim_zeros(np.sort(numpyArray)) #remove 0s for more accurate mean and median calculations
                                    median = np.median(numpyArray)
                                    mean = np.mean(numpyArray) #In seconds #convert from numpy.int64
                                    consolidatedDict[course]["students"][student]["codeCombatDisplayData"] = {}
                                    consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timePerLevel"] = {}
                                    consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timePerLevel"]["Median"] = median.item() 
                                    consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timePerLevel"]["Average"] = mean.item() #In seconds
               
                                    counter = 0
                                    consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timePerLevel"]["data"] = []
                                    for level in consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements"):
                                        if consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("levelPlayTime"): #playtime is recorded  
                                            newdict = {}
                                            newdict["Time Taken"] = consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("levelPlayTime")
                                            newdict["Label"] = courseLevelData.get(level).get("name") #level should exist
                                            newdict["Course Maximum"] = courseLevelData.get(level).get("maximumPlay")
                                            newdict["Course Minimum"] = courseLevelData.get(level).get("minimumPlay")
                                            newdict["Order"] = counter+1
                                            consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timePerLevel"]["data"].append(newdict)
                                            counter+=1
            return consolidatedDict                                                             

        #Method 3: Creates 2 dictionaries. (helper function)
        #One ranks students according to the number of achievements they have attained by course and time spent
        #The other dictionary which includesOnlyRank and studentID, since there is a significant proportion of missing time data
        def createRankAchievementsDictionary(consolidatedDict):
            print("CREATING 2 DICTIONARIES OF STUDENTS CATEGORISED BY THE NUMBER OF ACHIEVEMENTS ATTAINED")
            rankDictionary = {}
            rankTimeDictionary = {}
            for course in consolidatedDict:
                if consolidatedDict.get(course).get("students"): #students exist
                    rankDictionary[course] = {}
                    rankTimeDictionary[course] = {}
                    for student in consolidatedDict.get(course).get("students"):
                        if consolidatedDict.get(course).get("students").get(student).get("codeCombatData"):
                            levelAchievement = consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("totalAchievements")
                            if rankDictionary.get(course).get(levelAchievement)==None: #does not exist
                                rankDictionary[course][levelAchievement] = []
                            currentListOfStudents = rankDictionary.get(course).get(levelAchievement)
                            currentListOfStudents.append(student)
                            rankDictionary[course][levelAchievement] = currentListOfStudents
                              
                            totalPlayTime = consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("totalPlayTime") #convert into minutes
                            if totalPlayTime!=0 and totalPlayTime!=None: #there is time data for this student
                                if rankTimeDictionary.get(course).get(levelAchievement)==None:
                                    rankTimeDictionary[course][levelAchievement] = {}
                                rankTimeDictionary[course][levelAchievement][student] = {}
                                rankTimeDictionary[course][levelAchievement][student]["totalTime"] = totalPlayTime/60
                                #Time to loop through each level to obtain total success time and total failure time
                                failedSum = 0
                                successSum = 0
                                attemptsArray = []
                                for level in consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements"): #can safely assume that there is achievements since playtime is not 0
                                    if consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("attempts").get("failed"):
                                        #there are failed attempts
                                        for failure in consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("attempts").get("failed"):
                                            failedSum += consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("attempts").get("failed").get(failure).get("playtime")
                                    if consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("attempts").get("playtime"): #not all completed levels have playtimes
                                        successSum += consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("attempts").get("playtime")                                
                                    attemptsArray.append(consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("numAttempts"))
                                rankTimeDictionary[course][levelAchievement][student]["successSum"] = int(round(successSum/60)) #convert into minutes
                                rankTimeDictionary[course][levelAchievement][student]["failSum"] = int(round(failedSum/60)) #convert into minutes
                                #calculate median number of attempts
                                numpyArray = np.array(attemptsArray)
                                median = np.median(numpyArray)
                                if(median.item == None):
                                    rankTimeDictionary[course][levelAchievement][student]["medianAttempts"] = 0
                                        
                                else:
                                    rankTimeDictionary[course][levelAchievement][student]["medianAttempts"] = int(round(median.item()))
                                        
            
            #remove empty dictionaries
            noEmptyRankDictionary = {}
            for course in rankDictionary:
                if rankDictionary.get(course)!={}:
                    noEmptyRankDictionary[course] = rankDictionary.get(course)

            noEmptyRankTimeDictionary = {}
            for course in rankTimeDictionary:
                if rankTimeDictionary.get(course)!={}:
                    noEmptyRankTimeDictionary[course] = rankTimeDictionary.get(course)
            rankDictionary = noEmptyRankDictionary
            rankTimeDictionary = noEmptyRankTimeDictionary
            return [rankDictionary, rankTimeDictionary]

        #Method 4: Given ID and total achievements, filters rank time dictionary (helper function)
        #returns the sum of success (time) of other people, sum of fails (time) of other people with the same level of achievements & their total average time spent
        def comparisonAggregateFilter(rankTimeDictionary, course, studentID, levelAchievements): #levelAchievements should be an int
            achievementsDictionary = rankTimeDictionary.get(course).get(levelAchievements)
            resultDict = {}
            filterID = dict((key,value) for key, value in achievementsDictionary.items() if key != studentID)
            if filterID!= {}:
                filterSum = sum((Counter(filterID[key]) for key in filterID), Counter())
                resultDict["successSum"] = filterSum.get("successSum")
                resultDict["failSum"] = filterSum.get("failSum")
                resultDict["averageTotalTime"] = int(round(filterSum.get("totalTime")/len(filterID)))
            return resultDict

        #Method 5: Creates a pie chart of the total Time Spent by individuals - where a portion is the time spent on failed attempts versus pure successful attempts to show learning curve
        #At the side, the total time spent by per student will also be shown
        #A second pie chart is also created to compare against this student as a good benchmark    
        """Not every student will have this chart as it is dependent on whether playtime details are recorded. 
        Comparison charts may not be available if no other students with the same level of achievement"""
        def creatingTimeSpentBreakdownAndComparisonAcrossCourse(consolidatedDict, rankTimeDictionary):
            print("5. Creating charts to show comparisons of time spent on codecombat assignments") 
            for course in consolidatedDict:
                if consolidatedDict.get(course).get("students"): #students exist
                    for student in consolidatedDict.get(course).get("students"):
                        if consolidatedDict.get(course).get("students").get(student).get("codeCombatData"):
                            levelAchievement = consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("totalAchievements")
                            if consolidatedDict[course]["students"][student].get("codeCombatDisplayData")==None:
                                consolidatedDict[course]["students"][student]["codeCombatDisplayData"]={}
                            consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timeBreakdown"] = {}
                            if consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("totalPlayTime") and consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("totalPlayTime")!=0:
                                consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timeBreakdown"]["total"] = consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("totalPlayTime")/60 #convert to minutes
                            
                            if (rankTimeDictionary.get(course) and (rankTimeDictionary.get(course).get(levelAchievement) and (rankTimeDictionary.get(course).get(levelAchievement).get(student) and rankTimeDictionary.get(course).get(levelAchievement).get(student).get("medianAttempts")))): #not all students are captured in the dictionary since there is no time
                                ownChartDetails = rankTimeDictionary.get(course).get(levelAchievement).get(student)
                                consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timeBreakdown"]["medianAttempts"] = rankTimeDictionary.get(course).get(levelAchievement).get(student).get("medianAttempts")
                                    #creating data for pie charts  
                                if ownChartDetails.get("successSum")!= None:
                                    if ownChartDetails.get("failSum")!= None:
                                        failSumOwn = ownChartDetails.get("failSum")!= None
                                    else:
                                        failSumOwn = 0
                                    ownTimeSum = ownChartDetails.get("successSum") + failSumOwn
                                    consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timeBreakdown"]["ownChart"] = {
                                            0:{"Name": "Successful", "Value": round(ownChartDetails.get("successSum")/ownTimeSum,2)},1:{"Name": "Fails", "Value": round(failSumOwn/ownTimeSum,2)}}
                                
                                comparisonResults = comparisonAggregateFilter(rankTimeDictionary, course, student, levelAchievement)                        
                                if comparisonResults.get("successSum")!=None:
                                    if comparisonResults.get("failSum")!= None:
                                        failSum = comparisonResults.get("failSum")
                                    else:
                                        failSum = 0
                                
                                    otherTimeSum = failSum + comparisonResults.get("successSum")
                                if comparisonResults !={}:
                                    consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timeBreakdown"]["averageTimeOthers"] = comparisonResults.get("averageTotalTime")
                                    if failSum!= None:
                                        consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timeBreakdown"]["comparisonChart"] = {
                                                0:{"Name": "Successful", "Value": round(comparisonResults.get("successSum")/otherTimeSum, 2)},1:{"Name": "Fails", "Value": round(failSum/otherTimeSum,2)}}
                                    else:
                                        consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timeBreakdown"]["comparisonChart"] = {
                                                0:{"Name": "Successful", "Value": round(comparisonResults.get("successSum")/otherTimeSum, 2)},1:{"Name": "Fails", "Value": 0}}                                
                            elif consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("medianAttempts"):
                                consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["timeBreakdown"]["medianAttempts"] = consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("medianAttempts")              
            return consolidatedDict

        def addMedianCodeCombat(consolidatedDict):
            for course in consolidatedDict:
                for student in consolidatedDict.get(course).get("students"):
                    if consolidatedDict.get(course).get("students").get(student).get("codeCombatData"):
                        if consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements"):
                            sumAttempts = 0
                            for level in consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements"):
                                sumAttempts+= consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("achievements").get(level).get("numAttempts")
                            consolidatedDict.get(course).get("students").get(student).get("codeCombatData")["medianAttempts"] = sumAttempts/ consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("totalAchievements")
            return consolidatedDict

        #Method 5: Given total achievements, filters dictionary for level of achievements more than or equal to achievements (helper function)
        def filterMinimumAchievements(rankDictionary, course, levelAchievements): #levelAchievements should be an int
            achievementsDictionary = rankDictionary.get(course)
            resultDict = {k:v for (k,v) in achievementsDictionary.items() if k >= levelAchievements}
            return resultDict

        #Method 6: Obtains data to display new "chart" aka statistics about level completion
            """Only students who have completed at least 1 codecombat level will be able to see this chart"""
        def createCodeCombatPerformanceChart(rankDictionary,consolidatedDict):
            print("6: Creating statistics for CodeCombat Performance relative to the course(Chart)")
            for course in consolidatedDict:
                if consolidatedDict.get(course).get("students"): #students exist
                    for student in consolidatedDict.get(course).get("students"):
                        if consolidatedDict.get(course).get("students").get(student).get("codeCombatData"):
                            if consolidatedDict[course]["students"][student].get("codeCombatDisplayData")==None:
                                consolidatedDict[course]["students"][student]["codeCombatDisplayData"]={}
                            consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["courseRankingChart"] = {}
                            levelAchievement = consolidatedDict.get(course).get("students").get(student).get("codeCombatData").get("totalAchievements")
                            consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["courseRankingChart"]["Maximum Attained Level"] = levelAchievement
                            courseSize = sum(len(v) for v in rankDictionary.get(course).values()) #assume this is not 0
                            moreThanEqualRank = filterMinimumAchievements(rankDictionary, course, levelAchievement)
                            rank =  sum(len(v) for v in moreThanEqualRank.values())
                            consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["courseRankingChart"]["Course Rank"] = rank
                            percentile = 100*((courseSize-rank)/courseSize)
                            consolidatedDict[course]["students"][student]["codeCombatDisplayData"]["courseRankingChart"]["Course Percentile"] = percentile
            return consolidatedDict
         
        def addCharts(consolidatedDict): 
            consolidatedDict = addMedianCodeCombat(consolidatedDict)
            consolidatedDict = dataCleansingRemoveEmptyCourses(consolidatedDict)
            consolidatedDict = createChartForTimeSpentPerLevelComparedToCourse(consolidatedDict)
            rankDictionaries = createRankAchievementsDictionary(consolidatedDict)
            consolidatedDict = creatingTimeSpentBreakdownAndComparisonAcrossCourse(consolidatedDict, rankDictionaries[1])
            consolidatedDict = createCodeCombatPerformanceChart(rankDictionaries[0],consolidatedDict)
            return consolidatedDict

        consolidatedData = addCharts(consolidatedDict)
        return consolidatedData

    data3 = internalRun4(data2)

    def internalRun5(compiledData):
        courseMembers = obtain_data("courseMembers.json")
        codeCombat = obtain_data("achievements-prod-userAchievements-export.json")

        def createAssignmentDict(dataInput, compiledData):
            print("Creating CC AssignmentDict")
            newLibrary = {}
            for course in compiledData:
                newLibrary[course] = {"CodeCombat":{"usersList": []}}
                counter = 0;
                for userID in dataInput[course]:
                    if dataInput[course][userID] == True:
                        counter += 1
                        newLibrary[course]["CodeCombat"]["usersList"] += [userID]
                newLibrary[course]["CodeCombat"]["totalUsers"] = counter
            return newLibrary

        lib = createAssignmentDict(courseMembers, compiledData)

        def createCompletionChart_Idv(lib, data):
            print("Creating completion chart, CC")
            for course in lib:
                lib[course]["CodeCombat"].update({"CompletionChartIdvAs":{}})
                for user in lib[course]["CodeCombat"]["usersList"]:
                    try:
                        saveUserData = data[user]['CodeCombat']
                        try:
                            # levelData for the user accessed
                            for typeData in saveUserData['achievements']:
                                # if level is completed, level data + 1 for each Indv CC assignment
                                if saveUserData['achievements'][typeData]['complete'] == True:
                                    try:
                                        location = lib[course]["CodeCombat"]["CompletionChartIdvAs"]
                                        deeplocation = location[typeData]
                                        deeplocation["Completed"] += 1
                                        deeplocation["Uncompleted"] -= 1
                                    except:
                                        levelName = saveUserData['achievements'][typeData]['name']
                                        location = lib[course]["CodeCombat"]["CompletionChartIdvAs"]
                                        totalUsers = lib[course]["CodeCombat"]["totalUsers"]
                                        usersUncompleted = totalUsers - 1
                                        location.update({typeData:{"Completed":1, "Uncompleted": usersUncompleted, "levelName":levelName}})
                        except:
                            continue
                    except:
                        continue
            return lib

        lib = createCompletionChart_Idv(lib, codeCombat)

        def createCompletionChart_Across(lib, data):
            print("Creating completion chart for overall")
            placeholder = {"AcrossLevelsChart":{}}
            for course in lib:
                placeholder["AcrossLevelsChart"].update({course:{}})
                for user in lib[course]["CodeCombat"]["usersList"]:
                    try:
                        saveUserData = data[user]['CodeCombat']
                        try:
                            # levelData for the user accessed
                            for typeData in saveUserData['achievements']:
                                # if level is completed, level data + 1 for each Indv CC assignment
                                if saveUserData['achievements'][typeData]['complete'] == True:
                                    try:
                                        deeplocation = placeholder["AcrossLevelsChart"][course][typeData]
                                        deeplocation["Completed"] += 1
                                    except:
                                        levelName = saveUserData['achievements'][typeData]['name']
                                        placeholder["AcrossLevelsChart"][course].update({typeData:{"LevelID": typeData,"Completed":1, "levelName":levelName}})
                        except:
                            continue
                    except:
                        continue
            return placeholder

        def compileCompletionChart_Across(lib, placeholder):
            print("Adding completion chart to library")
            for course in placeholder["AcrossLevelsChart"]:
                lib[course]["CodeCombat"].update({"AcrossLevelsChart":[]})
                for graphdata in placeholder["AcrossLevelsChart"][course]:
                    lib[course]["CodeCombat"]["AcrossLevelsChart"] += [placeholder["AcrossLevelsChart"][course][graphdata]]
            return lib


        placeholder = createCompletionChart_Across(lib, codeCombat)
        lib = compileCompletionChart_Across(lib, placeholder)

        def createFiveStats(lib, data):
            print("Creating five stats data")
            placeholder = {}
            for course in lib:
                placeholder[course] = {"Stats":{}}
                for user in lib[course]["CodeCombat"]["usersList"]:
                    try:
                        saveUserData = data[user]['CodeCombat']
                        try:
                            # levelData for the user accessed
                            for typeData in saveUserData['achievements']:
                                if saveUserData['achievements'][typeData]['complete'] == True:
                                    try:
                                        location = placeholder[course]["Stats"][typeData]
                                        completionTime = saveUserData['achievements'][typeData]['playtime']
                                        location["TimeArray"].append(completionTime)
                                    except:
                                        levelName = saveUserData['achievements'][typeData]['name']
                                        location = placeholder[course]["Stats"]
                                        completionTime = saveUserData['achievements'][typeData]['playtime']
                                        completeDataArray = [completionTime]
                                        location.update({typeData:{"LevelID":typeData, "TimeArray": completeDataArray, "Level Name":levelName}})
                        except:
                            continue
                    except:
                        continue
                #print(placeholder[course]["Stats"])
            return placeholder

        def creatingFiveStatsPart2(lib, data):
            print("Still processing...")
            tempData = {}
            for course in lib:
                tempData = {course:{"Stats":[]}}
                for level in data[course]["Stats"]:
                    location = tempData[course]["Stats"]
                    timeArray = data[course]["Stats"][level]["TimeArray"]
                    name = data[course]["Stats"][level]["Level Name"]
                    medianTime = statistics.median(timeArray)
                    varTime = statistics.pvariance(timeArray)
                    maxTime = max(timeArray)
                    minTime = min(timeArray)
                    sumTime = 0
                    for value in timeArray:
                        sumTime += value
                    levelDict = {"levelID" : level, "Level Name": name, "Median": medianTime, "Total TIme": sumTime, "Variance": varTime, "Maximum": maxTime, "Minimum": minTime}
                    location.append(levelDict)
            return tempData

        def combineFiveStatsData(lib, data):
            print("Combing Five stats data with library")
            for course in data:
                lib[course]["CodeCombat"].update({"FiveStats":[]})
                lib[course]["CodeCombat"]["FiveStats"] = data[course]["Stats"]
            return lib

        fivestats = createFiveStats(lib, codeCombat)
        fivestats2 = creatingFiveStatsPart2(lib, fivestats)
        lib = combineFiveStatsData(lib, fivestats2)

        def overallStats(lib, data):
            print("Getting overall course stats")
            tempData = {}
            for course in lib:
                minValue = 600000
                maxValue = -1
                medianArray = []
                meadianHard = -1
                medianEasy = 600000
                hardest = ""
                easiest = ""
                sumOverall = 0
                for level in data[course]["Stats"]:
                    timeArray = data[course]["Stats"][level]["TimeArray"]
                    name = data[course]["Stats"][level]["Level Name"]
                    maxTime = max(timeArray)
                    minTime = min(timeArray)
                    medianTime = statistics.median(timeArray)
                    medianArray.append(medianTime)
                    medianEasy = min(medianArray)
                    medianHard = max(medianArray)
                    sumTime = 0
                    for value in timeArray:
                        sumTime += value
                    sumOverall += sumTime
                    maxValue = max(maxValue, maxTime)
                    minValue = min(minValue, minTime)
                    if medianTime >= medianHard:
                        hardest = name
                    elif medianTime <= medianEasy:
                        easiest = name
                tempData.update({course: {"Minimum Overall": minValue, "Maximum Overall": maxValue, "Hardest Level": hardest, "Easiest Level": easiest, "Total Time Spend": sumOverall}})
            return tempData           

        def mergeOverallIntoLibrary(lib, data):
            print("Merging Overall Data into Library")
            for course in data:
                lib[course]["CodeCombat"].update({"Overall Course Data":{}})
                lib[course]["CodeCombat"]["Overall Course Data"] = data[course]
            return lib

        overallStatsData = overallStats(lib, fivestats)
        lib = mergeOverallIntoLibrary(lib, overallStatsData)

        def combineDatasets(lib, compiledData):
            print("Combining WriteData into database")
            for course in lib:
                compiledData[course]["CodeCombat"] = lib[course]["CodeCombat"]
            return compiledData

        compiledData = combineDatasets(lib, compiledData)

        return compiledData

    data4 = internalRun5(data3)

    def internalRun6(compiledData):

        assignmentsData = obtain_data("assignments.json")
        solutionData = obtain_data("solutions.json")
        courseMembers = obtain_data("courseMembers.json")
        users = obtain_data("users.json")
        
        def getUserFigure(data, compiledData):
            temp = {}
            for course in compiledData:
                temp.update({course:0})
                for member in data[course]:
                    if data[course][member] == True:
                        temp[course] += 1
            return temp

        totalStudents = getUserFigure(courseMembers, compiledData)

        def createAssDataNotProcess(compiledData):
            container = {}
            for course in compiledData:
                container[course] = {}
                container[course].update({"courseInfo":{"Charts":{}}})
            return container

        dataContainer = createAssDataNotProcess(compiledData)

        def getAssOpenData(container, data):
            temp = {}
            for course in container:
                temp.update({course:{}})
                temp[course].update({"Open":{}, "TotalAss": 0})
                for assignment in data[course]:
                    timeUnfiltered = data[course][assignment]["open"]
                    timeActual = convertTTimetoDatetime(timeUnfiltered)
                    temp[course]["Open"].update({assignment:timeActual})
                    temp[course]["TotalAss"] += 1
            return temp

        def getStuAssData(container, data, timeData):
            temp = {}
            for course in container:
                temp.update({course:{}})
                try:
                    for student in data[course]:
                        temp[course].update({student:{}})
                        temp[course][student].update({"Completed": 0})
                        temp[course][student].update({"Time":{}})
                        temp[course][student].update({"AvgTime":{}})
                        contain = []
                        try:
                            for assignment in data[course][student]:
                                temp[course][student]["Completed"] += 1
                                assignmentReleaseTime = timeData[course]["Open"][assignment]
                                studentFinishTime = data[course][student][assignment]["createdAt"]
                                studentTime = epoch2Datetime(studentFinishTime)
                                timeDiff = ((studentTime - assignmentReleaseTime).seconds)/60
                                timeinput = int(timeDiff)
                                temp[course][student]["Time"].update({assignment:timeinput})
                                contain.append(timeinput)
                            value = statistics.mean(contain)
                            temp[course][student]["AvgTime"] = value
                        except:
                            continue
                except:
                    continue
            return temp


        def getStudentTime(container, data, assData, users):
            temp = {}
            for course in container:
                temp.update({course:{}})
                temp[course].update({"student":{}})
                try:
                    for student in data[course]:
                        temp[course]["student"].update({student:{}})
                        temp[course]["student"][student].update({"assignmentAvgTime":0})
                        studentName = users[student]["displayName"]
                        temp[course]["student"][student].update({"name":studentName})
                        completedAss = data[course][student]["Completed"]
                        totalAss = assData[course]["TotalAss"]
                        completionRate2 = completedAss/totalAss
                        completionRate = float("{0:.4f}".format(completionRate2))
                        temp[course]["student"][student].update({"CompletionRate": completionRate})
                    try:
                        for student in data[course]:
                            timeArray = []
                            for assignment in data[course][student]["Time"]:
                                timeComplete = data[course][student]["Time"][assignment]
                                timeArray.append(timeComplete)
                                try:
                                    averageTime2 = statistics.mean(timeArray)
                                    averageTime = int(averageTime2)
                                    temp[course]["student"][student].update({"assignmentAvgTime":averageTime})
                                except:
                                    averageTime = 0
                                    temp[course]["student"][student].update({"assignmentAvgTime":averageTime})
                    except:
                        continue
                except:
                    continue
            #print(temp)
            return temp

        def getAssignmentDataContainer(container, assCont):
            temp = {}
            for course in container:
                temp.update({course:{}})
                temp[course].update({"courseInfo":{}})
                try:
                    for assignments in assCont[course]:
                        temp[course]["courseInfo"].update({assignments})
                except:
                    continue
            return temp

        def getAssignmentData(container, data):
            temp = {}
            for course in container:
                temp.update({course:{}})
                try:
                    for user in data[course]:
                        try:
                            for assignment in data[course][user]["Time"]:
                                temp[course].update({assignment:{}})
                                temp[course][assignment].update({"TimeArray":[]})
                                temp[course][assignment].update({"StudentsCompletion":0})
                            #print(temp[course])
                        except:
                            continue
                except:
                    continue
                try:
                    for user in data[course]:
                        try:
                            for assignment in data[course][user]["Time"]:
                                timing = data[course][user]["Time"][assignment]
                                #print(temp[course][assignment])
                                temp[course][assignment]["StudentsCompletion"] += 1
                                temp[course][assignment]["TimeArray"].append(timing)
                        except:
                            continue
                except:
                    continue
            #print(temp)
            return temp

        def getAssignmentData2(container, data):
            print("Getting assignment scatter chart")
            temp = {}
            for course in container:
                temp.update({course:{}})
                try:
                    for assignment in data[course]:
                        temp[course].update({assignment:{}})
                        temp[course][assignment].update({"Completion Rate":0})
                        temp[course][assignment].update({"Average Time":0})
                except:
                    continue
                try:
                    totalStudentsInCourse = totalStudents[course]
                    for assignment in data[course]:
                        timeArray = data[course][assignment]
                        totalStudentsComplete = data[course][assignment]["StudentsCompletion"]
                        percentComplete2 = totalStudentsComplete/totalStudentsInCourse
                        percentComplete = float("{0:.4f}".format(percentComplete2))
                        temp[course][assignment]["Completion Rate"] = percentComplete
                        timeArrayData = data[course][assignment]["TimeArray"]
                        timeMean2 = statistics.mean(timeArrayData)
                        timeMean = int(timeMean2)
                        temp[course][assignment]["Average Time"] = timeMean
                except:
                    continue
            return temp

        AssignmentOpenData = getAssOpenData(dataContainer, assignmentsData)
        StudentUnfilterData = getStuAssData(dataContainer, solutionData, AssignmentOpenData)
        StudentData = getStudentTime(dataContainer, StudentUnfilterData, AssignmentOpenData, users)
        AssignmentDataCont = getAssignmentDataContainer(dataContainer, assignmentsData)
        AssignmentData = getAssignmentData(AssignmentDataCont, StudentUnfilterData)
        AssignmentData2 = getAssignmentData2(AssignmentDataCont, AssignmentData)

        def combineData(compiledData, stuData, assData, users):
            print("Combining Data Again...")
            for course in compiledData:
                for student in compiledData[course]["students"]:
                    try:
                        dataPoint = stuData[course]["student"][student]
                        compiledData[course]["courseInfo"]["Charts"].update({"ScatterStudent":[]})
                    except:
                        continue
                for student in compiledData[course]["students"]:
                    try:
                        dataPoint = stuData[course]["student"][student]
                        compiledData[course]["courseInfo"]["Charts"]["ScatterStudent"].append(dataPoint)
                        #print(dataPoint)
                    except:
                        continue
                for assignment in compiledData[course]["assignments"]:
                    try:
                        dataPoint = assData[course][assignment]
                        compiledData[course]["courseInfo"]["Charts"].update({"ScatterAss":[]})
                    except:
                        continue
                for assignment in compiledData[course]["assignments"]:
                    try:
                        dataPoint = assData[course][assignment]
                        compiledData[course]["courseInfo"]["Charts"]["ScatterAss"].append(dataPoint)
                    except:
                        continue
            return compiledData

        compiledData = combineData(compiledData, StudentData, AssignmentData2, users)

        def printChecker(data, assignmentData):
            temp = {}
            temp2 = {}
            for courseID in data:
                #Create Temp Dict
                temp.update({courseID:{}})
                temp2.update({courseID:{}})
                #Create nested Dict
                try:
                    arrayOrder = []
                    dictOrder = {}
                    for assignmentID in data[courseID]["assignments"]:
                        try:
                            orderIndex = assignmentData[courseID][assignmentID]["orderIndex"]
                            temp[courseID].update({orderIndex:assignmentID})
                            data[courseID]["assignments"][assignmentID].update({"orderIndex":0})
                            arrayOrder += [orderIndex]
                        except:
                            continue
                    arrayOrder.sort()
                    for i in range(0,len(arrayOrder)):
                        assignmentID = temp[courseID][arrayOrder[i]]
                        temp2[courseID].update({assignmentID:i+1})
                except:
                    continue
            return temp2

        def mergeDictChecker(data, temp2):
            for courseID in data:
                try:
                    for assignmentID in data[courseID]["assignments"]:
                        try:
                            orderIndex = temp2[courseID][assignmentID]
                            data[courseID]["assignments"][assignmentID]["orderIndex"] = orderIndex
                        except:
                            continue
                        #print(data[courseID]["assignments"][assignmentID]["orderIndex"])
                except:
                    continue
            return data

        temp2Dict = printChecker(compiledData, assignmentsData)

        finalData = mergeDictChecker(compiledData, temp2Dict)
        return finalData
        
    data5 = internalRun6(data4)
    write_to_firebase(data5,url)
    print("Time to write to course.json")
    print("--- %s seconds ---" % (time.time() - start_time))

    def internalRunCCJson(schoolDictSource):
        
        def retrieveCodeCombatData(schoolDictSource):
            print("Creating cross course comparison data in Bar Chart Format")
            temp = {}
            temp.update({"AverageTimePerStudent":{}})
            temp.update({"AverageTimePerLevel":{}})
            temp.update({"AverageLevelPerStudent":{}})
            temp2 = {}
            temp2.update({"AverageTimePerStudent":[]})
            temp2.update({"AverageTimePerStudentSummaryStats":{}})
            temp2.update({"AverageTimePerStudentStrongest5":[]})
            temp2.update({"AverageTimePerStudentWeakest5":[]})
            temp2.update({"AverageTimePerLevel":[]})
            temp2.update({"AverageTimePerLevelSummaryStats":{}})
            temp2.update({"AverageTimePerLevelStrongest5":[]})
            temp2.update({"AverageTimePerLevelWeakest5":[]})
            temp2.update({"AverageLevelPerStudent":[]})
            temp2.update({"AverageLevelPerStudentSummaryStats":{}})
            temp2.update({"AverageLevelPerStudentStrongest5":[]})
            temp2.update({"AverageLevelPerStudentWeakest5":[]})
            for courseID in schoolDictSource:
                courseName = schoolDictSource[courseID]["courseInfo"]["name"]
                totalTime = schoolDictSource[courseID]["CodeCombat"]["Overall Course Data"]["Total Time Spend"]
                totalStudents = schoolDictSource[courseID]["CodeCombat"]["totalUsers"]
                totalLevelsAllStudents = 0
                for item in schoolDictSource[courseID]["CodeCombat"]["AcrossLevelsChart"]:
                    totalLevelsAllStudents += item["Completed"]
                totalLevels = len(schoolDictSource[courseID]["CodeCombat"]["AcrossLevelsChart"])
                if totalTime == 0 or totalStudents == 0 or totalLevels == 0:
                    barData = {"Course": courseName, "value": 0}
                    if 0 in temp["AverageTimePerStudent"]:
                        temp["AverageTimePerStudent"][0].update(barData)
                    elif 0 not in temp["AverageTimePerStudent"]:
                        temp["AverageTimePerStudent"].update({0:{}})
                        temp["AverageTimePerStudent"][0].update(barData)
                    if 0 in temp["AverageTimePerLevel"]:
                        temp["AverageTimePerLevel"][0].update(barData)
                    elif 0 not in temp["AverageTimePerLevel"]:
                        temp["AverageTimePerLevel"].update({0:{}})
                        temp["AverageTimePerLevel"][0].update(barData)
                    if 0 in temp["AverageLevelPerStudent"]:
                        temp["AverageLevelPerStudent"][0].update(barData)
                    elif 0 not in temp["AverageLevelPerStudent"]:
                        temp["AverageLevelPerStudent"].update({0:{}})
                        temp["AverageLevelPerStudent"][0].update(barData)
                else:
                    averageTimeLevel = round(totalTime/totalLevelsAllStudents, 2)
                    averageTimeStudent = round(totalTime/totalStudents,2)
                    averageLevelStudent = round(totalLevelsAllStudents/totalStudents,2)
                    barDataLevel = {"Course": courseName, "value": round(averageTimeLevel/60,2)}
                    barDataStudent = {"Course": courseName, "value": round(averageTimeStudent/60,2)}
                    barDataLevelPStudent = {"Course": courseName, "value": averageLevelStudent}
                    if averageTimeStudent in temp["AverageTimePerStudent"]:
                        temp["AverageTimePerStudent"][averageTimeStudent].update(barDataStudent)
                    elif averageTimeStudent not in temp["AverageTimePerStudent"]:
                        temp["AverageTimePerStudent"].update({averageTimeStudent:{}})
                        temp["AverageTimePerStudent"][averageTimeStudent].update(barDataStudent)
                        
                    if averageLevelStudent in temp["AverageLevelPerStudent"]:
                        temp["AverageLevelPerStudent"][averageLevelStudent].update(barDataLevelPStudent)
                    elif averageLevelStudent not in temp["AverageLevelPerStudent"]:
                        temp["AverageLevelPerStudent"].update({averageLevelStudent:{}})
                        temp["AverageLevelPerStudent"][averageLevelStudent].update(barDataLevelPStudent)
                        
                    if averageTimeLevel in temp["AverageTimePerLevel"]:
                        temp["AverageTimePerLevel"][averageTimeLevel].update(barDataLevel)
                    elif averageTimeLevel not in temp["AverageTimePerLevel"]:
                        temp["AverageTimePerLevel"].update({averageTimeLevel:{}})
                        temp["AverageTimePerLevel"][averageTimeLevel].update(barDataLevel)

            averageTimeStudent = temp["AverageTimePerStudent"]
            averageTimeStudent = sorted(averageTimeStudent.items(), key=itemgetter(0), reverse = True)
            for item in averageTimeStudent:
                itemObject = item[1]
                temp2["AverageTimePerStudent"].append(itemObject)
            strongest5TPS = temp2["AverageTimePerStudent"][:5]
            
            strongestTPS = temp2["AverageTimePerStudent"][0]
            weakestTPS = temp2["AverageTimePerStudent"][-1]
            TPSmid = round(len(temp2["AverageTimePerStudent"]) / 2)
            averageTPS = temp2["AverageTimePerStudent"][TPSmid]
            calculationArray = []
            for item in temp2["AverageTimePerStudent"]:
                value = item["value"]
                calculationArray.append(value)
            sdTPS = round(statistics.stdev(calculationArray),2)
            varTPS = round(statistics.variance(calculationArray),2)
            temp2["AverageTimePerStudentSummaryStats"].update({"StandardDeviationStats":{}})
            temp2["AverageTimePerStudentSummaryStats"]["StandardDeviationStats"].update({"Standard Deviation": sdTPS, "Variance": varTPS})
            temp2["AverageTimePerStudentSummaryStats"].update({"WeakestData":{}})
            temp2["AverageTimePerStudentSummaryStats"]["WeakestData"].update({"WeakestSchool": weakestTPS["Course"], "Timing": weakestTPS["value"]})
            temp2["AverageTimePerStudentSummaryStats"].update({"StrongestData":{}})
            temp2["AverageTimePerStudentSummaryStats"]["StrongestData"].update({"StrongestSchool": strongestTPS["Course"], "Timing": strongestTPS["value"]})
            temp2["AverageTimePerStudentSummaryStats"].update({"AverageData":{}})
            temp2["AverageTimePerStudentSummaryStats"]["AverageData"].update({"AverageSchool": averageTPS["Course"], "Timing": averageTPS["value"]})
            
            temp2["AverageTimePerStudentStrongest5"] = strongest5TPS
            weakest5TPS = temp2["AverageTimePerStudent"][-5:]
            temp2["AverageTimePerStudentWeakest5"] = weakest5TPS
            
            averageLevelStudent = temp["AverageLevelPerStudent"]
            averageLevelStudent = sorted(averageLevelStudent.items(), key=itemgetter(0), reverse = True)
            for item in averageLevelStudent:
                itemObject = item[1]
                temp2["AverageLevelPerStudent"].append(itemObject)
            strongest5LPS = temp2["AverageLevelPerStudent"][:5]

            strongestTPS = temp2["AverageLevelPerStudent"][0]
            weakestTPS = temp2["AverageLevelPerStudent"][-1]
            TPSmid = round(len(temp2["AverageLevelPerStudent"]) / 2)
            averageTPS = temp2["AverageLevelPerStudent"][TPSmid]
            calculationArray = []
            for item in temp2["AverageLevelPerStudent"]:
                value = item["value"]
                calculationArray.append(value)
            sdTPS = round(statistics.stdev(calculationArray),2)
            varTPS = round(statistics.variance(calculationArray),2)
            temp2["AverageLevelPerStudentSummaryStats"].update({"StandardDeviationStats":{}})
            temp2["AverageLevelPerStudentSummaryStats"]["StandardDeviationStats"].update({"Standard Deviation": sdTPS, "Variance": varTPS})
            temp2["AverageLevelPerStudentSummaryStats"].update({"WeakestData":{}})
            temp2["AverageLevelPerStudentSummaryStats"]["WeakestData"].update({"WeakestSchool": weakestTPS["Course"], "Levels": weakestTPS["value"]})
            temp2["AverageLevelPerStudentSummaryStats"].update({"StrongestData":{}})
            temp2["AverageLevelPerStudentSummaryStats"]["StrongestData"].update({"StrongestSchool": strongestTPS["Course"], "Levels": strongestTPS["value"]})
            temp2["AverageLevelPerStudentSummaryStats"].update({"AverageData":{}})
            temp2["AverageLevelPerStudentSummaryStats"]["AverageData"].update({"AverageSchool": averageTPS["Course"], "Levels": averageTPS["value"]})
            
            temp2["AverageLevelPerStudentStrongest5"] = strongest5LPS
            weakest5LPS = temp2["AverageLevelPerStudent"][-5:]
            temp2["AverageLevelPerStudentWeakest5"] = weakest5LPS
            
            averageTimePLevel = temp["AverageTimePerLevel"]
            averageTimePLevel = sorted(averageTimePLevel.items(), key=itemgetter(0), reverse = True)
            for item in averageTimePLevel:
                itemObject = item[1]
                temp2["AverageTimePerLevel"].append(itemObject)
            strongest5TPL = temp2["AverageTimePerLevel"][:5]

            strongestTPS = temp2["AverageTimePerLevel"][0]
            weakestTPS = temp2["AverageTimePerLevel"][-1]
            TPSmid = round(len(temp2["AverageTimePerLevel"]) / 2)
            averageTPS = temp2["AverageTimePerLevel"][TPSmid]
            calculationArray = []
            for item in temp2["AverageTimePerLevel"]:
                value = item["value"]
                calculationArray.append(value)
            sdTPS = round(statistics.stdev(calculationArray),2)
            varTPS = round(statistics.variance(calculationArray),2)
            temp2["AverageTimePerLevelSummaryStats"].update({"StandardDeviationStats":{}})
            temp2["AverageTimePerLevelSummaryStats"]["StandardDeviationStats"].update({"Standard Deviation": sdTPS, "Variance": varTPS})
            temp2["AverageTimePerLevelSummaryStats"].update({"WeakestData":{}})
            temp2["AverageTimePerLevelSummaryStats"]["WeakestData"].update({"WeakestSchool": weakestTPS["Course"], "Time": weakestTPS["value"]})
            temp2["AverageTimePerLevelSummaryStats"].update({"StrongestData":{}})
            temp2["AverageTimePerLevelSummaryStats"]["StrongestData"].update({"StrongestSchool": strongestTPS["Course"], "Time": strongestTPS["value"]})
            temp2["AverageTimePerLevelSummaryStats"].update({"AverageData":{}})
            temp2["AverageTimePerLevelSummaryStats"]["AverageData"].update({"AverageSchool": averageTPS["Course"], "Time": averageTPS["value"]})
            
            temp2["AverageTimePerLevelStrongest5"] = strongest5TPL
            weakest5TPL = temp2["AverageTimePerLevel"][-5:]
            temp2["AverageTimePerLevelWeakest5"] = weakest5TPL
            return temp2

        codeCombatData = retrieveCodeCombatData(schoolDictSource)
        return codeCombatData
    
    CCJsonData = internalRunCCJson(data5)
    print("Time to write to CodeCombat.json")
    print("--- %s seconds ---" % (time.time() - start_time))

    def internalRunCohortMetrics(compiledCourseData):
        
        cohortData = obtain_data("cohortCourses.json")
        cohortsList = obtain_data("cohorts.json")

        #Function 1 to create a list of instructors for each cohort and their ID
        def addInstructorInformation(compiledCourseData):
            print("Creating dictionary of instructor name and ids")
            instructorlist = {}
            for course in compiledCourseData:
                if compiledCourseData.get(course).get("courseInfo"):
                    instructorlist[compiledCourseData.get(course).get("courseInfo").get("instructorName")] = compiledCourseData.get(course).get("courseInfo").get("owner")
            return instructorlist

        #Function 2 to create cohorts
        def addCohorts(cohortData, cohortsList,instructorlist,compiledCourseData):
            print("ADDING BASIC COHORT INFORMATION")
            cohortDictionary = {}
            for cohort in cohortData:
                if cohort!="-L6pTo-0a0LlP87H2Tir": #used to test
                    cohortDictionary[cohort] = {}
                    cohortDictionary[cohort]["cohortName"] = cohortsList.get(cohort).get("name")
                    cohortDictionary[cohort]["administratorID"] = cohortsList.get(cohort).get("owner")
                    cohortDictionary[cohort]["instructor"] = cohortsList.get(cohort).get("instructorName")
                    cohortDictionary[cohort]["instructorID"] = instructorlist.get(cohortsList.get(cohort).get("instructorName")) #for easy view restriction
                    if cohortData.get(cohort): #cohort is not empty
                        courselist = []
                        cohortStuSize = 0
                        for course in cohortData[cohort]:
                            courselist.append(course)
                            if compiledCourseData.get(course):
                                if compiledCourseData.get(course).get("courseInfo").get("courseSize"):
                                    cohortStuSize+= compiledCourseData.get(course).get("courseInfo").get("courseSize")
                        numCourses = len(courselist)
                        cohortDictionary[cohort]["courses"] = courselist
                        cohortDictionary[cohort]["cohortSize"] = numCourses
                        cohortDictionary[cohort]["studentsSize"] = cohortStuSize
                        cohortDictionary[cohort]["averageSizePerCourse"] = cohortStuSize/numCourses
            return cohortDictionary

        instructorlist = addInstructorInformation(compiledCourseData)
        cohortDictionary = addCohorts(cohortData, cohortsList,instructorlist,compiledCourseData)
        return cohortDictionary

    cohortMetric = internalRunCohortMetrics(data5)
    write_to_firebase(cohortMetric,url3)
    print("Time to write to Cohort.json")

    def internalRunCohortMetrics2(cohortData, prevData, CCJsonData, url5):
        
        #Method 1: Average & Median Time Spent Per Person For the Cohort
        #Data is obtained by adding all the time spent by each student
        #This data will only be codecombat data because currently, 
        #only codecombat data is available (time)
        CCJsonData.update({"MaxLevels75Course":{}})

        def averageMedianTimeSpentCCChart(cohortData, prevData):
            print("7. Add averageTimeSpent Cohort Chart & averageTimePerLevel")
            #AverageTimePerStudent will be a line chart
            #AverageTimePerStudentPerLevel will be a stacked bar chart
            timeTakenDictionary = {}
            for cohort in cohortData:
                timeTakenDictionary[cohort] = {}
                timeTaken = []
                timeTakenLevel = []
                for cohcourse in cohortData.get(cohort).get("courses"): #loop through array
                    cohcourseData = prevData.get(cohcourse)
                    if cohcourseData:
                        if cohcourseData.get("students"):
                            for student in cohcourseData.get("students"):
                                if cohcourseData.get("students").get(student).get("codeCombatData"):
                                    if cohcourseData.get("students").get(student).get("codeCombatData").get("totalPlayTime"):
                                        timeTaken.append(cohcourseData.get("students").get(student).get("codeCombatData").get("totalPlayTime"))
                                        timeTakenLevel.append(cohcourseData.get("students").get(student).get("codeCombatData").get("totalPlayTime")/cohcourseData.get("students").get(student).get("codeCombatData").get("totalAchievements"))
                    
                    #calculate median, average time taken
                    if timeTaken != []:
                        numpyArray = np.array(timeTaken)
                        numpyArray = np.trim_zeros(np.sort(numpyArray))       
                        median =math.ceil(np.median(numpyArray).item()/360) #In Hours
                        mean = math.ceil(np.mean(numpyArray).item()/360) #In Hours
                        timeTakenDictionary[cohort]["medianTime"] = median
                        timeTakenDictionary[cohort]["averageTime"] = mean
                    
                    if timeTakenLevel!= []:
                        numpyTimeLevel = np.array(timeTakenLevel)
                        numpyTimeLevel = np.trim_zeros(np.sort(numpyTimeLevel))
                        medianLevel = math.ceil(np.median(numpyTimeLevel).item()/60) #in minutes
                        meanLevel = math.ceil(np.mean(numpyTimeLevel).item()/60) #in minutes
                        minLevel = math.ceil(np.amin(numpyTimeLevel).item()/60) #in minutes
                        maxLevel = math.ceil(np.amax(numpyTimeLevel).item()/60) #in minutes
                        timeTakenDictionary[cohort]["medianTimeLevel"] = medianLevel
                        timeTakenDictionary[cohort]["averageTimeLevel"] = meanLevel
                        timeTakenDictionary[cohort]["minTimeLevel"] = minLevel
                        timeTakenDictionary[cohort]["maxTimeLevel"] = maxLevel
                    #average time spent per level 
            return timeTakenDictionary

        #Method 2
        #This method loops through the course information to obtain the highest number of levels completed by at least 80% of the course
        #assumes completion rate should fall with number of levels
        #data form is a dictionary of courseID: max number of levels completed by at 75% of the course(int). 
        #DATA MAY NOT EXIST if no codecombat data
        def compileMaximumLevelPerCourse(prevData):
            print("CREATING A DICTIONARY FOR MAX LEVELS COMPLETED BY >75% OF COURSE")
            courseMaxLevelAchievement = {}
            for course in prevData:
                if prevData.get(course).get("students"):
                    maximumAchievement = 0
                    for student in prevData.get(course).get("students"):
                        if prevData.get(course).get("students").get(student).get("codeCombatData"): #cc data exists
                            if prevData.get(course).get("students").get(student).get("codeCombatData").get("totalAchievements"):
                                if prevData.get(course).get("students").get(student).get("codeCombatData").get("totalAchievements")>maximumAchievement:
                                    maximumAchievement = prevData.get(course).get("students").get(student).get("codeCombatData").get("totalAchievements")
                    if maximumAchievement!=0:
                        courseLevel = [ 0 for i in range(maximumAchievement) ] #set courseLevelSize START from 1
                        
                        for student in prevData.get(course).get("students"):
                            if prevData.get(course).get("students").get(student).get("codeCombatData"): #cc data exists
                                if prevData.get(course).get("students").get(student).get("codeCombatData").get("totalAchievements"):
                                    achievementMax = prevData.get(course).get("students").get(student).get("codeCombatData").get("totalAchievements")
                                    for i in range(0,achievementMax): #first is 1 level
                                        courseLevel[i] = courseLevel[i]+1
                        courseSize = prevData.get(course).get("courseInfo").get("courseSize")
                        percentCourse = [(x / courseSize*100) for x in courseLevel] #*100 to convert into a percentage of sort
                        #loop through and get the maximum now
                        previousMax = 1
                        for i in range(maximumAchievement):
                            val = percentCourse[i]
                            if val>=75:
                                if i!=0:
                                    previousMax+=1
                        courseMaxLevelAchievement[course] = previousMax
            return courseMaxLevelAchievement
        
        def DictToChartArray(dictionary,prevData):
            array =[]
            for k,v in dictionary.items():
                coursename = prevData[k]["courseInfo"]["name"]
                array.append({"Course": coursename, "value": v})
            #array = sorted(array.items(), key=itemgetter(0), reverse = True)
            array = sorted(array, key = lambda val: val['value'], reverse = True)
            return array
            

        #Method 3
        #This method loops through the data to obtain the max number of levels completed by at 75% of the cohort
        #data form is v similar to method 2
            
        def compileMaximimumLevelPerCohort(courseMaxLevelAchievement):
            print("CREATING A DICTIONARY FOR MAX LEVELS COMPLETED BY >75% OF COHORT")
            cohortMaxLevelAchievement = {}
            for cohort in cohortData:
                maximumAchievement = 0
                for cohcourse in cohortData.get(cohort).get("courses"): 
                    if(courseMaxLevelAchievement.get(cohcourse)):
                        if(courseMaxLevelAchievement.get(cohcourse)>maximumAchievement):
                            maximumAchievement = courseMaxLevelAchievement.get(cohcourse)
                if maximumAchievement!=0:
                    cohortLevel = [ 0 for i in range(maximumAchievement) ] #set courseLevelSize START from 1
                    for cohcourse in cohortData.get(cohort).get("courses"):
                        if(courseMaxLevelAchievement.get(cohcourse)): #dic key exists
                            achievementMax =  courseMaxLevelAchievement.get(cohcourse)
                            for i in range(0,achievementMax): #first is 1 level
                                cohortLevel[i] = cohortLevel[i]+1
                    cohortSize = len(cohortData.get(cohort).get("courses"))
                    percentCourse = [(x / cohortSize*100) for x in cohortLevel] #*100 to convert into a percentage of sort
                    #loop through and get the maximum now
                    previousMax = 1
                    for i in range(maximumAchievement):
                        val = percentCourse[i]
                        if val>=75:
                            if i!=0:
                                previousMax+=1
                    cohortMaxLevelAchievement[cohort] = previousMax
            return cohortMaxLevelAchievement

        timeCohortCharts = averageMedianTimeSpentCCChart(cohortData, prevData)
        courseMaxLevelAchievementDict =compileMaximumLevelPerCourse(prevData)
        courseMaxLevelAchievement = DictToChartArray(courseMaxLevelAchievementDict,prevData)
        cohortMaxLevelAchievement = compileMaximimumLevelPerCohort(courseMaxLevelAchievementDict)
        CCJsonData["MaxLevels75Course"] = courseMaxLevelAchievement
        MLSmid = round(len(courseMaxLevelAchievementDict.keys()) / 2)
        averageMLS = CCJsonData["MaxLevels75Course"][MLSmid]
        SDcalculationArray = []
        for item in CCJsonData["MaxLevels75Course"]:
            value = item["value"]
            SDcalculationArray.append(value)
        sdMLS = round(statistics.stdev(SDcalculationArray),2)
        CCJsonData["MaxLevels75CourseSummaryStats"] ={"AverageData":{"AverageSchool": averageMLS["Course"], "Level": averageMLS["value"]},"StandardDeviationStats":{"Standard Deviation": sdMLS}}
        
        def addCohortCharts(cohortMaxLevelAchievement,timeCohortCharts, cohortData):
            print("Adding cohort charts and write to firebase")
            cohortCharts = {}
            cohortCharts["timeComparisonStats"] = {}
            cohortNum = 0
            cohortCharts["timeComparisonChart"]= [] 
            for cohort in cohortData:
                cohortCharts["timeComparisonStats"][cohort] = {}
                cohortCharts["timeComparisonStats"][cohort]["instructor"] = cohortData.get(cohort).get("instructor")
                cohortCharts["timeComparisonStats"][cohort]["size"] = cohortData.get(cohort).get("cohortSize")
                cohortCharts["timeComparisonStats"][cohort]["maxLevel75"] = cohortMaxLevelAchievement.get(cohort)
                cohortCharts["timeComparisonStats"][cohort]["AverageTime"] = timeCohortCharts.get(cohort).get('averageTime')
                cohortCharts["timeComparisonStats"][cohort]["MedianTime"] = timeCohortCharts.get(cohort).get('medianTime')
                cohortCharts["timeComparisonStats"][cohort]["name"] = cohortData.get(cohort).get("cohortName")
                cohortCharts["timeComparisonStats"][cohort]["averageSizePerCourse"] = cohortData.get(cohort).get("averageSizePerCourse")
                data1 = {}
                data1["Label"] = cohortData.get(cohort).get("cohortName")
                data1["id"] = cohort
                data1['Cohort Average Time Per Level'] = timeCohortCharts.get(cohort).get('averageTimeLevel')
                data1['Cohort Maximum Time Per Level'] = timeCohortCharts.get(cohort).get('maxTimeLevel')
                data1['Cohort Median Time Per Level'] = timeCohortCharts.get(cohort).get('medianTimeLevel')
                data1['Cohort Minimum Time Per Level'] = timeCohortCharts.get(cohort).get('minTimeLevel')
                data1["Order"] = cohortNum+1
                cohortCharts["timeComparisonChart"].append(data1)
                cohortNum+=1    
            return cohortCharts
        cohortCharts = addCohortCharts(cohortMaxLevelAchievement,timeCohortCharts, cohortData)
        write_to_firebase(cohortCharts,url5)
        return CCJsonData

    CCJsonData2 = internalRunCohortMetrics2(cohortMetric, data5, CCJsonData, url5)
    write_to_firebase(CCJsonData2 ,url2)
    print("Time to write to Cohort.json")

    print("Add updated time")
    singaporeTime = timezone("Asia/Singapore")
    updateTime = datetime.now(singaporeTime).strftime('%Y-%m-%d %H:%M:%S')
    write_to_firebase({"updateTime":updateTime},url4)
    print("--- %s seconds ---" % (time.time() - start_time))

run()
