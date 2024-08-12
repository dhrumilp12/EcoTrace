
# EcoTrace: Community-Driven Environmental Monitoring Platform

## Overview
EcoTrace is a robust platform designed to empower communities to monitor and report environmental data. This platform facilitates real-time tracking of environmental variables such as air quality, water purity, and more, enabling users to contribute to and access data that impacts their local surroundings.

## Features
- **Real-Time Data Monitoring:** Users can view up-to-date environmental data, contributed by community sensors and other users.
- **Interactive Maps:** Geographic representations of environmental data allow users to visually assess the environmental quality in different areas.
- **Community Reporting:** Users can report environmental issues directly through the platform, fostering community engagement and action.
- **Data Analytics:** Advanced analytics on the collected data help in understanding trends and patterns in environmental quality over time.

## Technologies Used
- **Frontend:** React, Redux for state management, and Google-maps for mapping functionalities.
- **Backend:** Node.js with Express for RESTful API services, MongoDB for database management.
- **APIs:** Integration of external APIs for additional environmental data.
- **Security:** Implemented using JWT authentication and HTTPS for secure data transmission.

## Getting Started

### Prerequisites

- **Node.js:** Ensure you have Node.js installed on your machine. This project is built with Node.js, which serves as the runtime environment for the backend. You can download and install Node.js from [nodejs.org](https://nodejs.org/).
- **MongoDB:** This application uses MongoDB for data storage. You must have MongoDB installed and running on your local machine or have access to a MongoDB database server. For installation instructions, visit [mongodb.com](https://www.mongodb.com/try/download/community).



### Installation

1. **Clone the repository:**
   ```
   https://github.com/dhrumilp12/EcoTrace.git
   ```

2. **Setup the backend environment:**
   ```
   cd ./server/
   npm install
   ```

3. **Setup the frontend environment:**
   ```
   cd ../ecotrace
   npm install
   ```

4. **Configure environment variables:**
   - Copy the `.env.example` file to a new file named `.env`.
   - Update the `.env` file with your specific configurations.
   ```
   cp .env.example .env
   ```

5. **Run the backend:**
   ```
   node server.js
   ```

6. **Run the frontend:**
   ```
   npm start
   ```

7. **Build the frontend:**
   ```
   npm run build
   ```


## Created with ❤️ by Dhrumil, Vaishnavi, Ruzh and UVCHIKORITA
`Dhrumil Patel - Full Stack Developer & Software Engineer`<br>
