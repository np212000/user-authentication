var current_user = sessionStorage.getItem("user");

//play button coding

var video = document.getElementById("vdo_player");
var play_btn = document.getElementById("play_btn");
play_btn.onclick = function()
{
	if(play_btn.className == "fas fa-play-circle")
	{
		video.play();
		play_btn.className = "fas fa-pause-circle";
	}

	else if(play_btn.className == "fas fa-pause-circle")
	{
		video.pause();
		play_btn.className = "fas fa-play-circle";
	}
}


//timing, progress bar coidng

video.ontimeupdate = function()
{
	var t_duration = this.duration;
	var c_duration = this.currentTime;
	var p_bar = document.getElementById("progress_bar");
	var v_timing = document.getElementById("v_timing");
	var sec = c_duration - parseInt(c_duration/60)*60;
	var t_sec = t_duration - parseInt(t_duration/60)*60;
	v_timing.innerHTML = parseInt(c_duration/60)+":"+parseInt(sec) + " / " + parseInt(t_duration/60)+":"+parseInt(t_sec);
	var slide_per = c_duration*100/t_duration;
	p_bar.style.width = slide_per+"%";

	if(c_duration == t_duration)
	{
		play_btn.className = "fas fa-play-circle";
	}



}


//open & close dilog box coding.

var open_d_box = document.getElementById("open_d_box");
open_d_box.onclick = function()
{
	var add_vdo_box = document.getElementById("add_vdo_box");

	if(open_d_box.className == "fas fa-plus-circle")
	{
		add_vdo_box.style.display = "block";
		open_d_box.className = "fas fa-times-circle";

	}

	else if(open_d_box.className == "fas fa-times-circle")
	{
		add_vdo_box.style.display = "none";
		open_d_box.className = "fas fa-plus-circle";
	}
}


//vdo add in localstorage coding

var add_btn = document.getElementById("add_vdo_btn");
add_btn.onclick = function()
{
	var v_name = document.getElementById("v_name");
	var v_link = document.getElementById("v_link");

	if(v_name.value != "" && v_link != "")
	{
		var v_object = {name : v_name.value, link : v_link.value};
		var v_text = JSON.stringify(v_object);
		localStorage.setItem(current_user+"video"+v_name.value,v_text);

	}
}

//fetch all vdos from localstorage

function load_vdo()
{
	var i;
	for(i = 0; i<localStorage.length; i++)
	{
		var all_keys = localStorage.key(i);
		if(all_keys.match(current_user+"video"))
		{
			var v_data = localStorage.getItem(all_keys);
			var vdo_obj = JSON.parse(v_data);

			//content writing of vdo preview list

			var div = document.createElement("DIV");
			div.setAttribute("id","main_vdo_box");
			var p = document.createElement("P");
			p.setAttribute("id","vdo_p");
			p.className = "playlist_v_name";
			p.innerHTML = vdo_obj.name;
			var button_one = document.createElement("BUTTON");
			button_one.setAttribute("id","play_vdo_btn");
			button_one.setAttribute("type","button");
			button_one.setAttribute("url",vdo_obj.link);
			button_one.className = "v_play_btn";
			button_one.innerHTML = "Play";

			var button_two = document.createElement("BUTTON");
			button_two.setAttribute("id","delete_vdo_btn");
			button_two.setAttribute("type","button");
			button_two.innerHTML = "Delete";
			button_two.className = "del_btn";

			div.appendChild(p);
			div.appendChild(button_one);
			div.appendChild(button_two);
			var botttom = document.getElementById("botttom");
			bottom.appendChild(div);

		}
	}
}

load_vdo();


//click on play button vdo play coding

function play_vdo()
{
	var all_v_play_btn = document.getElementsByClassName("v_play_btn");
	var i;
	for(i = 0; i<all_v_play_btn.length; i++)
	{
		all_v_play_btn[i].onclick = function()
		{
			clear();
			var v_url = this.getAttribute("url");
			var src_tag = document.getElementById("v_src");
			src_tag.setAttribute("src",v_url);
			video.load();
			video.play();
			play_btn.className = "fas fa-pause-circle";
			this.innerHTML = "Playing...";
		}
	}

}

