import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { getIcons } from "./addPageUtils";

export function getIcon(name: string) {
  return getIcons().find(
    (i) => i.type.render.displayName === name
  ) as unknown as OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}
