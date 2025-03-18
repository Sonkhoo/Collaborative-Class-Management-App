## **Low-Level Design (LLD)**
### **Core Components**
1. **User Roles**: Teachers, Students, Admins
2. **Authentication**: JWT-based auth with role-based access control
3. **Real-Time Features**: WebSockets (Socket.IO) + Redis Pub/Sub for chat/notifications
4. **AI Pipeline**: FastAPI microservice for transcription & question generation (Groq integration)
5. **Database**:
   - MongoDB: Core data (users, classes, materials, assignments)
   - Redis: Caching, real-time chat history, notifications
6. **File Storage**: AWS S3 or Firebase Storage for PDFs/lectures

---

Here's a structured breakdown of **frontend pages** and **backend API routes** for your MVP and Phase 2:

---

## **Frontend Pages**  
### **Phase 1 (MVP)**  
#### **Teacher-Specific Pages**  
1. **Teacher Dashboard**  
   - Create/delete classes  
   - View enrolled students  
   - Upload lectures/PDFs  
   - Create assignments with deadlines  
   - Real-time chat room access  

2. **Class Management Page**  
   - Edit class details  
   - Manage materials (upload/delete)  
   - Track assignment submissions  

3. **Assignment Creation Page**  
   - Set title, instructions, deadline  
   - Attach reference files  

---

#### **Student-Specific Pages**  
1. **Student Dashboard**  
   - View enrolled classes  
   - Access class materials  
   - Submit assignments  
   - Join class chat rooms  

2. **Assignment Submission Page**  
   - Upload files (PDF/docs)  
   - View deadline countdown  

3. **Class Materials Page**  
   - Download PDFs/lectures  
   - Filter by type (video, PDF, assignment)  

---

#### **Shared Pages**  
1. **Login/Signup Page**  
2. **Real-Time Chat Page**  
   - Threaded discussions  
   - @mentions for notifications  
3. **Profile Page**  
   - Update email/password  
   - View enrolled classes  

---

### **Phase 2 (AI Integration)**  
1. **AI Transcription Page** (Teacher)  
   - Upload audio/video → View auto-generated transcript  
2. **Practice Question Generator** (Teacher)  
   - Input topic → AI generates MCQ/essay questions  
3. **Doubt Resolution Page** (Student)  
   - Submit doubts → AI/human answers  
4. **Chatbot Interface**  
   - Q&A with AI assistant  
5. **Notification Settings Page**  
   - Configure email/SMS reminders  

---

## **Backend API Routes**  
### **Phase 1 (MVP)**  
#### **Authentication**  
```http
POST /api/auth/login  
POST /api/auth/signup  
POST /api/auth/refresh-token  
```

#### **Class Management**  
```http
POST /api/classes           # Create class  
GET /api/classes            # List all classes  
POST /api/classes/enroll    # Join class via code (student)  
DELETE /api/classes/:id     # Delete class (teacher)  
```

#### **Materials & Assignments**  
```http
POST /api/materials         # Upload PDF/lecture  
GET /api/materials/:classId # List class materials  
POST /api/assignments       # Create assignment  
GET /api/assignments/:id    # Get assignment details  
POST /api/submissions       # Submit assignment (student)  
```

#### **Real-Time Chat**  
```http
GET /api/chat/:classId/messages  # Load chat history  
# WebSocket: /socket.io (Socket.IO connection)  
```

---

### **Phase 2 (AI Integration)**  
#### **AI Services**  
```http
POST /ai/transcribe         # Audio/video → text (FastAPI)  
POST /ai/generate-questions # Text → quiz (FastAPI)  
POST /ai/chat               # Chatbot endpoint  
```

#### **Doubt Resolution**  
```http
POST /api/doubts            # Submit doubt (student)  
GET /api/doubts/unresolved  # Fetch open doubts (teacher)  
POST /api/doubts/:id/reply  # Post answer (teacher/AI)  
```

#### **Notifications**  
```http
POST /api/notifications     # Schedule reminders  
GET /api/notifications      # Fetch user notifications  
```

---

### **Example Flow with API Calls**  
**Teacher Uploads a Lecture**:  
1. Frontend: `Teacher Dashboard → Upload Material`  
2. API: `POST /api/materials` (with PDF file)  
3. Response: `201 Created` with S3 URL  

**Student Submits Assignment**:  
1. Frontend: `Assignment Page → Submit`  
2. API: `POST /api/submissions` (with file and assignment ID)  
3. Response: `Deadline validation → 200 OK or 400 Error`  

**AI Transcription Workflow**:  
1. Teacher uploads video → `POST /ai/transcribe`  
2. FastAPI processes file → Stores text in MongoDB  
3. Frontend fetches transcript: `GET /api/materials/:id/transcript`  

---

## **Key Considerations**  
1. **Role-Based Access**: Use middleware to block students from teacher endpoints.  
2. **File Uploads**: Use pre-signed S3 URLs for secure uploads.  
3. **WebSockets**: Implement Socket.IO rooms per class for chat.  
4. **AI Async Jobs**: Use Celery/Redis to handle long-running tasks (e.g., video transcription).  

---

## **Database Schema (MongoDB)**
```javascript
// Users
{
  _id: ObjectId,
  email: string,
  role: "teacher" | "student",
  enrolledClasses: [ObjectId]
}

// Classes
{
  _id: ObjectId,
  name: string,
  teacher: ObjectId,
  students: [ObjectId]
}

// Materials
{
  _id: ObjectId,
  classId: ObjectId,
  type: "pdf" | "video" | "assignment",
  url: string,
  createdAt: Date
}

// Assignments
{
  _id: ObjectId,
  classId: ObjectId,
  deadline: Date,
  submissions: [{
    studentId: ObjectId,
    fileUrl: string
  }]
}
```

---

## **Phased Development Plan**
### **Phase 1: MVP (4-6 Weeks)**
1. Core user authentication
2. Class creation/enrollment
3. PDF/lecture upload & download
4. Basic assignment submission
5. Real-time chat using Socket.IO
   

---

### **Phase 2: AI Integration (3-4 Weeks)**
1. Lecture transcription (audio/video → text)
2. Automated practice question generation
3. AI-powered Doubt Resolution System (DRS)
4. Deadline reminders via email/SMS
5. Chatbot

---

### **Phase 3: Feature Enhancements (2-3 Weeks)**
1. Rich text editor for notes/discussions
2. Group video calls (WebRTC integration)
3. Analytics dashboard for teachers

---

### **Phase 4: Scalability & Polish (2 Weeks)**

1. Third-party integrations (Google Drive, Zoom)
2. Testing and Optimizations

---

## **Tech Stack Deep Dive**
1. **Real-Time Architecture**:
   - Socket.IO for WebSocket management
   - Redis for pub/sub and message persistence
2. **AI Pipeline**:
   - FastAPI service with Groq API calls
   - Whisper for Audio
   - Groq and Langchain
   - Celery for async task queue (audio processing)
3. **File Uploads**:
   - Pre-signed URLs for secure S3 uploads
   - File validation (size/type) middleware

---

## **Next Steps**
1. Set up Next.js + Express boilerplate
2. Design MongoDB schemas
3. Implement JWT auth flow
4. Build basic class creation UI
5. Integrate Socket.IO for chat

Would you like me to elaborate on any specific component (e.g., WebSocket implementation details, Groq API integration)?