var signup = document.getElementById("span_one");
var login = document.getElementById("span_two");
var div_one = document.getElementById("login");
var div_two = document.getElementById("signup");

login.onclick = function np()
{
	div_one.style.display = "block";
	div_two.style.display = "none";
}


signup.onclick = function ponda()
{
	div_one.style.display = "none";
	div_two.style.display = "block";

}




