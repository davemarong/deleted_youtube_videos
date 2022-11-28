/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
let data = {
  playlist: [],
  deletedVideos: [],
  playlistId: "",
  lastUpdate: "",
  playlistBackups: [],
  history: [],
};
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ data });
  console.log("Default playlist and deletedVideos is created");
});

// Filter for when user is on youtube
const filter = {
  url: [
    {
      urlMatches: "https://www.youtube.com/",
    },
  ],
};

const content_scripts_enum = {
  autoSyncPlaylist: "./content-scripts/autoSyncPlaylist.js",
  getLocalStorageData: "./content-scripts/getLocalStorageData.js",
  getPlaylistAndPassMessage: "./content-scripts/getPlaylistAndPassMessage.js",
};

// Function for running a content script from the background file
const executeContentScript = async (file, message) => {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        files: [file],
      },
      (result) => {
        console.log(message);
      }
    );
  });
};

// Listen to message from syncPlaylist when extension is opened.
chrome.runtime.onMessage.addListener((request) => {
  if (request.popupOpen) {
    executeContentScript(
      content_scripts_enum.getPlaylistAndPassMessage,
      "getPlaylistAndPassMessage completed from the background"
    );
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(async () => {
  // Get tab-id and tab-url
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
    const url = tabs[0].url;
    chrome.storage.local.get(["data"], ({ data }) => {
      let { playlistId, lastUpdate } = data;

      // Get day of month
      const date = new Date();
      const [day, month, dayInMonth] = date.toString().split(" ");
      const dayAndMonth = `${month} ${dayInMonth}`;
      console.log(dayAndMonth);
      console.log(`Last update was: ${lastUpdate}, and today is ${dayInMonth}`);

      // If last update auto-sync was today, return
      if (dayAndMonth === lastUpdate) return;

      // Check if current playlist is the same as the saved playlist
      if (playlistId.length > 0 && url.includes(playlistId)) {
        executeContentScript(
          content_scripts_enum.autoSyncPlaylist,
          "autoSyncPlaylist completed in the background"
        );
      }
      // If playlist does not exist, check in local storage
      else {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ["./content-scripts/getLocalStorageData.js"],
          },
          (result) => {
            chrome.storage.local.get(["data"], ({ data }) => {
              let { playlistId } = data;
              if ((playlistId = true && url.includes(playlistId))) {
                executeContentScript(content_scripts_enum.autoSyncPlaylist);
                console.log(
                  "Playlist gotten from localStorage and the autoSyncPlaylist was run from the background"
                );
              } else {
                console.log(
                  "The new and old playlist did not match. Either wrong playlist or one wasn't found."
                );
              }
            });
          }
        );
      }
    });
  });
  filter;
});
