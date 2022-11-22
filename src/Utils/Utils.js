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
  const newlyDeletedVideos = list1.filter(
    (oldVideo) =>
      !list2.find((currentVideo) => oldVideo.title === currentVideo.title)
  );

  return [newlyDeletedVideos.length, newlyDeletedVideos];
};
export const compareIDs = (id1, id2) => {
  if (id1 === id2) return true;
  return false;
};

export const savePlaylist = (
  currentPlaylist,
  playlistId,
  newlyDeletedVideos
) => {
  console.log(currentPlaylist);

  // Get day of month
  const date = new Date();
  const [day, month, dayInMonth] = date.toString().split(" ");
  const dayAndMonth = `${month} ${dayInMonth}`;

  // Fetch playlist and deletedVideos from Chrome storage
  chrome.storage.local.get(["data"], ({ data }) => {
    const { playlist, deletedVideos, playlistBackups } = data;

    // Filter out videos that are not found in oldPlaylist and currentPlaylist
    console.log("newlyDeletedVideos", newlyDeletedVideos);

    // Get img-url from oldPlaylist if newPlaylist does not have
    const updatedCurrentPlaylist = currentPlaylist.map((currentVideo) => {
      // If img is present, return
      if (currentVideo.img) return currentVideo;

      // If image is not present, find image in old playlist and return that
      const updatedVideo = playlist.find(
        (oldVideo) => currentVideo.title === oldVideo.title
      );

      if (updatedVideo) {
        return updatedVideo;
      } else {
        return currentVideo;
      }
    });
    console.log(updatedCurrentPlaylist);
    // Save the newly created deletedVideos and playlist
    chrome.storage.local.set({
      data: {
        playlist: updatedCurrentPlaylist,
        deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
        playlistId: playlistId,
        lastUpdate: dayAndMonth,
        playlistBackups: [
          ...playlistBackups,
          {
            playlist: updatedCurrentPlaylist,
            deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
            playlistId: playlistId,
            lastUpdate: dayAndMonth,
          },
        ],
      },
    });
    localStorage.setItem(
      "playlistData",
      JSON.stringify({
        playlist: updatedCurrentPlaylist,
        deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
        playlistId: playlistId,
        lastUpdate: dayAndMonth,
        playlistBackups: [
          ...playlistBackups,
          {
            playlist: updatedCurrentPlaylist,
            deletedVideos: [...deletedVideos, ...newlyDeletedVideos],
            playlistId: playlistId,
            lastUpdate: dayAndMonth,
          },
        ],
      })
    );
  });
};
