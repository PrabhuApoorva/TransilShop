var express = require('express');
var router = express.Router();
var User = require('../models/user');
//var csrf = require('csurf');
var passport = require('passport');
var Cart = require('../models/cart');
var Order = require('../models/order');
var Product = require('../models/product');

//var csrfProtection = csrf();
//router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('homePage/index', { title: 'TRANSIL' });
});

/* GET Product page. */
router.get('/product', isLoggedIn, function(req, res, next){
  var successMsg = req.flash('Success')[0];
  Product.find(function(err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize){
      productChunks.push(docs.slice(i, i + chunkSize));
    }
    res.render('shop/productView.hbs', {title: 'Product', products: productChunks, successMsg: successMsg, noMessages: !successMsg });
  });
 
});


router.get('/add-to-cart/:id', function(req, res, next) {
  var productId = req.params.id;     //creating cartObj to store products
  var cart = new Cart(req.session.cart ? req.session.cart : {});
//new cart is created each time here
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/product');
    }
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(req.session.cart); 
    res.redirect('/product'); 
  });
});

/* Cart View page */
router.get('/shoppingCart', function(req, res, next){
  if(!req.session.cart){
    return res.render('shop/shoppingCart', {products: null});
  }
  var cart = new Cart(req.session.cart);
  res.render('shop/shoppingCart', {
    products: cart.generateArray(),
    totalPrice: cart.totalPrice
  });
});

/* Purchase History of user */
router.get('/profile',isLoggedIn, function(req, res, next) {
  Order.find({ user: req.user}, function(err, orders){
    if(err){
      return res.write('Error!');
    }
    var cart;
    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.items = cart.generateArray(); 
    });
    res.render('user/profile', { orders: orders});
  });
});

/* Logout */
router.get('/logout', isLoggedIn, function(req, res, next){
  req.logout();
  res.redirect('/');
});

router.get('/signin', function(req,res,next){
  var messages = req.flash('error');
  res.render('user/signin', {/*csrfToken: req.csrfToken(),*/ messages: messages, hasErrors: messages.length > 0});
});

router.post('/signin', passport.authenticate('local.signin',{
  successRedirect: '/profile',
  failureRedirect: '/signin',
  failureFlash: true
}));

router.get('/register', function(req,res,next){
  var messages = req.flash('error');
  res.render('user/register', {/*csrfToken: req.csrfToken(),*/ messages: messages, hasErrors: messages.length > 0});
});

router.post('/register', passport.authenticate('local.register', {
  successRedirect: '/profile',
  failureRedirect: '/register',
  failureFlash: true
}));

router.get('/selectOpt',isLoggedIn, function(req, res, next) {
  res.render('shop/selectOpt', { title: 'Payment Method' });
});

/* GET offline payment page */
router.get('/offline',isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shoppingCart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/offline', { total: cart.totalPrice,
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  });
});

router.post('/offline', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shoppingCart');
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")("sk_test_IPlm9KhoTzjJbomyusk8ascf00fG3Tb971");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/offline');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
      order.save(function(err, result) {
      req.flash('Success', 'Successfully bought product!!');
      req.session.cart = null;
      res.redirect('/product');
    });
  });
});

router.get('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shoppingCart');
  }
  var cart = new Cart(req.session.cart);
  var errMsg = req.flash('error')[0];
  res.render('shop/checkout', { total: cart.totalPrice,
    total: cart.totalPrice,
    errMsg: errMsg,
    noError: !errMsg
  });
});

router.post('/checkout', isLoggedIn, function(req, res, next) {
  if (!req.session.cart) {
    return res.redirect('/shoppingCart');
  }
  var cart = new Cart(req.session.cart);

  var stripe = require("stripe")("sk_test_IPlm9KhoTzjJbomyusk8ascf00fG3Tb971");

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "Test Charge"
  }, function(err, charge) {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart: cart,
      address: req.body.address,
      name: req.body.name,
      paymentId: charge.id
    });
      order.save(function(err, result) {
      req.flash('Success', 'Successfully bought product!!');
      req.session.cart = null;
      res.redirect('/product');
    });
  });
});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.reduceByOne(productId);
  req.session.cart = cart;
  res.redirect('/shoppingCart');
});

router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id;
  var cart = new Cart(req.session.cart ? req.session.cart : {});

  cart.removeItem(productId);
  req.session.cart = cart;
  res.redirect('/shoppingCart');
});

router.get('/about', function(req, res, next) {
  res.render('homePage/about', { title: 'About' });
});
router.get('/contact', function(req, res, next) {
  res.render('homePage/contact', { title: 'Contact' });
});

module.exports = router;

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}
function notLoggedIn(req, res, next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}