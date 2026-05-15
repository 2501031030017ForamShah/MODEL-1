fetch("hedar.html")
  .then(response => response.text())
  .then(data => {
    document.getElementById("header").innerHTML = data;
  });
  window.location.href = "home.html";