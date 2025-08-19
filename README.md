# Event Platform – Supabase & Next.js

## 📋 Overview

This project is a simple event platform where users can:
- Register
- Create events
- RSVP to events

It uses **Supabase** for the backend (database & authentication) and **Next.js** for the frontend.  
This repo is part of the PixaBeam HR Team technical task.

---

## 🗄️ Part 1: Database Design

### **Schema Overview**

- **Users**: Stores user data.
- **Events**: Events created by users.
- **RSVPs**: Tracks which users RSVP'd to which events and their status.

### **Schema (SQL Extract)**

```sql
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO Users (name, email)
VALUES
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Smith', 'bob@example.com'),
  ('Charlie Brown', 'charlie@example.com'),
  ('Diana Prince', 'diana@example.com'),
  ('Ethan Hunt', 'ethan@example.com'),
  ('Fiona Davis', 'fiona@example.com'),
  ('George Miller', 'george@example.com'),
  ('Hannah Lee', 'hannah@example.com'),
  ('Ian Thomas', 'ian@example.com'),
  ('Julia Roberts', 'julia@example.com');

CREATE TABLE Events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  city TEXT NOT NULL,
  created_by INT REFERENCES Users(id) ON DELETE CASCADE
);

INSERT INTO Events (title, description, date, city, created_by) VALUES
  ('Tech Conference 2025', 'A gathering of developers and tech enthusiasts.', '2025-09-15', 'Bangalore', 1),
  ('Music Fest', 'Live music performances by popular bands.', '2025-09-20', 'Mumbai', 2),
  ('Startup Pitch Night', 'Entrepreneurs pitch their startups to investors.', '2025-10-05', 'Delhi', 3),
  ('Art Exhibition', 'Display of modern art by young artists.', '2025-10-12', 'Pune', 4),
  ('Hackathon', '24-hour coding challenge for students.', '2025-10-20', 'Hyderabad', 5);

CREATE TABLE RSVPs (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES Users(id) ON DELETE CASCADE,
  event_id INT REFERENCES Events(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('Yes', 'No', 'Maybe')) NOT NULL
);

INSERT INTO RSVPs (user_id, event_id, status) VALUES
  (1, 1, 'Yes'),
  (2, 1, 'Maybe'),
  (3, 1, 'No'),
  (4, 2, 'Yes'),
  (5, 2, 'Yes'),
  (6, 2, 'Maybe'),
  (7, 2, 'No'),
  (8, 3, 'Yes'),
  (9, 3, 'Yes'),
  (10, 3, 'No'),
  (1, 4, 'Maybe'),
  (2, 4, 'Yes'),
  (3, 4, 'No'),
  (4, 4, 'Yes'),
  (5, 5, 'Yes'),
  (6, 5, 'No'),
  (7, 5, 'Maybe'),
  (8, 5, 'Yes'),
  (9, 5, 'Maybe'),
  (10, 5, 'No');
```

#### **Constraints & Integrity**

- **Primary Keys:** All tables used INT as primary key.
- **Foreign Keys:** `created_by` in `events` → `users(id)`, `user_id` in `rsvps` → `users(id)`, `event_id` in `rsvps` → `events(id)`.
- **Cascade Delete:** If a user is deleted, associated events and RSVPs are also deleted.
- **Unique RSVP**: One RSVP per user per event.

#### **Sample Data**

- 10 users
- 5 events
- 20 RSVPs



---

### **ER Diagram**

<img src="Screenshot 2025-08-19 220111.png">

---

### **Design Choices**

- **PKs** for scalability and security.
- **Cascade Deletes** to ensure data integrity and prevent orphaned records.
- **Unique RSVP constraint** ensures users can't RSVP multiple times for the same event.
- **Status ENUM** for RSVP status for easy querying and validation.

---

## 💻 Part 2: Next.js App + Supabase

### **Features**

- **Events List:** See all upcoming events.
- **Event RSVP:** Click into an event and RSVP (Yes/No/Maybe).
- **Authentication:** Basic sign-up/login using Supabase Auth.

---

### **How to Run Locally**

1. **Clone the Repo**
    ```bash
    git clone https://github.com/KEYUR141/PixaBeam-Event-Manager.git
    cd event-rsvp
    ```

2. **Set Up Environment**
    - Create a `.env.local` file with your Supabase keys:
      ```
      NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
      ```

3. **Install Dependencies**
    ```bash
    npm install
    ```

4. **Run the App**
    ```bash
    npm run dev
    ```

---

### **Deployment**

- **Vercel Link:** [Live Demo](https://pixa-beam-event-manager-dgbg.vercel.app/)
- **Supabase Backend:** Connected via environment variables.

---

### **Screenshots**

- **Database Schema Screenshot:**  
  <img src="Screenshot 2025-08-19 224811.png">


- **App Pages:**  
  <img src="Screenshot 2025-08-19 222339.png">
  <img src="Screenshot 2025-08-19 222402.png">
  <img src="Screenshot 2025-08-19 222414.png">
  



---

## 📝 Notes

- This is a minimal demo for HR assessment purposes.
- For production, add more validations, error handling, and security measures.


