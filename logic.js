/*start signup coding*/

var signup_frm = document.getElementById("signup_frm");

signup_frm.onsubmit = function()
{
	var user = btoa(document.getElementById("username").value);
	var email = btoa(document.getElementById("email").value);
	var phone = btoa(document.getElementById("phone").value);
	var pass = btoa(document.getElementById("password").value);

	var user_object_data = {username : user, email : email, phone : phone, password : pass};

	var user_text_data = JSON.stringify(user_object_data);

	if(user != "" && email != "" && phone != "" && pass != "")
	{
		localStorage.setItem(email,user_text_data);
		var signup_button = document.getElementById("signup_btn");
		signup_button.style.background = "#14b129";
		signup_button.innerHTML = "<i class='far fa-check-circle'></i> Sign-Up Succesfull";

		setTimeout(function()
		{
			signup_button.style.background = "linear-gradient(to right, #E100FF, #7F00FF)";
			signup_button.innerHTML = "Sign-Up";
			signup_frm.reset();},3000);
		return false;
	}

}

/*end signup coidng*/

/*start email validation coing*/

var email_input = document.getElementById("email");
email_input.onchange = function()
{
	var email = btoa(document.getElementById("email").value);
	var warning = document.getElementById("email_notice");
	var signup_button = document.getElementById("signup_btn");
	if(localStorage.getItem(email) != null)
	{
		warning.style.display = "block";
		email_input.style.borderBottomColor = "red";
		signup_button.disabled = true;
		signup_button.style.background = "#ccc";

		email_input.onclick = function()
		{
			email_input.value = "";
			email_input.style.borderBottomColor = "#ccc";
			warning.style.display = "none";
			signup_button.disabled = false;
			signup_button.style.background = "linear-gradient(to right, #E100FF, #7F00FF)";


		}


	}

}

/*end email validation coing*/

/*start login coding*/

var login_form = document.getElementById("login_frm");

login_form.onsubmit = function()
{
	var email = btoa(document.getElementById("login_email").value);
	var password = btoa(document.getElementById("login_password").value);
	var email_input = document.getElementById("login_email");
	var password_input = document.getElementById("login_password");
	var login_email_war = document.getElementById("login_email_war");
	var login_password_war = document.getElementById("login_password_war");

	if(localStorage.getItem(email) == null)
	{
		login_email_war.style.display = "block";
		email_input.style.borderBottomColor = "red";

		email_input.onclick = function()
		{
			email_input.value = "";
			login_email_war.style.display = "none";
			email_input.style.borderBottomColor = "#ccc";

		}
	}

	else 
	{
		var text_data = localStorage.getItem(email);
		var object_data = JSON.parse(text_data);
		var correct_email = object_data.email;
		var correct_password = object_data.password;

		if(email == correct_email)
		{
			if(password == correct_password)
			{
				sessionStorage.setItem("user",email);
				window.location.replace("profile.html");
			}

			else
			{
				login_password_war.style.display = "block";
		        password_input.style.borderBottomColor = "red";

		email_input.onclick = function()
		{
			password_input.value = "";
			login_password_war.style.display = "none";
			password_input.style.borderBottomColor = "#ccc";

		}
		
		}
		}



	}

 return false;
}


/*end login coding*/


//password validation coding

var signup_button = document.getElementById("signup_btn");
signup_button.onclick = function()
{
	var pass = document.getElementById("password").value;
	var password_input = document.getElementById("password");
	var pass_war = document.getElementById("pass_war");
	var signup_button = document.getElementById("signup_btn");
	var len = pass.length;
	


	if(len < 8)
	{
		
		password_input.style.borderBottomColor = "red";
		pass_war.style.display = "block";
		signup_button.disabled = true;
		signup_button.style.background = "#ccc";

		password_input.onclick = function()
		{
			password_input.value = "";
			password_input.style.borderBottomColor = "#ccc";
			pass_war.style.display = "none";
			signup_button.disabled = false;
			signup_button.style.background = "linear-gradient(to right, #E100FF, #7F00FF)";
		}


		
		
	}

	
}