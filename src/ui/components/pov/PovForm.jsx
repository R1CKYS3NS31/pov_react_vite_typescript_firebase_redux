import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Save from "@mui/icons-material/Save";
import Send from "@mui/icons-material/Send";

const PovForm = ({
  pov = null,
  onSubmit,
  onCancel,
  loading = false,
  title = pov ? "Edit POV" : "Share a Point of View",
}) => {
  const MAX_TITLE = 120;
  const MAX_DESC = 3000;

  const [formData, setFormData] = useState({
    title: pov?.title || "",
    description: pov?.description || "",
    points: Array.isArray(pov?.points)
      ? pov?.points.join("\n")
      : pov?.points || "",
    isLocal: pov?.isLocal || false,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e, triggerServerPost = false) => {
    if (e && e.preventDefault) e.preventDefault();
    if (validateForm()) {
      onSubmit?.(formData, triggerServerPost);
    }
  };

  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <Card sx={{ position: "relative" }}>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: (theme) => `${theme.palette.background.paper}cc`,
            backdropFilter: "blur(3px)",
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

      <CardContent sx={{ p: 2, pb: 0.5 }}>
        <Typography
          variant="h5"
          fontWeight={800}
          color="text.primary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          What's your perspective? Share it with clarity.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
          noValidate
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="POV Title"
                name="title"
                placeholder="The core of your perspective..."
                value={formData.title}
                onChange={handleChange}
                error={!!errors.title}
                helperText={
                  errors.title || `${formData.title.length}/${MAX_TITLE}`
                }
                disabled={loading}
                required
                slotProps={{
                  input: { sx: { fontWeight: 700 } },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Detailed Description"
                name="description"
                placeholder="Deep dive into your thoughts, reasoning, and context..."
                value={formData.description}
                onChange={handleChange}
                error={!!errors.description}
                helperText={
                  errors.description ||
                  `${formData.description.length}/${MAX_DESC}`
                }
                multiline
                rows={4}
                disabled={loading}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Key Perspectives (One per line)"
                name="points"
                placeholder="List your key takeaways here, separating each with a new line..."
                value={formData.points}
                onChange={handleChange}
                multiline
                rows={4}
                disabled={loading}
                slotProps={{
                  input: { sx: { fontWeight: 500 } },
                }}
                width="100%"
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Grid container
          spacing={2}
          sx={{
            alignItems: "center", width: "100%"
          }}
        >
          <Grid size={{ xs: 12, sm: "auto" }} sx={{ mr: "auto" }}>
            <Stack
              direction="row"
              spacing={1}
              sx={{ justifyContent: "space-between" }}
            >
              <Button
                onClick={onCancel}
                variant="text"
                color="inherit"
                disabled={loading}
                sx={{
                  px: 1.5,
                  borderRadius: 2,
                  fontWeight: 600,
                  textTransform: "none",
                  opacity: 0.7,
                  "&:hover": { opacity: 1, bgcolor: "action.hover" },
                }}
              >
                Cancel
              </Button>

              {/* Secondary Action Button (Drafts) */}
              {(!pov || formData.isLocal) && (
                <Button
                  onClick={(e) => handleSubmit(e, false)}
                  variant="outlined"
                  color="secondary"
                  disabled={loading}
                  startIcon={<Save sx={{ fontSize: 18 }} />}
                  sx={{
                    px: 2.5,
                    borderRadius: 2,
                    fontWeight: 700,
                    textTransform: "none",
                  }}
                >
                  {pov ? "Update Draft" : "Save Draft"}
                </Button>
              )}

              <Button
                onClick={(e) => handleSubmit(e, true)}
                variant="contained"
                color="primary"
                disabled={loading}
                startIcon={
                  loading ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : (
                    <Send sx={{ fontSize: 18 }} />
                  )
                }
                sx={{
                  px: 2.5,
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                }}
              >
                {loading ? "Saving..." : pov && !formData.isLocal ? "Update POV" : "Post POV"}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default PovForm;
