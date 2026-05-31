# 🏏 Ghost Coach

Ghost Coach is an AI-powered cricket coaching assistant that helps players improve their batting technique through image-based analysis and personalized coaching feedback.

Players can upload a batting stance image, receive detailed AI-generated coaching insights, review previous sessions, and ask follow-up questions to an AI cricket coach.

---

## Features

### Authentication

* User Registration
* User Login
* JWT-based Authentication
* Protected Routes

### AI Technique Analysis

* Upload batting stance images
* AI-powered stance evaluation using Gemini Vision
* Detailed coaching feedback

### Coaching Report

Each analysis generates:

* Overall Score
* Strengths
* Areas To Improve
* Priority Fix
* Drill Suggestion
* Confidence Level

### Session History

* View previous coaching sessions
* Track improvement over time
* Revisit past coaching reports

### AI Coach Chat

* Ask follow-up questions about your analysis
* Receive personalized coaching advice
* Context-aware responses based on session feedback

---

## Tech Stack

### Frontend

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* JWT Authentication
* Multer

### Database

* MongoDB
* Mongoose

### AI

* Google Gemini 2.5 Flash Lite

---

## Project Structure

```bash
src/

├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   │
│   ├── dashboard/
│   ├── upload/
│   ├── history/
│   ├── feedback/[id]/
│   └── layout.tsx
│
├── components/
│   ├── Sidebar.tsx
│   ├── UploadBox.tsx
│   ├── SessionCard.tsx
│   ├── FeedbackCard.tsx
│   ├── ScoreCard.tsx
│   └── ChatBox.tsx
│
├── lib/
│   └── axios.ts
│
└── hooks/
```

---

## Architecture

```text
Frontend (Next.js)
        │
        ▼
Backend API (Express.js)
        │
        ▼
 Gemini 2.5 Flash Lite
        │
        ▼
 MongoDB
```

---

## Authentication Flow

```text
Register/Login
      │
      ▼
 JWT Token Generated
      │
      ▼
 Stored In Browser
      │
      ▼
 Protected API Requests
```

---

## Analysis Flow

```text
Upload Cricket Image
        │
        ▼
 Multer Upload
        │
        ▼
 Gemini Vision Analysis
        │
        ▼
 Structured JSON Response
        │
        ▼
 MongoDB Session Storage
        │
        ▼
 Coaching Report
```

---

## Prompt Engineering

The AI model is instructed to analyze:

* Head Position
* Balance
* Body Alignment
* Foot Placement
* Front Elbow Position
* Bat Angle
* Stability

The model returns structured JSON containing:

```json
{
  "overallScore": 0,
  "strengths": [],
  "areasToImprove": [],
  "priorityFix": "",
  "drillSuggestion": "",
  "confidenceLevel": ""
}
```

This structured format ensures consistency and enables seamless rendering within the application.

---

## Environment Variables

### Backend

```env
PORT=3000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

GOOGLE_API_KEY=your_gemini_key
```

---

## Installation

### Backend

```bash
cd server

npm install

npm run dev
```

### Frontend

```bash
cd client

npm install

npm run dev
```

---

## API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### Sessions

```http
POST /api/sessions/create-session
GET  /api/sessions
GET  /api/sessions/:id
```

### AI Coach

```http
POST /api/chat/:sessionId
```

---

## Demo

The application demonstrates:

1. User Registration & Login
2. Cricket Stance Upload
3. AI-Powered Technique Analysis
4. Session History Tracking