import { alpha, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PovList from "../pov/PovList";

/**
 * A single tab panel for the Account page.
 *
 * Shows a dashed empty-state box (with a custom icon, title, description,
 * and action button) when there are no items, otherwise renders PovList.
 *
 * Props
 * ─────
 * id / labelledBy   ARIA role/labelling
 * items             array of PoV objects
 * totalPages        pagination total
 * loading           loading flag (skips empty state while loading)
 * emptyIcon         ReactElement  — large icon shown in the empty state
 * emptyTitle        string
 * emptyDescription  string
 * emptyAction       ReactElement  — button/link shown below the description
 * onEdit / onDelete / onPublish — forwarded to PovList
 */
export const AccountPovPanel = ({
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
  onPublish,
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
            fontWeight={700}
            color="text.secondary"
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
          onPublish={onPublish}
          emptyMessage={emptyMessage}
        />
      )}
    </Box>
  );
};
