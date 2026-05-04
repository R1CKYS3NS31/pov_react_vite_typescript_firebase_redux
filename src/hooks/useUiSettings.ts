import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../service/redux/slices/theme/themeSlice";
import { themeSelector } from "../service/redux/selectors/themeSelector";
import { theme } from "../ui/styles/themes/index";
import { type Theme } from "@mui/material/styles";

export const useUiSettings = () => {
  const dispatch = useDispatch();
  const themeType = useSelector(themeSelector);

  const activeTheme = useMemo(() => {
    return theme({ themeType }) as Theme;
  }, [themeType]);
  
  return {
    themeType,
    activeTheme,
    toggleTheme: useCallback(() => dispatch(toggleTheme()), [dispatch]),
  };
};
