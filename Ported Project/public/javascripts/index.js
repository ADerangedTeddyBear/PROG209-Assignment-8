// start by creating data so we don't have to type it in each time
let gameArray = [];
let systemArray = [];

document.addEventListener("DOMContentLoaded", function () {

    // page before show code *************************************************************************
     $(document).on("pagebeforeshow", "#ListAll", function (event) {   
        FillGameArrayFromServer(),     
        FillSystemArrayFromServer()
    });

    $(document).on("pagebeforeshow", "#ListSome", function (event) {   
        FillGameArrayFromServer(),     
        FillSystemArrayFromServer()
    });
    // end of page before show code *************************************************************************

});  
// end of wait until document has loaded event  *************************************************************************

//Game list assembly
function FillGameArrayFromServer(){
    // using fetch call to communicate with node server to get all data
    fetch('/gamelist')
    .then(function (theResonsePromise) {  // wait for reply.  
        return theResonsePromise.json();
    })
    .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
        gameArray.length = 0;  // clear local array
        gameArray = serverData;   // use our server json data which matches our objects in the array perfectly
        createGameList();  // placing this here will make it wait for data from server to be complete before re-doing the list
        getMostRecentGame();
    })
    .catch(function (err) {
     console.log(err);
    });

};

function createGameList() {
    // clear prior data
    var divGameList = document.getElementById("divGameList");
    while (divGameList.firstChild) {    // remove any old data so don't get duplicates
        divGameList.removeChild(divGameList.firstChild);
    };
    // re-build the li's with fresh data
    var ul = document.createElement('ul');
    gameArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.Name + ", Rating:  " + element.Rating + " out of 10, Comments:  " + element.Review;
        ul.appendChild(li);
    });
    divGameList.appendChild(ul)
};

function getMostRecentGame() {
    // clear prior data
    var divMostRecentGame = document.getElementById("divMostRecentGame");
    while (divMostRecentGame.firstChild) {    // remove any old data so don't get duplicates
        divMostRecentGame.removeChild(divMostRecentGame.firstChild);
    };
    // re-build the li's with fresh data
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    li.innerHTML = gameArray[gameArray.length - 1].Name + ", Rating:  " + gameArray[gameArray.length - 1].Rating + " out of 10, Comments:  " + gameArray[gameArray.length - 1].Review;
    ul.appendChild(li);

    divMostRecentGame.appendChild(ul)
};

//System list assembly
function FillSystemArrayFromServer(){
    // using fetch call to communicate with node server to get all data
    fetch('/systemlist')
    .then(function (theResonsePromise) {  // wait for reply.  
        return theResonsePromise.json();
    })
    .then(function (serverData) { // now wait for the 2nd promise, which is when data has finished being returned to client
        systemArray.length = 0;  // clear local array
        systemArray = serverData;   // use our server json data which matches our objects in the array perfectly
        createSystemList();  // placing this here will make it wait for data from server to be complete before re-doing the list
        getMostRecentSystem();
    })
    .catch(function (err) {
     console.log(err);
    });
};

function createSystemList() {
    // clear prior data
    var divSystemList = document.getElementById("divSystemList");
    while (divSystemList.firstChild) {    // remove any old data so don't get duplicates
    divSystemList.removeChild(divSystemList.firstChild);
    };
    // re-build the li's with fresh data
    var ul = document.createElement('ul');
    systemArray.forEach(function (element,) {   // use handy array forEach method
        var li = document.createElement('li');
        li.innerHTML = element.Name + ", Rating:  " + element.Rating + " out of 10, Comments:  " + element.Review;
        ul.appendChild(li);
    });
    divSystemList.appendChild(ul)
};

function getMostRecentSystem() {
    // clear prior data
    var divMostRecentSystem = document.getElementById("divMostRecentSystem");
    while (divMostRecentSystem.firstChild) {    // remove any old data so don't get duplicates
    divMostRecentSystem.removeChild(divMostRecentSystem.firstChild);
    };
    // re-build the li's with fresh data
    var ul = document.createElement('ul');
    var li = document.createElement('li');
    li.innerHTML = systemArray[systemArray.length - 1].Name + ", Rating:  " + systemArray[systemArray.length - 1].Rating + " out of 10, Comments:  " + systemArray[systemArray.length - 1].Review;
    ul.appendChild(li);

    divMostRecentSystem.appendChild(ul)
};