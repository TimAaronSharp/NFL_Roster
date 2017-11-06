function PlayerController() {
    //-------------------PRIVATE PARTS---------------
    var loading = true; //Start the spinner
    var playerService = new PlayerService(ready);
    var currentSearchType = ''
    var currentSearchValue = ''

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
    function drawNameList(){
        var names = playerService.getNames()
        debugger
        var nameElem = document.getElementById('nameDropdown')
        nameElem.innerHTML = ''
        var nameTemplate = ''
        for (var i = 0; i < names.length; i++) {
            var name = names[i];
            nameTemplate += `
            <option value="lastname" id="${name.fullname}">${name.fullname}</option>
            
            `
        }
        nameElem.innerHTML = nameTemplate
    }
    drawNameList()

    function updateRoster(currentPlayerData) {
        //debugger
        var elem = document.getElementById('player-roster')
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
            elem.innerHTML = playerTemplate
        }
    }
    function updateMyTeam() {
        // debugger
        var myPlayers = playerService.getMyTeam()
        var myElem = document.getElementById('my-area')
        myElem.innerHTML = ''
        var myTemplate = ''
        for (var i in myPlayers) {
            var myPlayer = myPlayers[i];
            myPlayer.photo = myPlayer.photo.replace('http:', '')
            myTemplate += `
            <div class="player-card col-sm-12 col-md-2">
            <img src="${myPlayer.photo}" default="//sports.cbsimg.net/images/players/unknown-player-170x170.png" width="170">
            <h3>${myPlayer.fullname}</h3>
            <h5>Team: ${myPlayer.pro_team}</h5>
            <h5>Pos: ${myPlayer.position}</h5>
            <button id="${myPlayer.id}" onclick="app.controllers.playerController.removeFromMyTeam('${myPlayer.id}')">Remove From Team</button>
            </div>

            `
        }
        myElem.innerHTML = myTemplate
    }
    
    //^^^^^^^^^^^^^^^^^^^PRIVATE PARTS^^^^^^^^^^^^^^^

    
    //-------------------PUBLIC PARTS----------------

    this.handleSelect = function handleSelect(myForm){
        var selIndex = myForm.nameList.selectedIndex
        var selValue = myForm.nameList.options[selIndex].value
        var selId = myForm.nameList.options[selIndex].id
        this.searchFor(selValue, selId)
    }

    this.searchFor = function searchFor(searchType, searchValue){
        switch(searchType){
            case 'team':
            currentSearchType = searchType
            currentSearchValue = searchValue
            updateRoster(playerService.getPlayersByTeam(searchValue))
            break;

            case 'position':
            currentSearchType = searchType
            currentSearchValue = searchValue
            playerService.getPlayersByPosition(searchValue)
            updateRoster(playerService.getPlayersByPosition(searchValue))
            break;

            case 'lastname':
            currentSearchType = searchType
            currentSearchValue = searchValue
            playerService.getPlayersByName(searchValue)
            updateRoster(playerService.getPlayersByName(searchValue))
            break;
             
        }
    }

    this.addToMyTeam = function addToMyTeam(id){
        playerService.addToMyTeam(id)
        
        this.searchFor(currentSearchType, currentSearchValue)
        updateMyTeam()
        // console.log(currentFilter)
    }
    this.removeFromMyTeam = function removeFromMyTeam(id){
        playerService.removeFromMyTeam(id)
        
        this.searchFor(currentSearchType, currentSearchValue)
        updateMyTeam()
        // console.log(currentFilter)
    }
    //^^^^^^^^^^^^^^^^^^^PUBLIC PARTS^^^^^^^^^^^^^^^^
    //updateRoster(currentFilter)
    
}
