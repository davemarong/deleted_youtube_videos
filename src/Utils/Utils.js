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
export const comparePlaylists = (list1, list2) => {
  const oldPlaylist = [...list1].map((video) => video.title);
  const newPlaylist = [...list2].map((video) => video.title);

  const newlyDeletedVideos = oldPlaylist.filter(
    (oldVideo) => !newPlaylist.find((currentVideo) => oldVideo === currentVideo)
  );
  console.log(newlyDeletedVideos);
  return [newlyDeletedVideos.length, newlyDeletedVideos];
};
export const compareIDs = (id1, id2) => {
  if (id1 === id2) return true;
  return false;
};
