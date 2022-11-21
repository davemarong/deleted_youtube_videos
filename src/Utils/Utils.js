/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
// Injecting a function into the webpage. This function then has access to the webpage dom.
export const injectFunctionToWebsite = async (func) => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: func,
  });
};

export const getPlaylistAndPassMessage = () => {
  let currentPlaylis = [
    document.querySelectorAll("[playlist-type='PLVE'] #items #playlist-items"),
  ];
  console.log("1");
  const currentPlaylist = [...currentPlaylis];
  console.log("2");
  let neyArray = [];
  currentPlaylist.forEach((item) => {
    const title = item.querySelector("#meta h4 #video-title");
    console.log(title);

    const img = item.querySelector("#img");
    console.log(img);

    const url = item.querySelector("#thumbnail");
    console.log(url);
  });
  //   currentPlaylist.map((item) => {
  //     const title = item.querySelector("#meta h4 #video-title");
  //     const img = item.querySelector("#img");
  //     const url = item.querySelector("#thumbnail");
  //     return { title: title.textContent.trim(), img: img.src, url: url.href };
  //   });
  console.log("3");

  // Find playlistId in the url
  const text = "list=";
  const url = window.location.href;
  const number = url.search(text);
  const playlistId = url.slice(number + 5, number + 5 + 34);

  // Get img-url from oldPlaylist if newPlaylist does not have
  chrome.storage.local.get(["data"], ({ data }) => {
    const updatedCurrentPlaylist = currentPlaylist.map((currentVideo) => {
      // If img is present, return
      if (currentVideo.img) return currentVideo;

      // If image is not present, find image in old playlist and return that
      const updatedVideo = data.playlist.find(
        (oldVideo) => currentVideo.title === oldVideo.title
      );

      if (updatedVideo) {
        return updatedVideo;
      } else {
        return currentVideo;
      }
    });

    // Send data back to extension
    chrome.runtime.sendMessage({
      playlist: updatedCurrentPlaylist,
      playlistId: playlistId,
    });
  });
};
