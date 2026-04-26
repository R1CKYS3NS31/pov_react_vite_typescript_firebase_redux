import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseRounded from "@mui/icons-material/CloseRounded";
import PovForm from "./PovForm";
import { useAccount } from "../../../hooks/useAccount";

export const PovDialog = ({ open, onClose, povToEdit = null, isLocal }) => {
  const theme = useTheme();

  const {
    account,
    createPov,
    updatePov,
    createPovLocal,
    updatePovLocal,
    deletePovLocal,
    loading,
  } = useAccount();

  const handleSubmit = async (formData, isServerPost = false) => {
    const isUpdate = !!povToEdit?.id;
    const authorId = account?.id || account?.uid;

    const userData = {
      ...povToEdit,
      ...formData,
    };

    if (isServerPost) {
      userData.author = authorId;
      userData.isLocal = false;

      const action =
        isUpdate && !isLocal
          ? () => updatePov(povToEdit.id, userData)
          : () => createPov(userData);

      return action()
        .then(() => {
          if (isUpdate && isLocal) {
            deletePovLocal(povToEdit.id);
          }
          onClose();
        })
        .catch((err) => console.error("Server submission failed:", err));
    } else {
      userData.author = {
        id: authorId,
        name: account?.name,
        displayPicture: account?.displayPicture,
      };
      userData.isLocal = true;

      const action =
        isUpdate && isLocal
          ? () => updatePovLocal(povToEdit.id, userData)
          : () => createPovLocal(userData);

      return Promise.resolve(action())
        .then(onClose)
        .catch((err) => console.error("Local submission failed:", err));
    }
  };

  return (
    <Dialog
      id="pov-dialog"
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            bgcolor: "background.paper",
            border: "none",
            boxShadow: theme.shadows[10],
          },
        },
      }}
    >
      <Box sx={{ position: "absolute", right: 8, top: 8, zIndex: 11 }}>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: "text.secondary" }}
        >
          <CloseRounded />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        <PovForm
          pov={povToEdit ? { ...povToEdit } : null}
          onSubmit={handleSubmit}
          onCancel={onClose}
          loading={loading}
          showDraftStatus={false}
          title={povToEdit ? "Edit Perspective" : "New Perspective"}
        />
      </DialogContent>
    </Dialog>
  );
};
