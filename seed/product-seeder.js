var Product = require('../models/product');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping');

/* Adding products into database and displaying the view directly from Database's table */ 
var products = [
    new Product({
    imagePath: 'assets/images/Rolex.jpg',
    title: 'THE AIR-KING',
    description: 'The Rolex Air-King pays tribute to the pioneers of flight and the Oyster’s role in the epic story of aviation.With its 40mm case in Oystersteel, solid-link Oyster bracelet with Oysterclasp,and distinctive black dial, the new Air-King is as functional as it is timeless',
    price: '14000'
}),
new Product({
    imagePath: 'assets/images/camera1.jpg',
    title: 'CANON EOS RP RF USM KIT',
    description: 'The lightest and most compact full-fram EOS camera to date-includes a 26.2 MP CMOS sensor,fast and accurate autofocus, 4K video, and our powerful DIGIC 8 processor for exceptional results, even in low light.Get impressive results using the camera has helpful Feature Assistant functions.',
    price: '130000'
}),
new Product({
    imagePath: 'assets/images/tab.jpg',
    title: 'GALAXY TAB A 10.5',
    description: 'The Galaxy Tab A 10.5 is a product of Samsung with 1.8 GHz CPU speed,Octa Core. Main Display has 26.72cm size with 1920 * 1200 resolution. It has TFT technology. It has 3GB RAM and 32GB ROM with 22.2GB available memory size. Quad Speakers with Dolby Atmos. Experience surround sound',
    price: '29990'
}),
new Product({
    imagePath: 'assets/images/earPhone.jpg',
    title: 'JBL T210-In Ear Headphone',
    description: 'These headphones reproduce that same JBL sound,punching out bass that’s both deep and powerful. Control music playback with a convenient one-button remote. It has 8.7mm driver size. Got an incoming call? Answer it on the fly with the built-in microphone. It has 11-hour battery life with Call and music controls on earcup. Flat-foldable, lightweight and comfortable',
    price: '1099'
}),
new Product({
    imagePath: 'assets/images/headPhone.jpg',
    title: 'JBL E45 BT-WIRELESS ON EAR',
    description: 'Signature JBL sound delivered by powerful 40mm drivers, in a sleek, stylish design. Enjoy an entire day or more of wireless audio without having to plug your headphones back in to charge. It has 40mm driver size. It also has battery of type 610mAh. It has 20Hz~20KHz of frequency response.',
    price: '6599'
}),
new Product({
    imagePath: 'assets/images/Sunglasses.jpg',
    title: 'THE JULBO EXPLORER 2.0',
    description: 'The Julbo Explorer 2.0 sunglasses provide protection from more than just the sun. Magnetic protective shields easily attach near the temples to keep out wind and dust, as well as any extra light reflection from snow or water. The lenses are made from super-durable NXT — the ballistic material used in helicopter windshields and have an anti-fog coating to keep your shades clear in changing temperatures',
    price: '4000'
}),
];

var done = 0;
for (var i = 0; i < products.length; i++) {
  products[i].save(function(err, result) {
    done++;
    if (done === products.length) {
      exit();
    }
  });
}

function exit() {
  mongoose.disconnect();
}
