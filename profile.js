var player = document.getElementById("player");
player.onclick = function()
{
	window.location = "player.html";
}

window.onload = function()
{
	if(sessionStorage.getItem("user") == null)
	{
		window.location.replace("index2.html");
	}

	else
	{
		//logout coding

		var logout_btn = document.getElementById("logout");
		logout_btn.onclick = function()
		{
			sessionStorage.clear();
			var logout_text = document.getElementById("logout_text");
			logout_text.innerHTML = "Please wait....";
			setTimeout(function()
			{
				window.location = "index2.html";},2000);
		    }

		//profile name coding
		var user_email = sessionStorage.getItem("user");
		var json_text = localStorage.getItem(user_email);
		var object_data = JSON.parse(json_text);
		var profile_name = document.getElementById("profile_name");
		profile_name.innerHTML = window.atob(object_data.username);
		document.getElementById("profile_username").innerHTML = atob(object_data.username);

		//profile picture coding

		var image_url = localStorage.getItem(user_email+"image");
		var profile_picture = document.getElementById("profile_picture");
		profile_picture.style.backgroundImage = "url("+image_url+")";
		profile_picture.style.backgroundSize = "cover";
		profile_picture.style.backgroundPosition = "center";



		if(localStorage.getItem(user_email+"image") != null)
		{
			var page_cover = document.getElementById("container");
			page_cover.style.display = "none";

		}

		//profile upload coding
		var profile_upload = document.getElementById("profile_upload");
		profile_upload.onchange = function()
		{
			var reader = new FileReader();
			reader.readAsDataURL(profile_upload.files[0]);

			reader.onload = function()
			{
				var filename = reader.result;
				var icon = document.getElementById("profile_icon");
				var pic = document.getElementById("profile_pic");
				pic.style.backgroundImage = "url("+filename+")";
				pic.style.backgroundSize = "cover";
				pic.style.backgroundPosition = "center";
				icon.style.display = "none";

				var next_btn = document.getElementById("next");
				next_btn.style.display = "block";

				next_btn.onclick = function()
				{
					localStorage.setItem(user_email+"image",filename);
					var page_cover = document.getElementById("container");
					page_cover.style.display = "none";
					window.location = location.href;
				}

			}

	    }

		}
		


}

var contact_btn = document.getElementById("contact");
contact_btn.onclick = function()
{
	window.location.replace("contact.html");
}


