const mysql = require("mysql");

var args = process.argv[2];

const connection = mysql.createConnection({
    host: "localhost",
    port: 8889, //this port needs to match the port of the sql server (don't get this confuses d with express homework)
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);


  
showProd();
    // productFinder(args);
    connection.end();
});

function showProd(){

    console.log("Selecting all Products...\n");
                connection.query("SELECT * FROM products", function (err, res) {
                    if (err) throw err;
                    // Log all results of the SELECT statement
                    console.table(res);
                    //connection.end();  use ctrl c if you forget to end the connection in the .js file
                });

};


// function productFinder(args) {
//     console.log(args);
//     if (args === "allProducts") {

//         function readAllProducts() {
//             console.log("Selecting all Products...\n");
//             connection.query("SELECT * FROM products", function (err, res) {
//                 if (err) throw err;
//                 // Log all results of the SELECT statement
//                 console.table(res);
//                 //connection.end();  use ctrl c if you forget to end the connection in the .js file
//             });

//         };

//         readAllProducts();

//     } else if (args === "artistAlbumSongs") {

//         function readAlbumSongs() {
//             console.log("Selecting artist's songs...\n");
//             connection.query('SELECT top5000.artist, title, album, top5000.year FROM top5000 INNER JOIN topAlbums ON top5000.artist = topAlbums.artist WHERE top5000.artist = "Sting" AND topAlbums.year = top5000.year;', function (err, res) {
//                 if (err) throw err;
//                 // Log all results of the SELECT statement
//                 console.table(res);
//                 //connection.end();  use ctrl c if you forget to end the connection in the .js file
//             });
//         };
//         readAlbumSongs();

//     } else if (args === "multiSongs") {


//         function read2xArtistSongs() {
//             console.log("Selecting songs from artist that appear more than once...\n");
//             connection.query('SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 3 ', function (err, res) {
//                 if (err) throw err;
//                 // Log all results of the SELECT statement
//                 console.table(res);
//                 //connection.end();  use ctrl c if you forget to end the connection in the .js file
//             });
//         };
//         read2xArtistSongs();

//     } else if (args === "rangeSongs") {

//         function readRangsOfSongs() {
//             console.log("Selecting a range of songs between 1999 and 2010...\n");
//             connection.query('SELECT * FROM top5000 WHERE year > "1999" AND year < "2010" ORDER BY year', function (err, res) {
//                 if (err) throw err;
//                 // Log all results of the SELECT statement
//                 console.table(res);
//                 //connection.end();  use ctrl c if you forget to end the connection in the .js file
//             });

//         };
//         readRangsOfSongs();
//     };

// };