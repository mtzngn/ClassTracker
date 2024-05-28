# Class Attendance App

## Description

This is an application built with React Native to help teachers see which students are in their class each day of the week.

## Setup

### Prerequisites

- Node.js
- Yarn or npm

### Installation

1. Clone the repository:<br>
   `git clone https://github.com/mtzngn/ClassTracker.git`<br>
   `cd ClassTracker`

2. Install dependencies:<br>
   `yarn install`<br>
   `cd ios && pod install && cd ..`

3. Create a .env file in the root directory and add your API token:<br>
   API_TOKEN=your_api_token_here

4. Run the application with:<br>
   `yarn start`<br>
   For ios:<br>
   `yarn run ios`<br>
   For android:<br>
   `yarn run android`

### Usage

1. On the home page, enter your teacher ID to view your classes for each day.<br>
   ![Home Screen](src/assets/Home.png)<br>
2. Class List screen will display the classes that are related to the teacher AND the classes that has lesson.
   ![Class List Screen](src/assets/Class%20List.png)<br>

3. Finally, Class Details screen will display the attendees for that lesson in that class, with the time of lesson.
   ![Class Detail Screen](src/assets/Class%20Details.png)

Note: If there is no class or if there is no lessons in that class, class list screen will not display the classes.
