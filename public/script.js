function saveNickname() {
    const nickname = document.getElementById("nickname").value;

    fetch("/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nickname: nickname })
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error("Fel:", error));
}