play_vdo();

function clear()
{
	var all_v_play_btn = document.getElementsByClassName("v_play_btn");
	var i;
	for(i = 0; i<all_v_play_btn.length; i++)
	{
		all_v_play_btn[i].innerHTML = "Play";
	}
}

//next button coding

function next_button()
{
	var next_btn = document.getElementById("right_btn");
	next_btn.onclick = function()
	{
		var all_play_btn = document.getElementsByClassName("v_play_btn");
		var i;
		for(i = 0; i<all_play_btn.length; i++)
		{
			if(all_play_btn[i].innerHTML == "Playing...")
			{
				var next_ele = all_play_btn[i].parentElement.nextSibling;
				var next_play_button = next_ele.getElementsByClassName("v_play_btn")[0];
				next_play_button.click();
				return false;
			}
		}
	}
}

next_button();


//previous button coding

function previous_button()
{
	var previous_btn = document.getElementById("left_btn");
	previous_btn.onclick = function()
	{
		var all_play_btn = document.getElementsByClassName("v_play_btn");
		var i;
		for(i = 0; i<all_play_btn.length; i++)
		{
			if(all_play_btn[i].innerHTML == "Playing...")
			{
				var previous_ele = all_play_btn[i].parentElement.previousSibling;
				var previous_play_button = previous_ele.getElementsByClassName("v_play_btn")[0];
				previous_play_button.click();
				return false;
			}
		}
	}
}

previous_button();


//delete Button Coding

function delete_button()
{
	var all_del_btn = document.getElementsByClassName("del_btn");
	var i;
	for(i = 0; i<all_del_btn.length; i++)
	{
		all_del_btn[i].onclick = function()
		{
			var parent = this.parentElement;
			var vdo_name = parent.getElementsByTagName("P")[0].innerHTML;
			localStorage.removeItem(current_user+"video"+vdo_name);
			parent.className = "animate__animated animate__bounceOut";
			setTimeout(function()
			{
				parent.remove();
			},1000);
		}
	}

}

delete_button();


//volume coding

function volume()
{
	var v_icon = document.getElementById("volume");
	v_icon.onclick = function()
	{
		var vol_control = document.getElementById("vol_control");
		if(vol_control.style.display == "none")
		{
			vol_control.style.display = "block";
			vol_control.oninput = function()
			{
				video.volume = this.value;
			}
		}

		else
		{
			vol_control.style.display = "none";
		}
	}
}

volume();

// progress bar forward-backward coding

var p_box = document.getElementById("progress_box");
p_box.onclick = function(event)
{
	var per = event.offsetX/this.offsetWidth;
	video.currentTime = per*video.duration;
}

//full screen coding

var full = document.getElementById("full_screen");
full.onclick = function()
{
	video.requestFullscreen();
}


//vdo speed control coding

var speed_icon = document.getElementById("speed_icon");
speed_icon.onclick = function()
{
	var slider = document.getElementById("speed_control");
	if(slider.style.display == "none")
	{
		slider.style.display = "block";
		slider.oninput = function()
		{
			video.playbackRate = this.value;
		}
	}

	else if(slider.style.display == "block")
	{
		slider.style.display = "none";
	}
}

//search vdo codding

var search_box = document.getElementById("search");
search_box.oninput = function()
{
	var all_v_name = document.getElementsByClassName("playlist_v_name");
	var i;
	for(i = 0; i<all_v_name.length; i++)
	{
		if(all_v_name[i].innerHTML.toUpperCase().match(search_box.value.toUpperCase()))
		{
			var parent = all_v_name[i].parentElement;
			parent.style.display = "block";
		}

		else
		{
			var parent = all_v_name[i].parentElement;
			parent.style.display = "none";
		}
	}
}
