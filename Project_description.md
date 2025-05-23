

## **App Name:** NexusConnect

### *Bridging Students & Companies, Seamlessly*

---

### **Overview:**

**NexusConnect** is a mobile-first platform designed to connect Bangladeshi university students with companies offering internships, micro-gigs, and junior-level job opportunities. It features a streamlined resume builder, centralized internship board, and exclusive “Corporate Rooms” for companies to manage and interact with their potential talent pool. The platform emphasizes real-world impact, youth empowerment, and telco integration, aligning with the goals of the **bdapps Innovation Summit 2025**.

---

### **Key Features:**

#### 👩‍🎓 **For Students:**

* **Smart Resume Builder:** Generate polished resumes tailored for internships or junior jobs.
* **Internship Page** : Browse and apply to real Internships / Junior level jobs
* **Micro-Gig Listings:** Browse and apply for real micro-gig opportunities from companies across Bangladesh.
* **Application Tracker:** View status of each application in real-time.
* **Corporate Rooms Access:** Join company-created spaces where they can interact with potential candidates and complete assessments or discussions.

> 🛑 *Note: Students cannot chat with other students. Communication is strictly between students and companies inside Corporate Rooms. Inside corporate rooms, publicly students can talk among themselves also.*

#### 🏢 **For Companies:**

* **Post Internships:** List available interships
* **Post Micro-Gigs:** Share job roles, deadlines, and selection criteria.
* **Corporate Rooms:** Private spaces to manage a cohort of student applicants or learners; ideal for shortlisting interns or varsity reps. They can arrange a test or interview or make rooms free to join
* **Talent Discovery & Shortlisting:** Filter by skills, resumes, previous experience, and assign badges.
* **Chat in Rooms:** Company representatives can chat with students inside their room, conduct assessments, and make announcements.

#### 🔄 **Other Key Tools:**

* **Push Notifications & SMS Alerts** (via bdapps APIs)
* **Phone Number Verification** (via telco)
* **In-App Resume Sharing**

---

### **Tech Stack (Optimized for App Development):**

#### 📱 **Frontend (Mobile App):**

* **React Native** (Core framework)
* **Expo** (Rapid development & testing)

#### 🛠️ **Backend (API & Server):**

* **Firebase Cloud Functions** *(No need to manage your own server)*

  * Great for mobile devs; easy to integrate with Firebase tools
  * Scalable, pay-as-you-go
  * Integrates well with bdapps APIs

#### 🗂️ **Database:**

* **Firebase Firestore** (Realtime NoSQL database)

  * Ideal for mobile apps
  * Real-time sync for Corporate Room chat
  * Easy role-based access control

#### 🔐 **Authentication:**

* **Firebase Authentication**

  * Phone number + email login
  * Secure, simple, and free to start
  * Also available google/linkedIn/facebook ligin

#### ☁️ **Storage (Resumes, Files):**

* **Firebase Storage**

#### 💬 **Chat (Corporate Rooms):**

* **Firestore for messaging**

  * No need for custom chat backend
  * Real-time updates & restricted student-to-student chats
  * Chat available in public in corporate rooms
  * also available with gig provider and applicant of gig
  * also with internship provider and applicant for internship

#### 📤 **Notifications & Telco Integration:**

* **Expo Push Notifications** (For in-app alerts)
* **bdapps SMS API** (For SMS alerts & phone verification)

#### 🤖 **AI Features (Premium)**
* AI skill gap analysing and suggesting courses and topics to upgrade
* AI resume-job match alalysing
* upgrade resume with AI
* AI hiring assitant for companies
* Corporate room long multi task summerization


---

### **Why NexusConnect?**

* **For Students:** First professional experience starts here—build a resume, apply, and prove your skills.
* **For Companies:** A smart way to discover, engage, and grow future talent from Bangladesh’s universities.
* **For bdapps:** A telco-powered ecosystem for skill-building, employment, and digital transformation.

---

### **Monetization Model:**

* **Freemium for Students:**

  * Free resume creation & applications
  * Premium resume insights and featured visibility
* **Freemium for Companies:**

  * Limited free job postings
  * Paid features: Resume insights, analytics, AI filtering, multiple rooms
* **Telco Integration:**

  * Carrier billing for premium services
  * SMS notifications powered by bdapps APIs
