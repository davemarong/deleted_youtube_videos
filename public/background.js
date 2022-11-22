/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
let data = {
  playlist: [
    {
      title: "Pokémon Gold and Silver- National Park (Lofi Remix)",
      img: "https://i.ytimg.com/vi/Az5k9YSlnYc/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGH8gQygtMA8=&rs=AOn4CLDh0wpTihOVlCFzQUg6uf_ASu3Yjw",
      url: "https://www.youtube.com/watch?v=Az5k9YSlnYc&list=PLVEFS9uzMyHYKBAklGQmv6m38WH_mG5eI&index=1",
    },
    {
      title: "Pokémon nope and Silver- National Park (Lofi Remix)",
      img: "https://i.ytimg.com/vi/Az5k9YSlnYc/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGH8gQygtMA8=&rs=AOn4CLDh0wpTihOVlCFzQUg6uf_ASu3Yjw",
      url: "https://www.youtube.com/watch?v=Az5k9YSlnYc&list=PLVEFS9uzMyHYKBAklGQmv6m38WH_mG5eI&index=1",
    },
    {
      title: "Mewmore // Azalea Town (Pokémon Gold & Silver Remix)",
      img: "https://i.ytimg.com/vi/ss0sJ2QxduA/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLAJcNY7vK556-kVm3YHRlnR9kmQbg",
      url: "https://www.youtube.com/watch?v=ss0sJ2QxduA&list=PLVEFS9uzMyHYKBAklGQmv6m38WH_mG5eI&index=2",
    },
    {
      title: "Super Metroid Music - Prologue Intro Theme",
      img: "https://i.ytimg.com/vi/mMvKDRCBQBM/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDH2hS0Oc788Z_9nxbuf8zUgw24qQ",
      url: "https://www.youtube.com/watch?v=mMvKDRCBQBM&list=PLVEFS9uzMyHYKBAklGQmv6m38WH_mG5eI&index=3",
    },
    {
      title: "Bonus Stage -  Lode Runner 3D OST",
      img: "https://i.ytimg.com/vi/iZ4M_0_p9Io/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCmQAcE06EzDxaImKpzDUStnq7ppQ",
      url: "https://www.youtube.com/watch?v=iZ4M_0_p9Io&list=PLVEFS9uzMyHYKBAklGQmv6m38WH_mG5eI&index=4",
    },
    {
      title: "Bomberman 64 Music: Blue Resort Theme",
      img: "https://i.ytimg.com/vi/kLU2JA1XBG8/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLDZH_r25DfHDE6eEnJmcWZZvRBjiw",
      url: "https://www.youtube.com/watch?v=kLU2JA1XBG8&list=PLVEFS9uzMyHYKBAklGQmv6m38WH_mG5eI&index=5",
    },
    {
      title: "Ilia's Theme - The Legend of Zelda: Twilight Princess",
      img: "https://i.ytimg.com/vi/AJ7WufqvYr8/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AHUBoAC4AOKAgwIABABGH8gKSgTMA8=&rs=AOn4CLDmwCdj4yRa2097qfoK12Z-E4Q2Eg",
      url: "https://www.youtube.com/watch?v=AJ7WufqvYr8&list=PLVEFS9uzMyHYKBAklGQmv6m38WH_mG5eI&index=6",
    },
  ],
  deletedVideos: [],
  playlistId: "PLVEFS9uzMyHYKBAklGQmv6m38WH_mG5eI",
  lastUpdate: "",
  playlistBackups: [],
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
      // if (dayAndMonth === lastUpdate) return;

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
