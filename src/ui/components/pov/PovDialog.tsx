import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseRounded from "@mui/icons-material/CloseRounded";
import PovForm from "./PovForm";
import { useAccount } from "../../../hooks/useAccount";
import type { PoV } from "../../../models/pov.model";

interface PovDialogProps {
  open: boolean;
  onClose: () => void;
  povToEdit?: PoV | null;
  isLocal?: boolean;
}

export const PovDialog: React.FC<PovDialogProps> = ({ open, onClose, povToEdit = null, isLocal }) => {
  const {
    account,
    createPov,
    updatePov,
    createPovLocal,
    updatePovLocal,
    deletePovLocal,
    loading,
  } = useAccount();

  const handleSubmit = async (formData: any, isServerPost: boolean = false) => {
    const isUpdate = !!povToEdit?.id;
    const authorId = account?.id || account?.uid;

    if (!authorId) return;

    const userData: any = {
      ...povToEdit,
      ...formData,
    };

    if (isServerPost) {
      userData.author = authorId;
      userData.isLocal = false;

      const action =
        isUpdate && !isLocal
          ? () => updatePov(povToEdit!.id, userData)
          : () => createPov(userData);

      return action()
        ?.then(() => {
          if (isUpdate && isLocal) {
            deletePovLocal(povToEdit!.id);
          }
          onClose();
        })
        .catch((err: any) => console.error("Server submission failed:", err));
    } else {
      userData.author = {
        id: authorId,
        name: account?.name,
        displayPicture: account?.displayPicture,
      } as any; // Cast as any because local PoV might store full user object
      userData.isLocal = true;

      const action =
        isUpdate && isLocal
          ? () => updatePovLocal(povToEdit!.id, userData)
          : () => createPovLocal(userData);

      return Promise.resolve(action())
        .then(onClose)
        .catch((err: any) => console.error("Local submission failed:", err));
    }
  };

  return (
    <Dialog
      id="pov-dialog"
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
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
          title={povToEdit ? "Edit Perspective" : "New Perspective"}
        />
      </DialogContent>
    </Dialog>
  );
};
