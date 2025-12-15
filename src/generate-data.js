const fs = require('fs');
const path = require('path');

const talks = [
    {
        title: "The Future of AI in Software Development",
        speakers: ["Dr. Evelyn Reed"],
        category: ["AI", "Development", "Future Tech"],
        description: "A deep dive into how artificial intelligence is reshaping the landscape of software engineering, from automated code generation to intelligent testing."
    },
    {
        title: "Mastering Quantum Computing with JavaScript",
        speakers: ["Jason Thorne", "Maria Garcia"],
        category: ["Quantum Computing", "JavaScript"],
        description: "Explore the fundamentals of quantum computing and how to simulate quantum circuits using a popular JavaScript library."
    },
    {
        title: "Cybersecurity in a Post-Quantum World",
        speakers: ["Kenji Tanaka"],
        category: ["Cybersecurity", "Quantum Computing", "Security"],
        description: "An urgent look at the cryptographic challenges and solutions that arise as quantum computers become more powerful."
    },
    {
        title: "Building Scalable Microservices with gRPC",
        speakers: ["Priya Singh"],
        category: ["Microservices", "gRPC", "Backend"],
        description: "Learn how to design and implement high-performance, scalable microservices using gRPC and Protocol Buffers."
    },
    {
        title: "The Art of UI/UX Design for Developers",
        speakers: ["Alex Chen", "Zoe Washington"],
        category: ["UI/UX", "Design", "Frontend"],
        description: "A practical guide for developers on how to apply fundamental UI/UX principles to create intuitive and beautiful user interfaces."
    },
    {
        title: "Decentralized Finance: Beyond the Hype",
        speakers: ["Samuel Jones"],
        category: ["DeFi", "Blockchain", "Finance"],
        description: "This talk cuts through the noise to explain the core concepts of Decentralized Finance (DeFi) and its potential to revolutionize global finance."
    }
];

const schedule = [];
let currentTime = new Date();
currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

function addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
}

function formatTime(date) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
}

talks.forEach((talk, index) => {
    const startTime = new Date(currentTime);
    const endTime = addMinutes(startTime, 60);

    schedule.push({
        type: 'talk',
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        ...talk
    });

    currentTime = endTime;

    if (index === 2) { // Lunch break after the 3rd talk
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = addMinutes(lunchStartTime, 60);
        schedule.push({
            type: 'break',
            title: 'Lunch Break',
            startTime: formatTime(lunchStartTime),
            endTime: formatTime(lunchEndTime)
        });
        currentTime = lunchEndTime;
    } else if (index < talks.length - 1) { // 10-min break between other talks
        const breakStartTime = new Date(currentTime);
        const breakEndTime = addMinutes(breakStartTime, 10);
        schedule.push({
            type: 'break',
            title: 'Coffee Break',
            startTime: formatTime(breakStartTime),
            endTime: formatTime(breakEndTime)
        });
        currentTime = breakEndTime;
    }
});

const outputPath = path.join(__dirname, '..', 'dist', 'talks.json');
fs.writeFileSync(outputPath, JSON.stringify(schedule, null, 4));

console.log('Successfully generated talks.json in dist/');
