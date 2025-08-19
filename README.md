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
-- Users Table
CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Events Table
CREATE TABLE events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    city VARCHAR(100),
    created_by uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- RSVPs Table
CREATE TABLE rsvps (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    event_id uuid NOT NULL REFERENCES events(id) ON DELETE CASCADE,
    status VARCHAR(10) CHECK (status IN ('Yes', 'No', 'Maybe')),
    UNIQUE (user_id, event_id)
);
```

#### **Constraints & Integrity**

- **Primary Keys:** All tables use UUID as primary key.
- **Foreign Keys:** `created_by` in `events` → `users(id)`, `user_id` in `rsvps` → `users(id)`, `event_id` in `rsvps` → `events(id)`.
- **Cascade Delete:** If a user is deleted, associated events and RSVPs are also deleted.
- **Unique RSVP**: One RSVP per user per event.

#### **Sample Data**

- 10 users
- 5 events
- 20 RSVPs

*(See `/db/sample_data.sql` for the full insert statements.)*

---

### **ER Diagram**

![ER Diagram Screenshot](./assets/er-diagram.png)

---

### **Design Choices**

- **UUIDs** for scalability and security.
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
    git clone [your-repo-link]
    cd [your-repo-folder]
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

- **Vercel Link:** [Live Demo](https://[your-vercel-link])
- **Supabase Backend:** Connected via environment variables.

---

### **Screenshots**

- **Database Schema Screenshot:**  
  ![Supabase Tables](./assets/supabase-tables.png)

- **App Pages:**  
  ![Events List Screenshot](./assets/events-list.png)  
  ![RSVP Page Screenshot](./assets/rsvp-page.png)

---

## 📦 Repo Structure

```
/db                   # SQL schema, sample data
/assets               # Screenshots, ER diagram
/pages                # Next.js pages
/components           # React components
/utils                # Supabase helpers
README.md
```

---

## 📝 Notes

- This is a minimal demo for HR assessment purposes.
- For production, add more validations, error handling, and security measures.

---

## 🙌 Thanks!
For any questions, please contact [your email or GitHub profile].

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# PixaBeam-Event-Manager
>>>>>>> 5a6aff1341d6af1b196c874428f8b9c62f7c25ad
