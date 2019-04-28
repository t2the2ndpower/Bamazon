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

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID " + connection.threadId);



    // showProd();
    // // productFinder(args);
    // connection.end();
});




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


            //Trying to resolve why RES is not defined.

                    // function showProd() {

                    //     console.log("Selecting all Products...\n");
                    //     connection.query("SELECT * FROM products", function (err, res) {
                    //         if (err) throw err;
                    //         // Log all results of the SELECT statement
                    //         console.table(res);
                    //         //connection.end();  use ctrl c if you forget to end the connection in the .js file
                    //     });
                    
                    // };
                    
                    // showProd()


            var custItem = inquirerResponse.custPurchaseItemID;
            var custQty = inquirerResponse.custPurchaseQty;

            // get the information of the chosen item
            var chosenItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_name === inquirerResponse.product) {
                    chosenItem = res[i];
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
                        console.log("Item " + chosenItem.productName + " purchased successfully!");
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

        };
    }









    )
