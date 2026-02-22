window.onload = function()
{
	var user_email = sessionStorage.getItem("user");
	var image_url = localStorage.getItem(user_email+"image");
	var profile_picture = document.getElementById("profile_pic");
	profile_pic.style.backgroundImage = "url("+image_url+")";
	profile_pic.style.backgroundSize = "cover";
	profile_pic.style.backgroundPosition = "center";


}



if(sessionStorage.getItem("user") == null)
{
	window.location.replace("index2.html");
}

else
{
	var user_email = sessionStorage.getItem("user");
	//add sign coding

var add_icon = document.getElementById("new_contact");

add_icon.onclick = function()
{
	var bg = document.getElementById("contact_bg");
	bg.style.display = "block";
}


//close button coding

var close_btn = document.getElementById("close");
close_btn.onclick = function()
{
	var bg = document.getElementById("contact_bg");
	bg.style.display = "none";
}

//add button coding

var add = document.getElementById("add");
add.onclick = function()
{
	var name = document.getElementById("c_name");
	var num = document.getElementById("c_number");
	var name_value = document.getElementById("c_name").value;
	var num_value = document.getElementById("c_number").value;

	if(name_value != "" && num_value != "")
	{
		var contact_object = {name : name_value, number : num_value};
		var json_text = JSON.stringify(contact_object);
		localStorage.setItem(user_email+"_contact"+name_value,json_text);

	}

	else
	{
		var war = document.getElementById("contact_notice");
		var name = document.getElementById("c_name");
	 	var num = document.getElementById("c_number");
		if(name_value == "" && num_value == "")
		{
			war.style.display = "block";
			name.style.borderColor = "red";
			num.style.borderColor = "red";
			return false;
		}
		
	}

}

	function all_contact()
	{
		var i;
		for(i = 0; i<localStorage.length; i++)
		{
			var all_key = localStorage.key(i);

			if(all_key.match(sessionStorage.getItem("user")+"_contact"))
			{
				var json_text = localStorage.getItem(all_key);
				var obj = JSON.parse(json_text);



				//content writting in javascript html element build-up
				var contact_box = document.createElement("DIV");
				var name_p = document.createElement("P");
				name_p.setAttribute("class","contact_name");
				var name_i = document.createElement("I");
				var num_i = document.createElement("I");
				var tool = document.createElement("DIV");
				var edit_i = document.createElement("I");
				var del_i = document.createElement("I");
				var num_p = document.createElement("P");
				var line = document.createElement("HR");
				


				//content writting in javascript appending html element
				name_p.appendChild(name_i);
				name_p.innerHTML += " "+obj.name;

				tool.appendChild(edit_i);
				tool.appendChild(del_i);

				num_p.appendChild(num_i);
				num_p.innerHTML += " "+obj.number;

				contact_box.appendChild(name_p);
				contact_box.appendChild(tool);
				contact_box.appendChild(line);
				contact_box.appendChild(num_p);

				//content writting in javascript seting attrinute and class
				contact_box.setAttribute("id","contact");
				name_i.setAttribute("class","fas fa-user");
				num_i.setAttribute("class","fas fa-mobile-alt");
				tool.setAttribute("id","tool");
				edit_i.setAttribute("class","fas fa-edit edit");
				del_i.setAttribute("class","fas fa-trash del");
				line.setAttribute("color","purple");
				line.setAttribute("width","75%");
				line.setAttribute("size","1");
				


				var all_contact_box = document.getElementById("all_contact_box");
				all_contact_box.appendChild(contact_box);
			}

		}

	}

	all_contact();

	//search functionality coding

	var search = document.getElementById("search");
	search.oninput = function()
	{
		var all_concatc_name = document.getElementsByClassName("contact_name");

		var i;
		for(i = 0; i<all_concatc_name.length; i++)
		{
			if(all_concatc_name[i].innerHTML.toUpperCase().match(search.value.toUpperCase()))
			{
				all_concatc_name[i].parentElement.style.display = "block";
			}

			else
			{
				all_concatc_name[i].parentElement.style.display = "none";
			}
		}

	}

	//delete contact by delete icon coding

	function del()
	{var del = document.getElementsByClassName("del");
	var i;
	for(i = 0; i<del.length; i++)
	{
		del[i].onclick = function()
		{
			var parent = this.parentElement.parentElement;
			var p_ele = parent.getElementsByClassName("contact_name")[0];
			var username = p_ele.innerHTML.replace('<i></i>','');
			localStorage.removeItem(user_email+"_contact"+username.trim());
			parent.className = "animate__animated animate__bounceOut";
			location.reload();
			setTimeOut(function()
			{
				parent.remove();

			},1000);
			
		}
	}

}

//edit contact by edit icon coding

function edit()
{
	edit_icon = document.getElementsByClassName("edit");

	var i;
	for(i = 0; i<edit_icon.length; i++)
	{
		edit_icon[i].onclick = function()
		{
			var parent = this.parentElement.parentElement;
			var para = parent.getElementsByTagName("P");
			var name = para[0].innerHTML.replace("<i></i>","").trim();
			var number = para[1].innerHTML.replace("<i></i>","").trim();
			var add_btn = document.getElementById("new_contact");
			var c_heading = document.getElementById("c_heading");
			var add = document.getElementById("add");
			var close = document.getElementById("close");
			var c_name = document.getElementById("c_name");
			var c_num = document.getElementById("c_number");


			c_name.value = name;
			c_num.value = number;
			c_heading.innerHTML = "Edit contact";
			add.innerHTML = "Update";
			close.style.display = "none";
			add_btn.click();
			localStorage.removeItem(user_email+"_contact"+name);
		}
	}
}

edit();

}




