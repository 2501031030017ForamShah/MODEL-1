// Load Header with Alert for testing
fetch("hedar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("File nahi mili! Check spelling or path.");
        }
        return response.text();
    })
    .then(data => {
        document.getElementById("hedar").innerHTML = data;
        console.log("Header loaded successfully!");
    })
    .catch(err => {
        console.error("Error:", err);
        alert("Header load nahi hua: " + err.message);
    });