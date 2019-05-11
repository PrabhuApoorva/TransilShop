			--------------------------------------------
			|	     PAYMENT VALIDATION            |
			|      USING NODEJS/EXPRESS AND MONGO DB   |
			--------------------------------------------

** ------------Software Requirements--------- **
-> Visual Studio Code
-> Mongo DB
-> Node.js


** ------------Features--------- **
=> Customers can Login if they have an account or Singup if they have not signed up under "User Management".
=> "Product" and "Cart View" are enabled only after login/signup.
=> After login/signup, users will be directed to their profile where purchased product history will be displayed.
=> Under "Product", customers can add the products to cart and product list will be increased in cart.
=> Under "Cart View", customers can confirm their purchase and they can reduce the quantity or else can remove all products from cart.
=> After confirmation, users can select either online or offline payment method.
=> In online payment, users can see the total amount and can give card details to buy.
=> In offline payment, users can see the total amount and can give their address details for offline delivery.
=> After buying the products, users will be notified and purchase summary will be updated in database.


** ------------Pre-Requisites and Instructions------- **
-> To track all the packages, we need package.json for that install
	 npm init -y

-> Install express package
	 npm install express

-> To start the project with "npm start" command,install 'nodemon'
	 npm install nodemon --save-dev

-> To install all dependencies,
	 npm install

-> npm install --save express-handlebars

-> npm install --save mongoose

-> As soon as we run our server, models will be automatically created in MongoDB
-> Run the "product-seeder.js" file explicitely to add all products in the "shop" database
	node product-seeder.js

-> To hash the passwords in the schema,
	 npm install --save passport

-> In order to protect our session by stealing, we need 'csurf' and 'session' packages
	 npm install csurf --save
	 npm install --save express-session

-> To display validation errors,
	 npm install --save bcrypt-nodejs
	 npm install --save connect-flash

-> Local storage is used to store user data on server and 'express-validator' for validation 
	 npm install --save passport-local
	 npm install express-validator --save

-> Re-use 'mongoose' to store sessions
	 npm install --save connect-mongo

-> To make charges and card validation etc, we have used 'Stripe Service'
	 npm install stripe --save		[Refer dashboard.stripe.com for more information]


** -------Running MongoDB-------- **
In command prompt run following command:
	"C:\Program Files\MongoDB\Server\4.0\bin\mongod.exe"
=> The database "shopping" will be created if you run "npm start" after downloading this repo.
=> Use basic MongoDB commands to see the data in the database or install Robo 3T using [https://softdeluxe.com/Robo-3T-4388793/]


** -------The project will be opened at---------- **
	
	URL = http://localhost:3000/ 
