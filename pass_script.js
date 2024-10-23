document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".btn").addEventListener("click", (e) => {
        e.preventDefault();

        let website = document.querySelector("#website").value;
        let username = document.querySelector("#username").value;
        let password = document.querySelector("#password").value;

        if (!website || !username || !password) {
            alert("Please fill in all fields");
            return;
        }

        let passwords = localStorage.getItem("passwords");
        let arr = passwords ? JSON.parse(passwords) : [];

        arr.push({ website, username, password });
        localStorage.setItem("passwords", JSON.stringify(arr));

        alert("Password Saved");
        showPasswords();

        // Clear form inputs
        document.querySelector("#website").value = "";
        document.querySelector("#username").value = "";
        document.querySelector("#password").value = "";
    });

    // Function to display saved passwords
    function showPasswords() {
        let tb = document.querySelector("table");
        let data = localStorage.getItem("passwords");
        if (!data || JSON.parse(data).length === 0) {
            tb.innerHTML = "No Data To Show";
        } else {
            tb.innerHTML = `
                <tr>
                    <th>Website</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Delete</th>
                </tr>`;
            let arr = JSON.parse(data);
            let str = "";
            arr.forEach(element => {
                str += `<tr>
                    <td>${element.website} <img onclick="copyText('${element.website}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                    <td>${element.username} <img onclick="copyText('${element.username}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                    <td>${maskPassword(element.password)} <img onclick="copyText('${element.password}')" src="./copy.svg" alt="Copy Button" width="10" height="10"></td>
                    <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
                </tr>`;
            });
            tb.innerHTML += str;
        }
    }

    // Function to mask password with asterisks
    function maskPassword(pass) {
        return '*'.repeat(pass.length);
    }

    // Delete password entry
    window.deletePassword = (website) => {
        let data = localStorage.getItem("passwords");
        let arr = JSON.parse(data);
        let updatedArr = arr.filter(item => item.website !== website);
        localStorage.setItem("passwords", JSON.stringify(updatedArr));
        alert(`${website} password deleted`);
        showPasswords(); // Refresh table
    }

    // Function to copy text to clipboard
    window.copyText = (txt) => {
        navigator.clipboard.writeText(txt).then(
            () => {
                document.getElementById("alert").style.display = "inline";
                setTimeout(() => {
                    document.getElementById("alert").style.display = "none";
                }, 2000);
            },
            () => {
                alert("Clipboard copying failed");
            }
        );
    }

    // Display passwords initially
    showPasswords();
});
