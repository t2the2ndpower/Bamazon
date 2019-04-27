//lode required packages

const mysql = require("mysql");
const inquirer = require("inquirer");

// save process arguments in a variable
var args = process.argv[2];


// Create a "Prompt" with a series of questions.
inquirer
    .prompt([
        // Here we create basic text prompt.
        {
            type: "input",
            message: "What is the itemID of the product you would like to purchase?",
            name: "custPurchaseItemID"
        },
        {
            type: "number",
            message: "How many would you like to purchase?",
            name: "custPurchaseQty"
        },
        // Here we ask the user to confirm.
        {
            type: "confirm",
            message: "Are you sure:",
            name: "confirm",
            default: true
        }

    ])
    .then(function (inquirerResponse) {
        // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
        if (inquirerResponse.confirm) {
            console.log("\nYou have selected to purchase " + inquirerResponse.custPurchaseQty + " units of item #" + inquirerResponse.custPurchaseItemID + "!\n");
            //console.log("Your " + inquirerResponse.pokemon + " is ready for battle!\n");
        }
        else {
            console.log("\nThat's okay, come again when you are more sure.\n");
        }
    });




// establish the db connection (and call a function)
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



    // showProd();
    // // productFinder(args);
    // connection.end();
});

// display all products function

function showProd() {

    console.log("Selecting all Products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        //connection.end();  use ctrl c if you forget to end the connection in the .js file
    });

};








    showProd();
    // productFinder(args);
    connection.end();





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