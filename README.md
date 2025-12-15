# Event Talks App

A simple, single-page website for a one-day tech conference. This project dynamically generates a schedule from a JSON data source and allows users to filter talks by category.

---

## Features

- **Dynamic Schedule:** The event schedule is generated dynamically from a single data source.
- **Search by Category:** Users can easily filter the talks by typing a category into the search bar.
- **Single-File Build:** The entire website can be compiled into a single, portable `index.html` file.
- **Clean & Modern UI:** A simple and responsive design for easy viewing on any device.

---

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](httpss://nodejs.org/) and [npm](httpss://www.npmjs.com/) installed on your machine.

- **Node.js** (v14 or higher recommended)
- **npm** (v6 or higher recommended)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone httpss://github.com/mrbrightsides/mrbrightsides-event-talks-app.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd mrbrightsides-event-talks-app
    ```

3.  **Install dependencies:**
    This project has no external dependencies, but if you were to add some, you would run:
    ```sh
    npm install
    ```

### Running the Application

To view the application locally, you can use the start script which first builds the project and then serves the `dist` directory.

```sh
npm start
```

This will start a local web server. You can then open your browser and navigate to `https://localhost:8000` to see the website.

---

## Building for Production

This project includes a build script that bundles the entire application (HTML, CSS, and JavaScript) into a single `index.html` file.

1.  **Run the build script:**
    ```sh
    npm run build
    ```

2.  **Find the output:**
    The bundled file will be located at `dist/index.html`. This single file is all you need to deploy the website.

---

## Project Structure

```
.
├── dist/
│   ├── talks.json      # The generated schedule data
│   └── index.html      # The final, bundled single-page application (after build)
├── src/
│   ├── generate-data.js# Node.js script to create the talk schedule
│   ├── build.js        # Node.js script to bundle the application
│   ├── index.html      # The main HTML structure
│   ├── style.css       # The stylesheet
│   └── script.js       # The client-side JavaScript
├── .gitignore          # Files and folders to ignore
├── package.json        # Project metadata and scripts
└── README.md           # This file
```

---

## Technologies Used

- **Node.js:** For data generation and the build script.
- **HTML5:** For the structure of the website.
- **CSS3:** For styling the website.
- **JavaScript (ES6+):** For the application logic and interactivity.
