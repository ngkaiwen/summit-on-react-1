![LoadingScreen](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/LoadingScreen.png?raw=true)

# Welcome to Summit Analytics

## About
<font color= 00ced1> **Summit Analytics** </font> is a web application that empowers educators from the National University of Singapore to make more informed decisions when crafting lessons and assignments. Educators can look forward to various analytical features that will allow them to tailor their module content to their students’ needs. The application also allows educators to better track the progress of their students based on data visualizations and statistics.

## Content Page

1. [About](https://github.com/TheIanSim/summit-on-react#about)
2. [User Guide for Administrators](https://github.com/TheIanSim/summit-on-react#user-guide)



## User Guide for Administrators

1. [Login and Authentication](https://github.com/TheIanSim/summit-on-react#login-and-authentication)
2. [Overview Screen](https://github.com/TheIanSim/summit-on-react#overview-screen)
3. [Students Screen](https://github.com/TheIanSim/summit-on-react#students-screen)

### Login and Authentication

When you first access <font color= 00ced1> **Summit Analytics** </font>, this is the front page of our application.

![SplashScreen](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/SplashScreen.png?raw=true)

By pressing the login button, you will arrive at the login screen. You must enter your **credentials** to access the application.

![LoginScreen](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/LoginScreen.png?raw=true)

### Overview Screen

After logging in with your  <font color= 00ced1> credentials </font>, you will arrive at this screen below:

![OverviewPage1](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/OverviewPage1.png?raw=true)

This is the **Overview Screen**. The inital data loaded is the **Students Overall Data**. This screen loads the following data: 

* Total number of students in the course
* The weakest performers <font color= CCCC00> (bottom 5) </font> of the course
* Overall assignment data per student scatter diagram

![OverviewPage1Chart](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/OverviewPage1Chart.png?raw=true)

Intepreting the **Overall Assignment Data per Student** chart:
>A student who appears on the top left corner of the chart is weaker, as this meant that he spent a lot of time on finishing the assignments, and he also did not complete much assignments. 

>Vice versa, a student who appears on the bottom right corner of the chart is a stronger student as he completes more assignments, and at a faster completion time.


By scrolling down, you will now arrive at the **Assignment Overview Screen**.

![OverviewPage2](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/OverviewPage2.png?raw=true)

The **Assignment Overview Screen** loads the overall data specific to the course. The following data are loaded:

* Total number of assignments in the course
* The assignment release time series
* Overall student data per assignment scatter diagram

![OverviewPage2Chart](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/OverviewPage2Chart.png?raw=true)

Intepreting the **Overall Student per Assignment** chart:
>An assignment that appears on the top left corner of the chart may be a more diffucult assignment, as it takes longer to complete on average, and that there is a lower completion rate as well, indicating that less students has completed it.

>Vice versa, an assignment that appears on the bottom right corner of the chart may be an easier assignment, as it takes shorter to complete on average, and that there is a higher completion rate as well, indicating that more students has completed it.

Scroling down further, we reach the **Code Combat Overview Data**, with this loading screen.

![OverviewPage3](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/OverviewPage3.png?raw=true)

Select a level to load the data. 

![OverviewPage3b](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/OverviewPage3b.png?raw=true)

The following data are now loaded:

* Student completion rate pie chart
* Cross level comparison chart
* Overall statistics

Since the **Cross Level Comparison** chart may be a bit dense due to so much information, we may hover our mouse to view the number of students who completed the codecombat level, as seen in the chart below.

![OverviewPage3Chart](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/OverviewPage3Chart.png?raw=true)

### Students Screen

Clicking on the **Students** tab then selecting a student would load the following screen.

![StudentsPage1](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/StudentsPage1.png?raw=true)

The **Students Page** loads the following data regarding assigments:
 
 * Submissions of assignment over time
 * Assignment submission status pie chart indicating percentage of assignments submitted
 * Completion time percentile per assignment

![StudentsPages1Chart2](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/StudentsPage1Chart2.png?raw=true)
 
Intepreting the **Submissions (of Assignment) over Time** chart:
>The orange timeseries represents the course average rate of submission over time, while the green timeseries represents the student's submission of assignment over time. If the green timeseries is higher than the orange timeseries, then it meant that the student has submitted the assignments earlier than majority of the cohort.
>Vice versa, if the green timeseries is lower than the orange timeseries, then it meant that the student has submitted the assignments later than majority of the cohort.

![StudentsPages1Chart1](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/StudentsPage1Chart1.png?raw=true)
 
Intepreting the **Completion Time Percentile per Assignment** chart:
>If the assignment submission percentile point is above the 50% completion time percentile, this meant that the student has submitted the assignment ahead of majority of the cohort
>Vice versa, if the assigment submission percentile point is below the 50% completion time percentile, then the student has submitted the assignment behind majority of the cohort.
>The percentile metric by the side of the graph indicates the overall performance of the student. A higher percentile metric meant the student submits all the assignments on a faster time than their peers.

![StudentsPage2](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/StudentsPage2.png?raw=true)

Scrolling down, the **Students Page** loads the following data regarding Code Combat:
 
 * Ranking based on codecombat achievements
 * Breakdown of time (efficiency) spent on code combat, with comparison to similar students
 * Relative Time Spent per Code Combat Level

![StudentsPage2Chart](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/StudentsPage2Charts.png?raw=true)

Intepreting the **Relative Time Spent per Code Combat Level** chart:
>The blue curve signifies the performance of the student with time as a metric. If the student is the slowest performer for the level, then the blue curve would touch the top of the red bar.
>Vice versa, if the student is the fastest performer for the level, then the blue curve would touch the top of the green bar.

### Assignments Screen

Clicking on the **Assignments** tab would load the following screen.

![AssignmentsPage1](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/AssignmentsPage1.png?raw=true)

![AssignmentsPage2](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/AssignmentsPage2.png?raw=true)

Clicking on an assignment would load the **Assignment Specific** data as seen:

* Details, which loads the visibility, released date, deadline, and type of problem
* Submission rate pie chart for assignment
* List of students who have submitted and not submitted the assignment
* Submission rate time series
* Youtube Video Analysis of Student Pause Timings

![AssignmentsPage2Chart](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/AssignmentsPage2Chart.png?raw=true)

Intepreting the **Youtube Analysis of Student Pause Timings** chart:
>A peak in the chart indicates the more students has paused the video at this timing, hence this might indicate content covered that is tougher to digest for students. Hence, the instructor may cover content that the video covers with more pause attemps during class in order to explain the more difficult content.



## Compatability

For **optimal viewing** experience, we have tested our application on the following screen resolution and browsers.

| Laptop | Screen Resolution | Browser | Brower Version | Optimised Zoom |
|:-------------:|:---------------:|:-------------:|:-------------:|:-------------:|
| Macbook Pro | 13.3-inch (2560 x 1600) | Opera | 52.0.2871.64 | 90% |
| Macbook Pro | 13.3-inch (2560 x 1600) | Safari | 11.0.3 (12604.5.6.1.1) | 100% |
| Macbook Pro | 13.3-inch (2560 x 1600) | Chrome | 65.0.3325.181 | 90% |
| Macbook Pro | 13.3-inch (2560 x 1600) | Firefox Quantum | 59.0.2 (64-bit) | 80% |
| Macbook Pro | 13.3-inch (1280 x 800) | Chrome | 65.0.3325.181 | 100% |
| Macbook Pro | 13.3-inch (1280 x 800) | Safari | 11.1 (12605.1.33.1.3) | 100% |
| Macbook Pro | 15.4-inch (2880 x 1800) | Safari | 11.1 (13605.1.33.1.2) | 90% |
| Macbook Pro | 15.4-inch (2880 x 1800) | Chrome | 65.0.3325.181 (64-bit) | 80% |
| HP Pavillion Ck0xx | 15.6 inch (1920 x 1080) | Chrome | 65.0.3325.181 | 100% |
| HP Pavillion Ck0xx | 15.6 inch (1920 x 1080) | Internet Explorer | All Versions | Not Supported |
| HP Pavillion Ck0xx | 15.6 inch (1920 x 1080) | Edge | All Versions | Not Supported |
| XPS 13 9350 | 13.3-inch (3200 x 1800) | Chrome | 65.0.3325.181 (64-bit) | 100% |
| XPS 13 9350 | 13.3-inch (3200 x 1800) | Firefox Quantum | 59.0.2 (64-bit) | 100% |



## Data Source
Data for Summit Analytics was generously provided by Prof Chris Boesch, using data collected from his Achievements application as part of the project requirement for BT3103 AY 17/18.

## Summit Analytics Team

![PeoplePage](https://github.com/TheIanSim/summit-on-react/blob/master/readMePics/PeoplePage.png?raw=true)

Signing Off

* TAY JIAHUI
* IAN SIM
* LI XUANGUANG
* NG KAIWEN
* SUEN WAI LUN

