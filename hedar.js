fetch("hedar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("hedar").innerHTML = data;
  });