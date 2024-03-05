import { getPreferenceValues } from "@raycast/api";

interface Preferences {
  safariTab: string;
}

export function getPreferences(): Preferences {
  return getPreferenceValues<Preferences>();
}
