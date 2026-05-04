import React from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Chip from "@mui/material/Chip";
import FolderRounded from "@mui/icons-material/FolderRounded";
import CloudUploadRounded from "@mui/icons-material/CloudUploadRounded";

interface AccountPovTabsProps {
  activeTab: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  localCount?: number;
  myCount?: number;
}

/**
 * Tab bar for the Account page ("Local Drafts" / "My POVs").
 */
export const AccountPovTabs: React.FC<AccountPovTabsProps> = ({ activeTab, onChange, localCount = 0, myCount = 0 }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const primary = theme.palette.primary.main;

  const badgeSx = (tabIndex: number) => ({
    height: 18,
    fontSize: "0.68rem",
    fontWeight: 800,
    bgcolor: activeTab === tabIndex ? alpha(primary, 0.15) : "transparent",
    color: activeTab === tabIndex ? "primary.main" : "text.secondary",
    border: "1px solid",
    borderColor: activeTab === tabIndex ? alpha(primary, 0.3) : "transparent",
  });

  return (
    <Stack
      direction="row"
      sx={{
        mb: 3,
        borderRadius: 3,
        bgcolor: isDark
          ? alpha(theme.palette.background.paper, 0.6)
          : alpha(theme.palette.background.paper, 0.8),
        backdropFilter: "blur(12px)",
        border: "1px solid",
        borderColor: "divider",
        px: 1,
        py: 0.5,
      }}
    >
      <Tabs
        variant="fullWidth"
        value={activeTab}
        onChange={onChange}
        sx={{ width: "100%" }}
      >
        <Tab
          id="account-tab-local"
          aria-controls="account-tabpanel-local"
          icon={<FolderRounded sx={{ fontSize: 17 }} />}
          iconPosition="start"
          label={
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.75}>
              <span>Local Drafts</span>
              {localCount > 0 && <Chip label={localCount} size="small" sx={badgeSx(0)} />}
            </Stack>
          }
        />
        <Tab
          id="account-tab-posted"
          aria-controls="account-tabpanel-posted"
          icon={<CloudUploadRounded sx={{ fontSize: 17 }} />}
          iconPosition="start"
          label={
            <Stack direction="row" sx={{ alignItems: "center" }} spacing={0.75}>
              <span>My POVs</span>
              {myCount > 0 && <Chip label={myCount} size="small" sx={badgeSx(1)} />}
            </Stack>
          }
        />
      </Tabs>
    </Stack>
  );
};
