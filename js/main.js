function klik() {
    alert("alohamora beybeh");
}

function signUp() {
    // debugger
    name = document.getElementById('name').value;
    email = document.getElementById('email').value;
    fullName = document.getElementById('fullName').value;
    password = document.getElementById('password').value;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/api/signup");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "username": name,
        "email": email,
        "password": password,
        "fullname": fullName
    }));
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Data Berhasil Di Submit dengan Status Code: " + this.status);
            window.location = "/signin.html";
        } else if (this.readyState == 4) {
            alert("Data gagal di input: " + this.status);
        }
    };

    // alert("Ini Adalah Name Twitter: "+name);
    // console.log(name);
    // tambah(3, 5);
}

function signIn() {
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;

    var xmlRequest = new XMLHttpRequest();
    xmlRequest.open("POST", "http://localhost:5000/api/login");
    xmlRequest.setRequestHeader("Content-Type", "application/json");
    xmlRequest.send(JSON.stringify({
        "email": email,
        "password": password
    }));
    xmlRequest.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // alert("SignIn berhasil dengan status code :"+this.status);
            console.log(typeof this.response); // check type output data
            console.log(JSON.parse(this.response).email);

            // window.email = JSON.parse(this.response).email;
            localStorage.setItem('email', JSON.parse(this.response).email);
            // localStorage.getItem("email");

            window.location = "/";
        } else if (this.readyState == 4) {
            alert("SignIn gagal dengan status code :" + this.status);
        }
    };
}

function addTweet() {
    // alert("Ok Kepanggil")
    tweet = document.getElementById('tweet-box').value;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", "http://localhost:5000/api/tweet");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "email": localStorage.getItem("email"),
        "tweet": tweet
    }));
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            masukanTweet = JSON.parse(this.response);
            console.log(masukanTweet);

            document.getElementById('feed-box').insertAdjacentHTML("afterbegin", `<div class="tweet">
            <img src="assets/image1.jpg" alt="foto orang" />
            <h3>${masukanTweet.email}</h3>
            <p>${masukanTweet.tweet}</p>
            <span>${masukanTweet.date}</span>
        </div>`);

        } else if (this.readyState == 4) {
            alert("Tweet gagal ditambhkan dengan error code: " + this.status);
        }
    };
    // alert(tweet);
}

function allTweet() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:5000/api/getAllTweet");
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            JSON.parse(this.response).forEach(function (data, index) {
                data.tweet.forEach(function (tweet, i) {
                    document.getElementById('feed-box').insertAdjacentHTML("afterbegin", `<div class="tweet">
            <img src="assets/image1.jpg" alt="foto orang" />
            <h3>${data.email}</h3>
            <p>${tweet}</p>
            <span>${data.date[i]}</span>
            </br>
            <div>
                <button type="submit" onclick="deleteTweet(this)" class="delete" id="del${i}">Delete</button>
            </div>
            <div>
                <button type="submit" onclick="deleteTweetCara2('${data.email}', '${tweet}', '${data.date[i]}')" class="delete">Delete Cara 2</button>
            </div>
        </div>`);
                });
            });
        } else if (this.readyState == 4) {
            alert("Error dengan status code: " + this.status + " " + this.statusText);
        }
    };
    xmlHttp.send();
}

function deleteTweet(data){
    // console.log(data); // <button type="submit" onclick="deleteTweet(this)" class="delete" id="del1">Delete</button>
    // console.log(data.id); // del1
    // console.log(document.getElementById(data.id).closest(".tweet")); 
    // // <div class="tweet">
    // //         <img src="assets/image1.jpg" alt="foto orang">
    // //         <h3>pisan@haha.com</h3>
    // //         <p>Hahahahahhahahahahah</p>
    // //         <span>2018-10-24 09:47:59.102079</span>
    // //         <br>
    // //         <div>
    // //             <button type="submit" onclick="deleteTweet(this)" class="delete" id="del1">Delete</button>
    // //         </div>
    // //     </div>
    // console.log(document.getElementById(data.id).closest(".tweet").querySelectorAll('p')); // NodeList [p]
    // console.log(document.getElementById(data.id).closest(".tweet").querySelectorAll('p')[0].innerText); // Hahahahahhahahahahah

    parent = document.getElementById(data.id).closest(".tweet");
    tweet = parent.querySelectorAll('p')[0].innerText;
    email = parent.querySelectorAll('h3')[0].innerText;
    date = parent.querySelectorAll('span')[0].innerText;

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("DELETE", "http://localhost:5000/api/getAllTweet");
    xmlHttp.setRequestHeader("Content-Type", "application/json");
    xmlHttp.send(JSON.stringify({
        "email": email,
        "tweet": tweet,
        "date": date
    }));
}

function deleteTweetCara2(email, tweet, date){
    console.log(email, tweet, date);
}

// function tambah(a, b){
//     add = a * b;
//     console.log(add);
// }