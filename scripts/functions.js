import * as domElements from "./dom_vars.js";
import { QUEUE } from "./global_vars.js";

export function clearSearchField(){
    domElements.SEARCH_FIELD.value = "";
}

export function clearPreview(){
    domElements.VIDEO_PREVIEW.style.opacity = 0;
    domElements.VIDEO_PREVIEW.style.visibility = "hidden";
    while(domElements.VIDEO_PREVIEW.firstChild)
        domElements.VIDEO_PREVIEW.removeChild(domElements.VIDEO_PREVIEW.firstChild);
}

export function showPreview(data){
    domElements.VIDEO_PREVIEW.append(data.i);
    domElements.VIDEO_PREVIEW.append(data.text_info_wrapper);

    domElements.VIDEO_PREVIEW.style.opacity = 1;
    domElements.VIDEO_PREVIEW.style.visibility = "visible";
}

export async function getVideoInfoById(videoId){
    return await fetch('./functions/functions.php', {
        method: "POST",
        body: JSON.stringify({
            "videoId": videoId
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function createPreview(video){
    let i = document.createElement("img");
    i.setAttribute("class", "video_preview__thumbnail");
    i.setAttribute("src", video.preview);

    let t = document.createElement("p");
    t.innerHTML = video.title;
    t.setAttribute("class", "video_preview__title");
 
    let a = document.createElement("p");
    a.innerHTML = video.author;
    a.setAttribute("class", "video_preview__author");

    let text_info_wrapper = document.createElement("div");
    text_info_wrapper.setAttribute("class", "video_preview_text_info");

    text_info_wrapper.appendChild(t);
    text_info_wrapper.appendChild(a);

    return {i, text_info_wrapper};
}

export function addVideoToQueue(item){    
    QUEUE.push( { "id": item.id, "link": item.link, "title": item.title, "author": item.author, "preview": item.preview } );
    
    updateQueue();
}

export function removeVideoFromQueue(index){
    QUEUE.splice(index, 1);

    updateQueue();
}

export function updateQueue(){
    while(domElements.QUEUE_LIST.firstChild)
        domElements.QUEUE_LIST.removeChild(domElements.QUEUE_LIST.firstChild);
    
    QUEUE.forEach(item => {
        let video = createQueueItem(item);
        addDragEvents(video);

        domElements.QUEUE_LIST.appendChild(video);
    });
}

function addDragEvents(video){
    video.draggable = true;

    video.ondragstart = e => {
        e.target.classList.add("dragging");
    }
    video.ondragover = e => {
        e.target.parentElement.classList.remove("drag_over");
        e.target.parentElement.classList.add("drag_over");
        e.preventDefault();
    }
    video.ondragleave = e => {
        e.target.parentElement.classList.remove("drag_over");
    }
    video.ondragend = e => {           
        let dragging = document.querySelector(".dragging");
        let old = document.querySelector(".drag_over");
        let q = old.parentNode.children;
        
        dragging.classList.remove("dragging");
        old.classList.remove("drag_over");

        swapVideosByIndexes(getIndexOfDOMElement(q, dragging), getIndexOfDOMElement(q, old));
    }
}

function createQueueItem(data){
    let video = document.createElement("li");
    video.setAttribute("class", "queue_item");

    let img = document.createElement("img");
    img.setAttribute("class", "queue__thumbnail");
    img.setAttribute("src", data.preview);

    let wrapper = document.createElement("div");
    wrapper.setAttribute("class", "video_preview_text_info");

    let title = document.createElement("p");
    title.setAttribute("class", "video_preview__title");
    title.innerHTML = data.title;
        
    let author = document.createElement("p");
    author.setAttribute("class", "video_preview__author");
    author.innerHTML = data.author;
        
    wrapper.appendChild(title);
    wrapper.appendChild(author);

    video.appendChild(img);
    video.appendChild(wrapper);

    addQueueControls(video);

    return video;
}

function addQueueControls(item){
    let controls = document.createElement("div");
    let remove_btn = document.createElement("div");

    controls.setAttribute("class", "controls");
    remove_btn.setAttribute("class", "remove-btn");
    remove_btn.innerHTML = '<svg fill="#000000" xmlns="http:\/\/www.w3.org/2000/svg"  viewBox="0 0 50 50" width="30px" height="30px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"/></svg>';
    controls.appendChild(remove_btn);

    remove_btn.addEventListener("click", (event) => {
        let child = event.currentTarget.parentNode.parentNode;
        let parent = event.currentTarget.parentNode.parentNode.parentNode.children;

        removeVideoFromQueue(getIndexOfDOMElement(parent, child));
    });

    item.appendChild(controls);
}

function swapVideosByIndexes(index1, index2){
    [QUEUE[index1], QUEUE[index2]] = [QUEUE[index2], QUEUE[index1]];

    updateQueue();
}

function getIndexOfDOMElement(parent, element){
    return Array.prototype.indexOf.call(parent, element);
}