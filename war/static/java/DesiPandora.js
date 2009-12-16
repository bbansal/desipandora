            var sessionId = null;
            var xmlHttp = null;
            var baseAddress =  window.location.href.toString();
            var searchText = null;
            var songList = new Array();
            var prevSong  = null;
            
            function doGet(geturl, callback) {
              //alert("doGet:" + geturl);
              xmlHttp = null;
              xmlHttp = new XMLHttpRequest(); 
              xmlHttp.onreadystatechange = callback;
              xmlHttp.open( "GET", geturl, true );
              xmlHttp.send( null );
           }
            
            
            function getSessionIdCallback()  {
                var jsonData = null;
                if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) {
                      if ( xmlHttp.responseText != "Not found" ) {
                      
                       jsonData = eval('(' + xmlHttp.responseText + ')');                      
                       //alert("got New SessionId:" + jsonData.userSessionId);
                       sessionId = jsonData.userSessionId;
                         
                         
                        // do the search call here.
                        loadSearchResults(searchText)
                      }
                 }
             }
                        
            function getSearchResultsCallback()  {
                var jsonSongArray = null;
                if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 ) {
                      if ( xmlHttp.responseText != "Not found" ) {
                         //alert("searchResults:" + xmlHttp.responseText);
                         
                         jsonSongObject = eval('(' + xmlHttp.responseText + ')');   
                         //alert("got search results:" + jsonSongObject.songList);
                                            
                         for(var i=0; i< jsonSongObject.songList.length; i++){
                           songList.push(jsonSongObject.songList[i]);
                         } 
                         //alert("Added search results:" + songList); 
                         
                         playNext();                                       
                      }
                 }
             }
             
             
            function updateHTML(elmId, value){
                document.getElementById(elmId).innerHTML = value;
            }
            
            function setytplayerState(newState){
                updateHTML("playerstate", newState);
            }
            
            function onYouTubePlayerReady(playerId){
                ytplayer = document.getElementById("myytplayer");
                ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
                ytplayer.addEventListener("onError", "onPlayerError");
            }
            
            function onPlayerError(errorCode){
                 if (errorCode == 100)
                    playNext();
            }
            
            function onytplayerStateChange(newState){
                if (newState == 0){
                  playNext();
                }
                
               // setytplayerState(newState);
            }
            
            // functions for the api calls
            function loadNewVideo(id, startSeconds){
                if (ytplayer) {
                    ytplayer.loadVideoById(id, parseInt(startSeconds));
                }
            }
            
            function loadNewSearch(text){
              // TODO : refresh songList here and same on backend
              songList = [];
              if (sessionId == null){
                  searchText = text;
                  doGet(baseAddress + "/api?operation=getNewSessionId", getSessionIdCallback);              
              }
              else
              {   
                 loadSearchResults(text);
              }    
            }
            
            function loadSearchResults(text){      
              doGet(baseAddress + "/api?operation=search&keywords=" + text + "&userSessionId=" + sessionId, getSearchResultsCallback); 
            }
            
           function loadNextSongs(){     
              doGet(baseAddress + "/api?operation=getNextSongs&userSessionId=" + sessionId, getSearchResultsCallback); 
            }
            
            
            function cueNewVideo(id, startSeconds){
                if (ytplayer) {
                    ytplayer.cueVideoById(id, startSeconds);
                }
            }
            
            function playNext(){
              if(songList.length > 1){
                var song = songList.shift();
                updateHTML("title",song.title);
                
                //clear the current video and play next
                clearVideo();
                cueNewVideo(song.id,0);
                loadNewVideo(song.id, 0);
                play();
              }
              else {
                 if (null != sessionId){
                     alert("No more matches found for your search, try another one ... !!");
                 }else{
                       alert("Try a search, search by song title, artist or other keywords. !!");
                 
                 }
              }
              
              if(songList.length < 5){
                 // ajax async call to fill up the playlist
                 loadNextSongs();
              }
              
            }
            
            function play(){
                if (ytplayer) {
                    ytplayer.playVideo();
                }
            }
            
            function pause(){
                if (ytplayer) {
                    ytplayer.pauseVideo();
                }
            }
            
            function stop(){
                if (ytplayer) {
                    ytplayer.stopVideo();
                }
            }
            
            function getPlayerState(){
                if (ytplayer) {
                    return ytplayer.getPlayerState();
                }
            }
            
            function seekTo(seconds){
                if (ytplayer) {
                    ytplayer.seekTo(seconds, true);
                }
            }
            
            function getBytesLoaded(){
                if (ytplayer) {
                    return ytplayer.getVideoBytesLoaded();
                }
            }
            
            function getBytesTotal(){
                if (ytplayer) {
                    return ytplayer.getVideoBytesTotal();
                }
            }
            
            function getCurrentTime(){
                if (ytplayer) {
                    return ytplayer.getCurrentTime();
                }
            }
            
            function getDuration(){
                if (ytplayer) {
                    return ytplayer.getDuration();
                }
            }
            
            function getStartBytes(){
                if (ytplayer) {
                    return ytplayer.getVideoStartBytes();
                }
            }
            
            function mute(){
                if (ytplayer) {
                    ytplayer.mute();
                }
            }
            
            function unMute(){
                if (ytplayer) {
                    ytplayer.unMute();
                }
            }
            
            function getEmbedCode(){
                alert(ytplayer.getVideoEmbedCode());
            }
            
            function getVideoUrl(){
                alert(ytplayer.getVideoUrl());
            }
            
            function setVolume(newVolume){
                if (ytplayer) {
                    ytplayer.setVolume(newVolume);
                }
            }
            
            function getVolume(){
                if (ytplayer) {
                    return ytplayer.getVolume();
                }
            }
            
            function clearVideo(){
                if (ytplayer) {
                    ytplayer.clearVideo();
                }
            }
            
            function handleKeyStroke(field, e){
               var keycode;
               if (window.event) keycode = window.event.keyCode;
               else if (e) keycode = e.which;
                     else return true;

               if (keycode == 13)
               {
                  loadNewSearch(document.getElementById('searchTextid').value)
               }              
            }