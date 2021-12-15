
// Business Logic for Orders ---------
function Order() {
  this.pizzas = {};
  this.currentPizzaId = 0;
  this.totalDue = 0
}

Order.prototype.addPizza = function(pizza) {
  pizza.id = this.assignId();
  this.pizzas[pizza.id] = pizza;
};

Order.prototype.assignId = function() {
  this.currentPizzaId += 1;
  return this.currentPizzaId;
};

Order.prototype.findPizza = function(id) {
  if (this.pizzas[id] != undefined) {
    return this.pizzas[id];
  }
  return false;
};

Order.prototype.deleteOrder = function(id) {
  if (this.pizzas[id] === undefined) {
    return false;
  }
  delete this.orders[id];
  return true;
};

// Business Logic for Customer ---------
function Customer(firstName, lastName, phoneNumber, address1, address2, city) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.address1 = address1;
  this.address2 = address2;
  this.city = city;
  this.addresses = {};
  this.currentId = -1;  
};

Customer.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Customer.prototype.addAddress = function(address){
  address.id = this.assignId();
  this.addresses[address.id] = address;
}

Customer.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

Customer.prototype.findAddress = function(id){
  if (this.addresses[id] != undefined) {
    return this.addresses[id];
  }
  return false;
};

// Business logic for Pizzza

function Pizza(type, size, sauce, toppings, price){
  this.type = type;
  this.size = size;
  this.sauce = sauce;
  this.toppings = toppings;
  this.price = 16.00;
}

Pizza.prototype.listToppings = function () {
  return this.toppings.join(", ");
}

Pizza.prototype.calculatePrice = function() {
  this.toppings.forEach(topping => {
    if (topping === "mozarella" || topping === "pepperoni" || topping === "peppers" || topping === "feta" || topping === "tomatoes" || topping === "garlic") {
      this.price += 2.00;
    }
  });
  if (this.size === "MD") {
    this.price += 8.00;
  }
  if (this.size === "LG") {
    this.price += 16.00;
  }
  if (this.size === "XL") {
    this.price += 24.00;
  }
}


//other business logic
function displayOrderDetails(orderToDisplay){
  let orderConfirmation = $("ul#orders");
  let htmlForOrderConfirmation = "";
  Object.keys(orderToDisplay.pizzas).forEach(function(key){
    const pizza = orderToDisplay.findPizza(key);
    htmlForOrderConfirmation += "<li id=" + customer.id + ">" + customer.firstName + " " + customer.lastName + "</li>";
  });
  orderConfirmation.html(htmlForOrderConfirmation); 
}

function findFirstPie(order){
  let isFirst = false;
  Object.values(order).forEach(function(element){
    if(element === "first")
    isFirst = true;
  })
  return isFirst;
}

function showFirst(pizza){    
  $(".size").html(pizza.size);
  $(".sauce").html(pizza.sauce);
  $(".toppings").html(pizza.toppings);
  $(".price").html(pizza.price);
}

function showSecond(pizza){
  $(".second-size").html(pizza.size);
  $(".second-sauce").html(pizza.sauce);
  $(".second-toppings").html(pizza.toppings);
  $(".price").html(pizza.price);
}

function showCustomer(customerID){
  const customer = order.findCustomer(customerID);
  $("#show-customer").show();
  $(".first-name").html(customer.firstName);
  $(".last-name").html(customer.lastName);
  $(".address1").html(customer.address1);
  $(".address2").html(customer.address2);
  $(".city").html(customer.city);
  let index = 0;
  while(customer.orders[index] != null){
    let isFirst = findFirst(customer.orders[index]);
    if(isFirst){
      showFirst(customer.orders[index]);
    } else{
      showSecond(customer.orders[index]);
    }
    index++;
  }
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + customer.id + ">Delete</button>");
}

function containsType(pizza, type){
  if(pizza.type === type){
    return true;
  }
  return false;
}
function attachCustomerListeners(){
  $("ul#customers").on("click", "li", function(){
    showCustomer(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    order.deleteCustomer(this.id);
    $("#show-customer").hide();
    displayCustomerDetails(order);
  });
}

function emptyForm(){
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input#new-phone-number").val("");
  $("input#new-address-1").val("");
  $("input#new-address-2").val("");
  $("select#new-city").val("");
  $("select#new-size").val("");
  $("select#new-sauce").val("");
  $("input#new-toppings").val("");
}


//ui logic


let order = new Order();



$(document).ready(function(){

  attachCustomerListeners();
  let currentCustomer = new Customer("", "")

  $("form#new-customer").submit(function(event){
    event.preventDefault();
    order.addCustomer(currentCustomer);
    displayCustomerDetails(order);
    emptyForm();
  });

  $("#addOrder").on("click", function(){
    
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedAddress = $("input#new-address-1").val();
    const inputtedAddress2 = $("input#new-address-2").val();
    const selectedCity = $("select#new-city").val();
    const selectedType = $("input[name='pizza-order']:checked").val();
    const selectedSize = $("input[name='pizza-order']:checked").val();
    const selectedSauce = $("input[name='pizza-order']:checked").val();
    const inputtedToppings = $("input:checkbox[name='toppings']:checked").each(function() {
    yourArray.push($(this).val());
  });
    let newOrder = new Order(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedAddress, inputtedAddress2, selectedCity, selectedType, selectedSize, selectedSauce, inputtedToppings);

    currentCustomer.firstName = inputtedFirstName;
    currentCustomer.lastName = inputtedLastName;
    currentCustomer.addOrder(newOrder);
    emptyForm();
  });
});