function PlayerController() {
    //-------------------PRIVATE PARTS---------------
    var loading = true; //Start the spinner
    var playerService = new PlayerService(ready);

    playerService.getPlayersByTeam(ready)
    playerService.getPlayersByPosition(ready)

    this.filter = function filter(teamName){
    
       console.log(playerService.getPlayersByTeam(teamName))
        
    }

    function ready() {
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.

        $('some-button').on('click', function () {
            var teamSF = playerService.getPlayersByTeam("SF");
        })
    }
    //^^^^^^^^^^^^^^^^^^^PRIVATE PARTS^^^^^^^^^^^^^^^
// this.addToMyTeam = function addToMyTeam(){}
    
        //-------------------PUBLIC PARTS----------------
       //^^^^^^^^^^^^^^^^^^^PUBLIC PARTS^^^^^^^^^^^^^^^^





}





