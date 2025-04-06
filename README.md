## Installation & Running the Application

1. Install dependencies:

```
npm run install
```

2. To run the client in development mode:

```
npm run dev
```

3. To check linting errors:

```
npm run lint
```

4. To format your code, run the following command:

```
npm run format
```

This will start:

- The client on http://localhost:5174 (default Vite port)

## 🚀GAZDALEAR

GAZDALEAR is an online platform for programming courses.

🌐 Pages Overview

The platform consists of three main pages:

+Home

+Courses

+Contact

🏠 Home Page

The homepage provides a brief overview of the platform and features a gallery
showcasing 6 top courses.

📚 Courses Page

On the Courses page, users can:

+View all available courses

+Use search functionality

+Sort courses by name or difficulty

+Filter courses by duration

Each course includes a "Learn More" button that redirects to a detailed course
page with information about the course structure and topics.

If a user is interested, they can click on the Consultation button, which
redirects them to the Contact page.

📩 Contact Page

On the contact page, users can fill out a form to send their information
directly to your email. This is handled via the FormSubmit service.

To receive submissions, update the action attribute in the contact.html file:

<form action="https://formsubmit.co/your-email@example.com" method="POST">

🛠️ Technologies

🧱 HTML5

🎨 CSS3

⚙️ JavaScript (Vanilla)
