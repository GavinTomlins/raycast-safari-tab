import { showHUD } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";

export default async function (argv: string[]) {
  const script = `
    on run argv
      set theUrl to "https://chat.openai.com"
      tell application "Safari"
        set found to false
        set winList to every window
        repeat with aWin in winList
          set tabList to every tab of aWin
          repeat with aTab in tabList
            if URL of aTab starts with theUrl then
              set current tab of aWin to aTab
              set index of aWin to 1 -- Brings the window with the found tab to the front
              set found to true
              exit repeat
            end if
          end repeat
          if found then
            exit repeat
          end if
        end repeat
        
        if not found then
          if not (exists current tab of front window) then
            make new document -- If no window is open, create a new one
          end if
          tell front window
            set current tab to (make new tab with properties {URL:theUrl})
          end tell
        end if
      end tell
    end run
  `;
  const res = await runAppleScript(script);
  await showHUD(res);
}

