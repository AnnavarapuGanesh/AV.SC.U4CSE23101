# 📢 Campus Notifications System

This project is developed as part of the **AffordMed Campus Hiring Evaluation**.

It consists of:

* ✅ **Stage 1** – Backend logic to compute Top 10 Priority Notifications
* ✅ **Stage 2** – Frontend React application to display notifications

---

# 🚀 Stage 1 – Priority Notifications (Backend Logic)

### ✅ Objective

Identify **Top 10 most important notifications** based on:

* Priority: `Placement > Result > Event`
* Recency: Latest notifications first

### 🧠 Approach

* Assign weights:

  * Placement → 3
  * Result → 2
  * Event → 1
* Sort by:

  1. Priority (descending)
  2. Timestamp (latest first)
* Return Top 10 notifications

### 📸 Output Screenshot

(Attached in repository: `image.png`)

### 📄 Design Explanation

See: `notification_system_design.md`

---

# 💻 Stage 2 – Frontend (React Application)

### 🌐 Runs on:

http://localhost:3000

---

## ✨ Features

### 🔔 All Notifications Page

* Display all notifications
* Filter by:

  * Placement
  * Result
  * Event
* Pagination support
* Clean card-based UI using **Material UI**

---

### ⭐ Priority Notifications Page

* Shows **Top 10 notifications**
* Sorted by:

  * Priority + Recency

---

### 🆕 New vs Viewed Notifications

* Newly loaded notifications marked as **"NEW"**
* Automatically marked as viewed on interaction (frontend logic)

---

### 📱 Responsive Design

* Works on:

  * Desktop
  * Mobile

---

## 🛠️ Tech Stack

* React.js
* Material UI
* Axios
* JavaScript

---

## 🔌 API Used

```
GET http://20.207.122.201/evaluation-service/notifications
```

Supports:

* `page`
* `limit`
* `notification_type`

---

## ▶️ How to Run the Project

```bash
cd notification_app_fe
npm install
npm start
```

Open:

```
http://localhost:3000
```

---

## 🎥 Demo Video



```
https://drive.google.com/file/d/1_XYOhG78vod_I59TLFcpda1FCwi3rMxS/view?usp=sharing
```


---

## 📂 Project Structure

```
AV.SC.U4CSE23101/
│
├── logging_middleware/
├── notification_app_be/        # Stage 1
├── notification_app_fe/        # Stage 2
│   ├── src/
│   ├── README.md
│
├── image.png                   # Stage 1 output
├── notification_system_design.md
```

---

## ⚠️ Notes

* No authentication required (as per instructions)
* API token used in headers
* CORS handled via proxy configuration
* Pagination handled efficiently on frontend

---

## ✅ Submission Highlights

* Clean UI (Material UI)
* Efficient sorting logic
* Proper API integration
* Error handling included
* Modular code structure

---

# 🎯 Conclusion

This implementation provides:

* Efficient notification prioritization
* User-friendly interface
* Scalable frontend design

---

## 👨‍💻 Author

**Annavarapu Ganesh**
B.Tech CSE – Amrita Vishwa Vidyapeetham

---
