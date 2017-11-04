function PlayerController() {
    //-------------------PRIVATE PARTS---------------
    var loading = true; //Start the spinner
    var playerService = new PlayerService(ready);
    var currentFilter = []

    // playerService.getPlayersByTeam(ready)
    // playerService.getPlayersByPosition(ready)
    // playerService.getPlayersByName(ready)
    function ready(playersData) {
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
        // updateRoster(playersData)
        $('some-button').on('click', function () {
            var teamSF = playerService.getPlayersByTeam("SF");
        })
    }

    function updateRoster(currentPlayerData) {
        // debugger
        var elem = document.getElementById('image-area')
        elem.innerHTML = ''
        var playerTemplate = ''
        for (var i in currentPlayerData) {
            var player = currentPlayerData[i];
            player.photo = player.photo.replace('http:', '')
            playerTemplate += `
            <div class="player-card col-sm-12 col-md-2">
            <img src="${player.photo}" default="//sports.cbsimg.net/images/players/unknown-player-170x170.png" width="170">
            <h3>${player.fullname}</h3>
            <h5>Team: ${player.pro_team}</h5>
            <h5>Pos: ${player.position}</h5>
            <button id="${player.id}" onclick="app.controllers.playerController.addToMyTeam('${player.id}')">Add to Team</button>
            </div>

            `
        }
        elem.innerHTML = playerTemplate
    }
    //^^^^^^^^^^^^^^^^^^^PRIVATE PARTS^^^^^^^^^^^^^^^

    
    //-------------------PUBLIC PARTS----------------
    this.filterTeam = function filterTeam(teamName) {
        currentFilter = playerService.getPlayersByTeam(teamName)
        updateRoster(playerService.getPlayersByTeam(teamName))
        console.log(playerService.getPlayersByTeam(teamName))
    }
    this.filterPosition = function filterPosition(position) {
        playerService.getPlayersByPosition(position)
        console.log(playerService.getPlayersByPosition(position))
    }
    this.filterName = function filterName(name) {
        playerService.getPlayersByName(name)
        console.log(playerService.getPlayersByName(name)) //look into HTMLInput.value or something like that
    }

    this.addToMyTeam = function addToMyTeams(id){
        playerService.addToMyTeam(id)
        updateRoster(currentFilter)
    }
    //^^^^^^^^^^^^^^^^^^^PUBLIC PARTS^^^^^^^^^^^^^^^^
}
