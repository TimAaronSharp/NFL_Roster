function PlayerController() {
    //-------------------PRIVATE PARTS---------------
    var loading = true; //Start the spinner
    var playerService = new PlayerService(ready);

    playerService.getPlayersByTeam(ready)
    playerService.getPlayersByPosition(ready)
    playerService.getPlayersByName(ready)
    function ready(list) {
        loading = false; //stop the spinner

        //Now that all of our player data is back we can safely setup our bindings for the rest of the view.
        //updateRoster(list)
        $('some-button').on('click', function () {
            var teamSF = playerService.getPlayersByTeam("SF");
        })
    }

    // function updateRoster(list){
    //     var elem = document.getElementById('player-roster')
    //     elem.innerHTML= ''
    //     var playerTemplate = ''
    //     for (var i in list) {
    //         if (list.hasOwnProperty(i)) {
    //             var player = list[i];
                
    //         }
    //     }
    // }
    //^^^^^^^^^^^^^^^^^^^PRIVATE PARTS^^^^^^^^^^^^^^^
// this.addToMyTeam = function addToMyTeam(){}
    
        //-------------------PUBLIC PARTS----------------
        this.filterTeam = function filterTeam(teamName){
               console.log(playerService.getPlayersByTeam(teamName))  
            }
        this.filterPosition = function filterPosition(position){
               console.log(playerService.getPlayersByPosition(position))   
            }
            this.filterName = function filterName(name){
                console.log(playerService.getPlayersByName(name)) //look into HTMLInput.value or something like that
            }
       //^^^^^^^^^^^^^^^^^^^PUBLIC PARTS^^^^^^^^^^^^^^^^





}





