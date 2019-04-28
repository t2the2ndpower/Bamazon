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

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    buyProducts();

});


function buyProducts() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        // once you have the items, prompt the user for which they'd like to Purchase
        inquirer
            .prompt([
                {
                    name: "product",
                    type: "rawlist",
                    products: function () {
                        var productArray = [];
                        for (var i = 0; i < results.length; i++) {
                            productArray.push(results[i].item_name);
                        }
                        return productArray;
                    },
                    message: "What item would you like to purchase?"  //this used to be what item would you liketo bid on
                },
                {
                    // this used to be 'bid'
                    name: "purchaseQty",
                    type: "input",
                    message: "How many would you like to purchase?"
                }
            ])
            .then(function (answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.product) {
                        chosenItem = results[i];
                    }
                }

                // determine if bid was high enough but now determin if we have enough quantity
                if (chosenItem.stockQty < parseInt(answer.purchaseQty)) {
                    // bid/(quantity) was high enough, so update db, let the user know, and start over

                    var newStockQty = chosenItem.stockQty - answer.purchaseQty;
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stockQty: newStockQty
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Item purchased successfully!");
                            buyProducts();
                        }
                    );
                }
                else {
                    // we didn't have enough in stock, so apologize and start over
                    console.log("Our stock is too low. Try again...");
                    buyProducts();


                    connection.end();

                }

            });
    });
}