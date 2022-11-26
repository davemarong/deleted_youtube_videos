// IMPORT
import { ToolTip } from "../ToolTip/ToolTip";

export const menu_items = [
  {
    content: (
      <ToolTip icon="Images not showing?">
        This is because the images on your youtube page has not been loaded. You
        have to scroll all the way to the bottom of the page, and make sure all
        the thumbnail images are visible. Then click on "Sync".
      </ToolTip>
    ),
  },
  {
    content: (
      <ToolTip icon="Can't find your playlist?">
        Close and re-open the extension and press the "Find playlist from this
        page" at least 3 times. If that doesn't work, try this: 1: In the
        sidebar, click on "Library". 2: Scroll down to your playlist, and click
        "VIEW FULL PLAYLIST". This will open your playlist homepage. 3: In your
        extension, click on "Find playlist form this page" to try again.
      </ToolTip>
    ),
  },
];
