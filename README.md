Digital Diner
A full-stack restaurant ordering system built with the MERN stack (MongoDB, Express, React, Node.js) and PostgreSQL. Customers can browse the menu, add items to a cart, and place simple pickup orders.


Tech Stack
Frontend: React (Vite), Context API, Axios

Backend: Node.js, Express.js

Database:

MongoDB Atlas – for menu items

PostgreSQL – for order management

Deployment:

Frontend: Netlify

Backend: (Local / Optional Cloud Host)

Features
Browse categorized menu items (Appetizers, Main, Desserts, etc.)

Add items to cart and view total

Place orders with name and phone number

View order confirmation

Basic order history lookup by phone number

MongoDB for flexible menu storage

PostgreSQL for relational order tracking

Database Design

Data	Database	Reason
Menu Items	MongoDB	Schema flexibility, nested options (e.g., toppings, variants)
Orders & Customer Info	PostgreSQL	Structured, relational data with potential joins and filtering
Mongoose is used for MongoDB. Sequelize is used for PostgreSQL ORM.
