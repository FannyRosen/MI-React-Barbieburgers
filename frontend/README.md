# Barbie Burgers

To start the project:
cd frontend
npm start

- cd backend
  npm run dev

Create .env file in frontend directory:

# BOOKINGS

REACT_APP_BOOKINGS_URI=http://localhost:8080/bookings

REACT_APP_BOOKINGS_POST=http://localhost:8080/bookings/new

REACT_APP_BOOKINGS_DELETE=http://localhost:8080/bookings/delete

REACT_APP_BOOKINGS_EDIT=http://localhost:8080/bookings/edit

# CUSTOMERS

REACT_APP_CUSTOMERS_URI=http://localhost:8080/customers

REACT_APP_CUSTOMERS_POST=http://localhost:8080/customers/new

REACT_APP_CUSTOMERS_DELETE=http://localhost:8080/customers/delete

REACT_APP_CUSTOMERS_EDIT=http://localhost:8080/customers/edit

Create .env file in backend directory:
CONNECTION_STRING="<Mongo db connection string>"
PORT="8080"

EMAIL=""
PSW=""
SERVICE_EMAIL="gmail"
