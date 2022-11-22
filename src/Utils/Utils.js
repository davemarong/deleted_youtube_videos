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

// Compare playlist and return "deleted" videos
export const comparePlaylists = (selector1, selector2) => {
  let oldPlaylist_element = document.querySelector(selector1);
  let newPlaylist_element = document.querySelector(selector2);

  const oldPlaylist = [...oldPlaylist_element.querySelectorAll("p")].map(
    (video) => video.textContent
  );
  const newPlaylist = [...newPlaylist_element.querySelectorAll("p")].map(
    (video) => video.textContent
  );

  const newlyDeletedVideos = oldPlaylist.filter(
    (oldVideo) => !newPlaylist.find((currentVideo) => oldVideo === currentVideo)
  );
  return [newlyDeletedVideos.length, newlyDeletedVideos];
};
