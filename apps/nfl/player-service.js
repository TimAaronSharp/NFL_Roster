function PlayerService(ready) {
    var playersData = []
    var myTeam =[]
    
    function loadPlayersData() {

        //Lets check the localstorage for the data before making the call.
        //Ideally if a user has already used your site 
        //we can cut down on the load time by saving and pulling from localstorage 

        var localData = localStorage.getItem('playersData');
        if (localData) {
            playersData = JSON.parse(localData);
            return ready(playersData);
            //return will short-circuit the loadPlayersData function
            //this will prevent the code below from ever executing
        }

        var url = "https://bcw-getter.herokuapp.com/?url=";
        var endpointUri = "http://api.cbssports.com/fantasy/players/list?version=3.0&SPORT=football&response_format=json";
        var apiUrl = url + encodeURIComponent(endpointUri);

        $.getJSON(apiUrl, function (data) {
            playersData = data.body.players;
            console.log('Player Data Ready')
            console.log('Writing Player Data to localStorage')
            localStorage.setItem('playersData', JSON.stringify(playersData))
            console.log('Finished Writing Player Data to localStorage')
            ready(playersData)
        });
    }
    //^^^^^^^^^^^^^^^^^^^PRIVATE PARTS^^^^^^^^^^^^^^^

    //-------------------PUBLIC PARTS----------------

    this.getPlayersByTeam = function getPlayersByTeam(teamName) {
        //return an array of all players who match the given teamName.
        return playersData.filter(function (player) {
            if (player.team == teamName) {
                return JSON.parse(JSON.stringify(playersData))
            }
        })
    }
    this.getPlayersByPosition = function getPlayersByPosition(position) {
        //return an array of all players who match the given position.
        return playersData.filter(function (player) {
            if (player.position == position) {
                return JSON.parse(JSON.stringify(playersData))
            }
        })
    }
    this.addToMyTeam = function addToMyTeam(){
        if(myTeam.length <11){

        }
    }
    //^^^^^^^^^^^^^^^^^^^PUBLIC PARTS^^^^^^^^^^^^^^^^
    loadPlayersData(); //call the function above every time we create a new service
    console.log(playersData)
}

    
/*---------NFL API STRUCTURE----------
data:{
    body:{
        players:{
            bye_week:"",
            firstname:"",
            photo:"",
            position:"",
            icons:"",
            headline:"",
            lastname:"",
            elias_id:"",
            pro_status:"",
            fullname:"",
            id:"",
            pro_team:""
        }
    }
}







*/