$(document).ready(function () {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email");
  var passwordInput = $("input#password");
  var firstName = $("input#first_name");
  var lastName = $("input#last_name");
  var username = $("input#username");
  var iceName = $("input#iceName");
  var icePhone = $("input#icePhone");

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(firstName, lastName, username, email, password, iceName, icePhone) {
    $.post("/api/signup", {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password,
      iceName: iceName,
      icePhone: icePhone,
    })
      .then(function() {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function (event) {
    event.preventDefault();
    var userData = {
      firstName: firstName.val().trim(),
      lastName: lastName.val().trim(),
      username: username.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val(),
      iceName: iceName.val().trim(),
      icePhone: icePhone.val().trim()
    };

    console.log(userData);

    // If we have an email and password, run the signUpUser function
    signUpUser(
      userData.firstName,
      userData.lastName,
      userData.username,
      userData.email,
      userData.password,
      userData.iceName,
      userData.icePhone
    );

    firstName.val("");
    lastName.val("");
    username.val("");
    emailInput.val("");
    passwordInput.val("");
    iceName.val("");
    icePhone.val("");
  });
});
