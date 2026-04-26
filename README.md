# 🚇 MetroPass - Smart Metro Ticket Booking System

A comprehensive Full-Stack DBMS project for planning metro journeys, calculating fares, and generating authentic digital tickets with integrated UPI payment support.

## 🚀 Key Features

- **Multi-City Network**: Support for Hyderabad, Chennai, Bengaluru, and Kochi metro networks.
- **Intelligent Routing**: Custom BFS-based algorithm to find the shortest path between stations, including automatic interchange detection.
- **QR Entry System**: A landing page with a scan-to-enter QR code for seamless mobile access.
- **Real UPI Payments**: Generates dynamic UPI Intent QR codes (compatible with GPay, PhonePe, Paytm) pre-filled with the ticket fare.
- **Authentic Digital Tickets**: Pixel-perfect ticket design modeled after official metro apps, including security serial numbers and "Save to Gallery" functionality.
- **Persistent DBMS**: Relational database backend using SQLite to store user data and booking history securely.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS, Headless UI
- **Backend**: Node.js, Express.js
- **Database**: SQLite (SQL-based Relational DBMS)
- **Tools**: JWT (Auth), Bcrypt (Security), QR-Server API

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd dbms_project
   ```

2. **Install Dependencies**:
   ```bash
   npm run install:all
   ```

3. **Start the Application**:
   ```bash
   npm run dev
   ```

4. **Access the App**:
   - **Frontend**: [http://localhost:5173](http://localhost:5173)
   - **Backend**: [http://localhost:5001](http://localhost:5001)

## 📸 Screenshots

*(Add your project screenshots here to wow your recruiters!)*

---
**Note**: This is a DBMS educational project. Payment verification is simulated for demonstration purposes.
