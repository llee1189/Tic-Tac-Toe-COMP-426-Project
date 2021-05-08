
$(function() {

  loginPage();
  let loggers;
  let board;
  let nightmode = false;

  // Creating a zero array to represent the board
  function reset() {
    
    $("body").empty();

    let div1 = document.createElement("div");
    div1.setAttribute('class', 'temp');
    $("body").append(div1);

    let div = document.createElement("div");
    div.setAttribute('class', 'grid');
    $("body").append(div);

    playerOne = true;
    let ttt = [];
    for (let i = 0; i < 9; i++) {
      ttt.push(0);
    }
    board = ttt;
    boardCreation();
    if (nightmode) {
      var tempest = document.querySelectorAll(".slot");
      for (let i = 0; i < tempest.length; i++) {
        tempest[i].style.borderColor = "white";
      }
    }
    createRestartButton();
    createBirbButton();
    createHelpButton();
    if (!nightmode) {
          createNightModeButton();
    } else {
      createLightModeButton();
    }
    createSignOutButton();
  }

  // Creating the board
  function boardCreation() {
    let div = document.querySelector(".grid");
    for (let i = 0; i < 9; i++) {
      let temp = document.createElement("div");
      if (board[i] == 1) {
        temp.textContent = "X";
      } else if (board[i] == 2) {
        temp.textContent = "O";
      }
      temp.setAttribute('class', 'slot');
      temp.setAttribute('id', i);
      temp.addEventListener('click', click);
      div.append(temp);
    }

  }

  function recreate() {
    $(".grid").empty();
    boardCreation()
    if (nightmode) {
      var tempest = document.querySelectorAll(".slot");
      for (let i = 0; i < tempest.length; i++) {
        tempest[i].style.borderColor = "white";
      }
    }
    createRestartButton();
    winCheck();
  }

  function click() {
    let index = parseInt(this.id);
    if (board[index] != 0) {
      return;
    }
    if (playerOne) {
      board[index] = 1;
      playerOne = false;
    } else {
      board[index] = 2;
      playerOne = true;
    }
    recreate();
  }

  function winCheck() {
    for (let i = 0; i < 3; i++) {
      if (board[i] == board[i + 3] && board[i + 3] == board[i + 6] && board[i] != 0) {
        winner();
        return;
      }
    }

    for (let i = 0; i < 7; i = i + 3) {
      if (board[i] == board[i + 1] && board[i + 1] == board[i + 2] && board[i] != 0) {
        winner();
        return;
      }
    }

    if (board[0] == board[4] && board[4] == board[8] && board[0] != 0) {
      winner();
      return;
    }

    if (board[2] == board[4] && board[4] == board[6] && board[2] != 0) {
      winner();
      return;
    }

    for (let i = 0; i < 9; i++) {
      if (board[i] == 0) {
        return;
      }
    }

    cat();
  }

  function winner() {
    for (let i = 0; i < 9; i++) {
      let div = document.querySelector(".grid");
      div.children[i].removeEventListener('click', click)
    }
    if (!playerOne) {
      let x = document.createElement("div");
      x.textContent = "X wins!";
      x.setAttribute('class', 'win');
      $(".temp").append(x);
    } else {
      let o = document.createElement("div");
      o.textContent = "O wins!";
      o.setAttribute('class', 'win');
      $(".temp").append(o);
    }
  }

  function cat() {
    let cat = document.createElement("div");
    cat.textContent = "It's a draw!";
    cat.setAttribute('class', 'win');
    $(".temp").append(cat);
  }

  function createRestartButton() {
    let temp = document.createElement("div");

    var restartButton = document.createElement("button")
    restartButton.setAttribute('class','butt');
    restartButton.innerHTML = "Restart";


    restartButton.addEventListener('click', function() {
          reset();
        });

    temp.append(restartButton);
    $(".grid").append(temp);
  }
  
  function createBirbButton() {
        
    let temp = document.createElement("div");

    var birbButton = document.createElement("button")
    birbButton.setAttribute('class','butt');
    birbButton.innerHTML = "Birb";

    birbButton.addEventListener('click', function() {
      $("body").empty();
      var picture = 'https://farm4.static.flickr.com/3347/3664363773_cd58524c26.jpg';
      console.log(picture);
      let image = document.createElement("img")
      image.setAttribute("src", picture);
      $("body").append(image);
      playButton();
      });

    temp.append(birbButton);
    $(".temp").append(temp);
  }

  function createHelpButton() {
    
    let temp = document.createElement("div");

    var helpButton = document.createElement("button")
    helpButton.setAttribute('class','butt');
    helpButton.innerHTML = "How to play";

    helpButton.addEventListener('click', function() {
      $("body").empty();
      var youtube = document.createElement("iframe");
      youtube.setAttribute('id', 'yt');
      youtube.setAttribute('src', "https://www.youtube.com/embed/5SdW0_wTX5c");
      $("body").append(youtube);
      playButton();
      });

    temp.append(helpButton);
    $(".temp").append(temp);
  }

  function playButton() {

    var playButton = document.createElement("button")
    playButton.setAttribute('class','butt');
    playButton.innerHTML = "Play!";
    playButton.addEventListener('click', function() {
      $("body").empty()
      reset();
    })
    $("body").append(playButton);
  }

  function createNightModeButton() {

    let temp = document.createElement("div");

    var nightModeButton = document.createElement("button");
    nightModeButton.setAttribute('class', 'nightbutt');
    nightModeButton.innerHTML = "Nightmode!";
    nightModeButton.addEventListener('click', function() {
      nightmode = true;
      document.querySelector("body").style.backgroundColor = "#212121";
      document.querySelector("body").style.color = "white";
      var tempest = document.querySelectorAll(".slot");
      for (let i = 0; i < tempest.length; i++) {
        tempest[i].style.borderColor = "white";
      }
      hikari();
    })

    temp.append(nightModeButton);
    $(".temp").append(temp);

  }

  function createLightModeButton() {

    let temp = document.createElement("div");

    var lightModeButton = document.createElement("button");
    lightModeButton.setAttribute('class', 'lightbutt');
    lightModeButton.innerHTML = "Lightmode!";
    lightModeButton.addEventListener('click', function() {
      nightmode = false;
      document.querySelector("body").style.backgroundColor = "white";
      document.querySelector("body").style.color = "black";
      var tempest = document.querySelectorAll(".slot");
      for (let i = 0; i < tempest.length; i++) {
        tempest[i].style.borderColor = "black";
      }
      yagami();
    })

    temp.append(lightModeButton);
    $(".temp").append(temp);
  }

  function hikari() {
    var lightModeButton = document.createElement("button");
    lightModeButton.setAttribute('class', 'lightbutt');
    lightModeButton.innerHTML = "Lightmode!";
    lightModeButton.addEventListener('click', function() {
      nightmode = false;
      document.querySelector("body").style.backgroundColor = "white";
      document.querySelector("body").style.color = "black";
      var tempest = document.querySelectorAll(".slot");
      for (let i = 0; i < tempest.length; i++) {
        tempest[i].style.borderColor = "black";
      }
      yagami();
    })
    document.querySelector(".nightbutt").replaceWith(lightModeButton);
  }

  function yagami() {
    var nightModeButton = document.createElement("button");
    nightModeButton.setAttribute('class', 'nightbutt');
    nightModeButton.innerHTML = "Nightmode!";
    nightModeButton.addEventListener('click', function() {
      nightmode = true;
      document.querySelector("body").style.backgroundColor = "#212121";
      document.querySelector("body").style.color = "white";
      var tempest = document.querySelectorAll(".slot");
      for (let i = 0; i < tempest.length; i++) {
        tempest[i].style.borderColor = "white";
      }
      hikari();
    })
    document.querySelector(".lightbutt").replaceWith(nightModeButton);
  }

  function createSignOutButton() {
    let temp = document.createElement("div");

    var signOutButton = document.createElement("button");
    signOutButton.setAttribute('class', 'butt');
    signOutButton.innerHTML = "Signout";
    signOutButton.addEventListener('click', function() {
      firebase.auth().signOut().then(function() {
        window.alert("Signed out!");
        $("body").empty();
        loginPage();
      }).catch(function(error) {
        window.alert("Error, you are trapped forever.");
      })
    })

    temp.append(signOutButton);
    $(".temp").append(temp);

    let tempest = document.createElement("div");
    tempest.setAttribute("id", "user");
    tempest.innerHTML = "Signed in as " + loggers;
    $(".temp").append(tempest);
  }

  function loginPage() {
    var div = document.createElement("div");
    div.setAttribute("id", "logincss");

    var header = document.createElement("h1");
    header.innerHTML = "Log into your Tic Tac Toe Account";
    div.append(header);

    var user = document.createElement("input");
    user.setAttribute("type", "email"); user.setAttribute("placeholder", "Email"); user.setAttribute("id", "ef");
    div.append(user);
    
    var pass = document.createElement("input");
    pass.setAttribute("type", "password");
    pass.setAttribute("placeholder", "Password");
    pass.setAttribute("id", "pw");
    div.append(pass);



    var log = document.createElement("button");
    log.innerHTML = "Login";
    log.setAttribute("id", "login");
    log.addEventListener('click', function() {
      var user = document.getElementById("ef").value;
      var password = document.getElementById("pw").value;
      loggers = user;
    
      firebase.auth().signInWithEmailAndPassword(user, password)
      .then((userCredential) => {
        window.alert("Signed in!");
        reset();
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert(errorMessage);
      });
    
    })

    var signUp = document.createElement("button");
    signUp.innerHTML = "Signup!";
    signUp.setAttribute("id", "signup");
    signUp.addEventListener('click', signUpPage);

    div.append(log);
    div.append(signUp);

    $("body").append(div);
  }

  function signUpPage() {
    $("body").empty();
    var div = document.createElement("div");
    div.setAttribute("id", "logincss");

    var header = document.createElement("h1");
    header.innerHTML = "Let's make a new account!";
    div.append(header);

    var user = document.createElement("input");
    user.setAttribute("type", "email"); user.setAttribute("placeholder", "Email"); user.setAttribute("id", "sef");
    div.append(user);
    
    var pass = document.createElement("input");
    pass.setAttribute("type", "password");
    pass.setAttribute("placeholder", "Password");
    pass.setAttribute("id", "spw");
    div.append(pass);



    var log = document.createElement("button");
    log.innerHTML = "Make new account!";
    log.setAttribute("id", "slogin");
    log.addEventListener('click', function() {

      var user = document.getElementById("sef").value;
      var password = document.getElementById("spw").value;
      loggers = user;
      firebase.auth().createUserWithEmailAndPassword(user, password)
        .then((userCredential) => {
          // Signed in 
          window.alert("Signed up and logged in!");
          reset();
          // ...
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          window.alert(errorMessage);
          // ..
        });
    
    })

    var cancel = document.createElement("button");
    cancel.innerHTML = "Already have an account.";
    cancel.setAttribute("id", "cancel");
    cancel.addEventListener('click', function() {

      $("body").empty();
      loginPage();
    })


    div.append(log);
    div.append(cancel);


    $("body").append(div);
  }

});
