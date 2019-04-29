//require mysql and inquirer
var mysql = require('mysql');
var inquirer = require('inquirer');
//create connection to db
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

//   console.log('_.~"~._.~"~._.~Welcome to BAMazon~._.~"~._.~"~._')
//   console.log('----------------------------------------------------------------------------------------------------')

//   for(var i = 0; i<res.length;i++){
//     console.log("ID: " + res[i].itemId + " | " + "Product: " + res[i].productName + " | " + "Department: " + res[i].deptName + " | " + "Price: " + res[i].price + " | " + "QTY: " + res[i].stockQty);
//     console.log('--------------------------------------------------------------------------------------------------')
  

//}

  console.log(' ');
  inquirer.prompt([
    {
      type: "input",
      name: "id",
      message: "WELCOME TO BAMAZON!!!   What is the itemId of the product you would like to purchase today?",
      validate: function(value){
        if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){  //found the isNAN if statement usage online!
          return true;
        } else{
          return false;
        }
      }
    },
    {
      type: "input",
      name: "qty",
      message: "How many units would you like to purchase?",
      validate: function(value){
        if(isNaN(value)){
          return false;
        } else{
          return true;
        }
      }
    }
    ]).then(function(ans){
      var cartItem = (ans.id)-1;
      var cartItemQty = parseInt(ans.qty);
      var grandTotal = parseFloat(((res[cartItem].price)*cartItemQty).toFixed(2));

      //check if quantity is sufficient
      if(res[cartItem].stockQty >= cartItemQty){
        //after purchase, updates quantity in Products
        connection.query("UPDATE products SET ? WHERE ?", [
        {stockQty: (res[cartItem].stockQty - cartItemQty)},
        {itemId: ans.id}
        ], function(err, result){
            if(err) throw err;
            console.log("PURCHASE COMPLETE! Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will be shipped to you in 3-5 business days.");
        });

        // connection.query("SELECT * FROM departments", function(err, deptRes){
        //   if(err) throw err;
        //   var index;
        //   for(var i = 0; i < deptRes.length; i++){
        //     if(deptRes[i].deptName === res[whatToBuy].deptName){
        //       index = i;
        //     }
        //   }
          
        //   //updates totalSales in departments table
        //   connection.query("UPDATE departments SET ? WHERE ?", [
        //   {TotalSales: deptRes[index].TotalSales + grandTotal},
        //   {deptName: res[whatToBuy].deptName}
        //   ], function(err, deptRes){
        //       if(err) throw err;
        //       //console.log("Updated Dept Sales.");
        //   });
        // });

      } else{
        console.log("We are so sorry, there's not enough in stock!");
        

      }

      reprompt();
    })
})
}

// asks if they would like to purchase another item
function reprompt(){
  inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to purchase another item?"
  }]).then(function(ans){
    if(ans.reply){
      bShop();
    } else{
      console.log("THANK YOU FOR SHOPPING ON BAMAZON!!!");
      connection.end();
    }

  });
}

bShop();