// WELCOME TO BAMAZON!!! THE BEST CLI SHOP EVER!!!



// first things first - require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');

// next - create connection to db
const connection = mysql.createConnection({
    host: "localhost",
    port: 8889, //this port needs to match the port of the sql server (don't get this confuses d with express homework)
    user: "root",
    password: "root",
    database: "bamazon_db"
});


// Lets create the shop!
function bShop() {

    // now let us display the items for sale and their details
    connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        console.table(res);
        console.log(' ');

        // lets welcome the customer and ask them what they would like to purchase today!
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "WELCOME TO BAMAZON!!!   What is the itemId of the product you would like to purchase today?",
                validate: function (value) {
                    if (isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0) {  //found the isNAN if statement usage online!
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            {
                type: "input",
                name: "qty",
                message: "How many units would you like to purchase?",
                validate: function (value) {
                    if (isNaN(value)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }

            // Now, lets see if there is enough quantity, if so, subtract the number of items from stock and total the price
        ]).then(function (ans) {
            var cartItem = (ans.id) - 1;
            var cartItemQty = parseInt(ans.qty);
            var grandTotal = parseFloat(((res[cartItem].price) * cartItemQty).toFixed(2));

            //check if quantity is sufficient
            if (res[cartItem].stockQty >= cartItemQty) {
                //after purchase, updates quantity in Products
                connection.query("UPDATE products SET ? WHERE ?", [
                    { stockQty: (res[cartItem].stockQty - cartItemQty) },
                    { itemId: ans.id }
                ], function (err, result) {
                    if (err) throw err;
                    console.log("PURCHASE COMPLETE! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
                });

            } else {
                console.log("We are so sorry, there's not enough in stock!");
            }

            reprompt();
        })
    })
}

// asks if they would like to purchase another item.  If so, start the shop again, if not say thanks and good bye!
function reprompt() {
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function (ans) {
        if (ans.reply) {
            bShop();
        } else {
            console.log("THANK YOU FOR SHOPPING ON BAMAZON!!!  Have a great day!");
            connection.end();
        }

    });
}

bShop();