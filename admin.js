function Upload(){
    console.log("Uploading");
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        document.getElementById("response").innerHTML = this.responseText;
        if (this.responseText == "Done!"){
            window.open("/");
        }
      }
    }
    var oppe = document.getElementById("oppe").checked;
    var password = document.getElementById("password").value;
    httpRequest.open("POST", 'https://stenhusflag.azurewebsites.net/api/flag/v1/set?flagUp=' + oppe);
    httpRequest.setRequestHeader("Authorization", "Bearer " + password);
    httpRequest.send();
}