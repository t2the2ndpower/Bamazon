//load required packages

const mysql = require("mysql");
const inquirer = require("inquirer");

// save process arguments in a variable
var args = process.argv[2];

// establish the db connection (and call a function)
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889, //this port needs to match the port of the sql server (don't get this confuses d with express homework)
    user: "root",
    password: "root",
    database: "bamazon_db"
});


function bShop(){
    //prints the items for sale and their details
    connection.query('SELECT * FROM products', function(err, res){
      if(err) throw err;
    
      console.table(res);
    }
}   

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

            var custItem = inquirerResponse.custPurchaseItemID;
            var custQty =  inquirerResponse.custPurchaseQty;

//put entire DB Connection within Inquirer

            console.log("\nYou have selected to purchase " + inquirerResponse.custPurchaseQty + " units of item #" + inquirerResponse.custPurchaseItemID + "!\n");
        }
        else {
            console.log("\nThat's okay, come again when you are more sure.\n");
        }
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


