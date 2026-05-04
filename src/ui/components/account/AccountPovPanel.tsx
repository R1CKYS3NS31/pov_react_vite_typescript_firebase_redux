import React, { type ReactNode } from "react";
import { alpha, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PovList from "../pov/PovList";
import type { PoV } from "../../../models/pov.model";

interface AccountPovPanelProps {
  id: string;
  labelledBy: string;
  items: {
    content: PoV[];
    empty: boolean;
  };
  loading?: boolean;
  emptyIcon?: ReactNode;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  onEdit: (pov: PoV) => void;
  onDelete?: (id: string) => void;
  onPublish?: (pov: PoV) => void;
  emptyMessage?: string;
}

/**
 * A single tab panel for the Account page.
 */
export const AccountPovPanel: React.FC<AccountPovPanelProps> = ({
  id,
  labelledBy,
  items,
  loading = false,
  emptyIcon,
  emptyTitle,
  emptyDescription,
  emptyAction,
  onEdit,
  onDelete,
  emptyMessage,
}) => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;

  const isEmpty = !loading && items?.empty;

  return (
    <Box id={id} role="tabpanel" aria-labelledby={labelledBy} sx={{ pt: 1 }}>
      {isEmpty ? (
        <Stack
          spacing={1.5}
          sx={{
            alignItems: "center",
            justifyContent: "center",
            minHeight: 280,
            bgcolor: "action.hover",
            borderRadius: 4,
            border: "2px dashed",
            borderColor: "divider",
            textAlign: "center",
            p: 4,
          }}
        >
          {emptyIcon && (
            <Box
              sx={{
                fontSize: 44,
                mb: 1.5,
                color: alpha(primary, 0.35),
                display: "flex",
              }}
            >
              {emptyIcon}
            </Box>
          )}
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "text.secondary" }}
            gutterBottom
          >
            {emptyTitle}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3, opacity: 0.75 }}
          >
            {emptyDescription}
          </Typography>
          {emptyAction}
        </Stack>
      ) : (
        <PovList
          povs={items}
          loading={loading}
          onEdit={onEdit}
          onDelete={onDelete}
          emptyMessage={emptyMessage}
        />
      )}
    </Box>
  );
};
