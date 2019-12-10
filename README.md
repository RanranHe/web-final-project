# Food Delivery System
This is a food delivery system which customers can register/login, search nearby restaurants and order foods from 
multiple restaurants. After giving some delivery details, the food will be delivered directly to the door.

## Role and use cases
1. Customer: 
    1. Register and login
    2. Edit personal information
    3. View restaurants nearby after typing in the address
    4. View menu by restaurant
    4. Get foods from multiple restaurants in one order
    5. Add foods to cart, edit cart and clear cart
    7. Checkout and place order
    5. View order history
2. Manager: 
    1. Manage users (Customers and Delivery Man)
    2. Manage order assignment
3. Delivery Man:
    1. Update order status 
    
## API
We got restaurant and menu data from "Eatstreet" api.
https://developers.eatstreet.com/

## Database
Remote MongoDB (mLab MongoDB) is used in this project to store user and order data.

## Cloud Deployment
1. Back-end: https://neu-food-app.herokuapp.com
2. Front-end: upcoming

## JavaScript library
three.js – JavaScript 3D library is used on the main page in the project to enriching the visual feedback.
https://threejs.org/

## How to run
1. Go to https://github.com/neu-mis-info6150-fall-2019/final-project-team-tas.git
2. Click the green botton on the web page: "Clone or download".
3. Choose Download ZIP.
4. Uncompress the assignment folder.
5. Go to terminal and open the "backend" folder
6. Run "npm install"
7. Run "npm start"
8. Open "frontend" folder
9. Run "npm install"
10. Run "ng serve"