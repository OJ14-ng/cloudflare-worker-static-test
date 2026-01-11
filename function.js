
	console.log("ready");
	
	$(document).ready(function(e) {
		
		setImage();
		setHelpLink();
		setValues();
		
	});	

	
	$("#form").submit(function(event){
		console.log("submit");
		event.preventDefault();
		setValues();
		getAction();
	});

	function setAuto(){
	  if (document.getElementById('auto').checked) 
	  {
	      document.getElementById('autologin').value = "true";
	      document.getElementById('remember').value = "1";
	  } else {
		  document.getElementById('autologin').value = "false";
		  document.getElementById('remember').value = "0";
	  }
	}	


function setImage(){
	console.log(window.location.host);
	if (window.location.host.indexOf("cwpanama.net") > -1) {
		document.title = "Cable&Wireless Panama";
		document.getElementById('hdrImage').setAttribute('src','img/cwpanama_net.png');
		document.getElementById('favicon').setAttribute('href','img/faviconPA.ico');
	}else if (window.location.host.indexOf("candwmail.com") > -1){
		document.title = "Flow";
		document.getElementById('hdrImage').setAttribute('src','img/candwmail_com.png');
		document.getElementById('favicon').setAttribute('href','img/faviconFL.ico');
	}else if (window.location.host.indexOf("batelnet.bs") > -1){
		document.title = "Batelnet";
		document.getElementById('hdrImage').setAttribute('src','img/batelnet_bs.png');
		document.getElementById('favicon').setAttribute('href','img/faviconBTC.ico');
	}else{
		document.title = "Cable&Wireless Panama";
		document.getElementById('hdrImage').setAttribute('src','img/cwpanama_net.png');
		document.getElementById('favicon').setAttribute('href','img/faviconPA.ico');
	}
}

function setHelpLink(){
	console.log(window.location.host);
	if (window.location.host.indexOf("cwpanama.net") > -1) {
		document.getElementById('hlpLink').setAttribute('href','https://mailconfig.cwpanama.net/tmngxSelfcareCWC/recovery?1&variant=pa');
	}else if (window.location.host.indexOf("candwmail.com") > -1){
		document.getElementById('hlpLink').setAttribute('href','https://mailconfig.candwmail.com/tmngxSelfcareCWC/recovery?1&variant=fl');
	}else if (window.location.host.indexOf("batelnet.bs") > -1){
		document.getElementById('hlpLink').setAttribute('href','https://mailconfig.batelnet.bs/tmngxSelfcareCWC/recovery?1&variant=bs');
	}else{
		document.getElementById('hlpLink').setAttribute('href','https://mailconfig.cwpanama.net/tmngxSelfcareCWC/recovery?1&variant=pa');
	}
}

function setValues(){
	var email = document.getElementById('username').value;
	document.getElementById('login').value = email;
}

function getAction() {
	var email = document.getElementById('username').value;
	$.ajax({
        type: "POST",
        url: "/getAction",
        dataType: 'text',
        data: {
        	'email': email
        },
        cache: false,
        timeout: 600000,
        success: function (msg) {
        	console.log(msg);
        	setFormAction(msg);
        },
        error: function(xhr) {
        	var json = JSON.parse(xhr.responseText);
        	document.getElementById("error").textContent=json.message;
        }
	});
}

function setFormAction(msg){
	console.log("send: " + msg);
	document.getElementById('form').action = msg;
	document.getElementById('form').submit();
}
