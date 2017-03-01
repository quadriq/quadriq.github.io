$(document).ready(function() {
  $(".button-collapse").sideNav();
})

$(document).ready(function() {
  $('.carousel').carousel();
});

// just for the demos, avoids form submit
jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});

$( "#contact_form" ).validate({
  messages: {
    name:{
     required: "'Name' darf nicht leer sein"
   },
    email: {
      required: "Darf nicht leer sein",
      email: "Keine gültige eMail Adresse"
     }
  },

  rules: {
    email: {
      required: true,
      email: true
    },
    name: {
      required: true,
    }
  }
});
