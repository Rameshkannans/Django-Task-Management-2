Task Management

Technologies Used
- React.js, Bootstrap 5
- Django
- MySQL

Description:
This is a simple CRUD application for task management. The application does not include user registration or login functionality.

Installation and Setup
Follow the steps below to set up and run the project:

Backend (Django)
1. Create a virtual environment:
   python -m venv myenv

2. Activate the virtual environment:
     myenv\Scripts\activate
3. Install required packages:
   pip install Django django-cors-headers djangorestframework mysqlclient
4. Create a new Django project:
   django-admin startproject server
5. Navigate to the project directory:
   cd server
6. Create a new Django app:
   python manage.py startapp api
7. Apply database migrations:
   python manage.py makemigrations
   python manage.py migrate
8. Check applied migrations:
   python manage.py showmigrations
9. Run the development server:
   python manage.py runserver
   - To run on a specific port:
     python manage.py runserver 8080
   - To allow external access:
     python manage.py runserver 0.0.0.0:8000
10. Create a superuser for Django admin:
    python manage.py createsuperuser
