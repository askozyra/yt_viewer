import * as globalVars from "./global_vars.js";
import * as domElements from "./dom_vars.js";
import * as userFunctions from "./functions.js";

export let player;

domElements.SEARCH_FIELD.addEventListener("input", () => { URLvalidator(domElements.SEARCH_FIELD.value); });
domElements.VIDEO_PREVIEW.addEventListener("click", () => { startVideo(globalVars.VIDEO); });

function setCurrentVideo(data){
    [
        globalVars.VIDEO.id,
        globalVars.VIDEO.link,
        globalVars.VIDEO.title,
        globalVars.VIDEO.author,
        globalVars.VIDEO.preview
    ] = Object.values(data);
}

async function URLvalidator(input) {
    const URL = input;
    const validURL = new RegExp(/^\s*?(?:http(?:s){0,1}:\/\/){0,1}(?:(?:www.youtube.com\/watch\?v=)|(?:youtu.be\/))(\S[^\&^\s]+).*$/, "g");
    
    if(URL.match(validURL)){
        userFunctions.clearPreview();

        const VIDEO_ID = Array.from(URL.matchAll(validURL))[0][1];
        const RESPONSE = await userFunctions.getVideoInfoById(VIDEO_ID);
        const RESULT = await RESPONSE.json();

        if(!RESULT.error){
            setCurrentVideo(RESULT);
            videoPreview(RESULT);
        }
    }
}

function videoPreview(video) {
    let prev = userFunctions.createPreview(video);
    
    userFunctions.clearPreview();
    userFunctions.showPreview(prev);
}

function startVideo(video) {
    userFunctions.clearPreview();
    userFunctions.clearSearchField();
    
    if (player) {
        if(player.getPlayerState() === 0)
            player.loadVideoById(video.id, 0, "highres");
        else
            userFunctions.addVideoToQueue(video);
    } else {
        player = new YT.Player("player", {
            height: "100%",
            width: "100%",
            playerVars: {
                autoplay: 1,
                controls: 1
            },
            events: {
                onStateChange: onPlayerStateChange
            },
            videoId: video.id,
        });
    }
    document.addEventListener("touchstart", () => {}, { passive: true });
}
function onPlayerStateChange(event) {
    if(event.data === 0 && globalVars.QUEUE.length) {
        let tmpVideo = globalVars.QUEUE.shift();
        
        setCurrentVideo(tmpVideo);
        
        player.loadVideoById(globalVars.VIDEO.id, 0, "highres");
        userFunctions.updateQueue();
    }
}