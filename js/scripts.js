// Business Logic for AddressBook ---------
function PizzaOrder() {
  this.contacts = {};
  this.currentId = 0;
}

PizzaOrder.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

PizzaOrder.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

PizzaOrder.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
};

PizzaOrder.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.addresses = {};
  this.currentId = -1;  
};

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

Contact.prototype.addAddress = function(address){
  address.id = this.assignId();
  this.addresses[address.id] = address;
}

Contact.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

Contact.prototype.findAddress = function(id){
  if (this.addresses[id] != undefined) {
    return this.addresses[id];
  }
  return false;
};

//business logic for Addresses

function Address(address, city, state, zip, type, crust, size, sauce, toppings){
  this.address = address;
  this.city = city;
  this.state = state;
  this.zip = zip;
  this.type = type;
  this.crust = crust;
  this.size = size;
  this.sauce = sauce;
  this.toppings = toppings;
}

//other business logic
function displayContactDetails(pizzaOrderToDisplay){
  let contactList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(pizzaOrderToDisplay.contacts).forEach(function(key){
    const contact = pizzaOrderToDisplay.findContact(key);
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName +"</li>";
  });
  contactList.html(htmlForContactInfo); 
}

function findPersonal(address){
  let isPersonal = false;
  Object.values(address).forEach(function(element){
    if(element === "personal")
    isPersonal = true;
  })
  return isPersonal;
}

function showPersonal(address){ 
  $(".address").html(address.address);
  $(".city").html(address.city);
  $(".state").html(address.state);
  $(".zip").html(address.zip);   
  $(".crust").html(address.crust);
  $(".size").html(address.size);
  $(".sauce").html(address.sauce);
  $(".toppings").html(address.toppings);
}

function showBusiness(address){
  $(".business-crust").html(address.crust);
  $(".business-size").html(address.size);
  $(".business-sauce").html(address.sauce);
  $(".business-toppings").html(address.toppings);
}
function showContact(contactID){
  const contact = pizzaOrder.findContact(contactID);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  let index = 0;
  while(contact.addresses[index] != null){
    let isPersonal = findPersonal(contact.addresses[index]);
    if(isPersonal){
      showPersonal(contact.addresses[index]);
    } else{
      showBusiness(contact.addresses[index]);
    }
    index++;
  }
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function containsType(address, type){
  if(address.type === type){
    return true;
  }
  return false;
}
function attachContactListeners(){
  $("ul#contacts").on("click", "li", function(){
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    pizzaOrder.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(pizzaOrder);
  });
}

function emptyForm(){
  // $("input#new-first-name").val("");
  // $("input#new-last-name").val("");
  // $("input#new-phone-number").val("");
  // $("input#new-address").val("");
  // $("select#new-city").val("");
  // $("select#new-state").val("");
  // $("select#new-zip").val("");
  $("select#new-crust").val("");
  $("select#new-size").val("");
  $("select#new-sauce").val("");
  $("select#new-toppings").val("");
}


//UI logic

let pizzaOrder = new PizzaOrder();
$(document).ready(function(){

  attachContactListeners();
  let currentContact = new Contact("", "")

  $("form#new-contact").submit(function(event){
    event.preventDefault();
    pizzaOrder.addContact(currentContact);
    displayContactDetails(pizzaOrder);
    emptyForm();
  });

  $("#addAddress").on("click", function(){
    
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedAddress = $("input#new-address").val();
    const inputtedCity = $("input#city").val();
    const selectedState = $("select#new-state").val();
    const inputtedZip = $("input#new-zip").val();
    const selectedType = $("input[name='address-type']:checked").val();
    const selectedCrust = $("select#new-crust").val();
    const selectedSize = $("select#new-size").val();
    const selectedSauce = $("select#new-sauce").val();
    const selectedToppings = $("select#new-toppings").val();
    let newAddress = new Address(inputtedAddress, inputtedCity, selectedState, inputtedZip, selectedType, selectedCrust, selectedSize, selectedSauce, selectedToppings);

    currentContact.lastName = inputtedLastName;
    currentContact.firstName = inputtedFirstName;
    currentContact.phoneNumber = inputtedPhoneNumber;
    currentContact.addAddress(newAddress);
    emptyForm();
  });
});



