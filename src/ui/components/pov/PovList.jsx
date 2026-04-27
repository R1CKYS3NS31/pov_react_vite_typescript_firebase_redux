import { memo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import PovCard from "./PovCard";

const PovList = memo(({
  povs = [],
  loading = false,
  onDelete,
  onEdit,
  onPublish,
  likedPovIds = [], 
  currentPage = 0,
  totalPages = 1,
  onPageChange,
  emptyMessage = 'No POVs found',
}) => {
  if (loading) {
    return (
      <Stack spacing={3}>
        {[1, 2, 3].map((item) => (
          <Card key={item} sx={{ borderRadius: 4, border: 'none', boxShadow: (theme) => theme.shadows[1], bgcolor: 'background.paper', mb: 3 }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 }, pb: '16px !important' }}>
              <Grid container spacing={2} wrap="nowrap">
                <Grid>
                  <Skeleton variant="circular" width={48} height={48} animation="wave" />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Skeleton variant="text" width="30%" height={24} animation="wave" />
                    <Skeleton variant="text" width="10%" height={24} animation="wave" />
                  </Box>
                  <Skeleton variant="text" width="60%" height={32} animation="wave" sx={{ mb: 1 }} />
                  <Skeleton variant="rectangular" width="100%" height={80} animation="wave" sx={{ borderRadius: 2, mb: 2 }} />
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Skeleton variant="rounded" width={80} height={32} animation="wave" sx={{ borderRadius: 4 }} />
                    <Skeleton variant="rounded" width={80} height={32} animation="wave" sx={{ borderRadius: 4 }} />
                    <Skeleton variant="rounded" width={80} height={32} animation="wave" sx={{ borderRadius: 4 }} />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Stack>
    );
  }

  if (!povs || povs.length === 0) {
    return (
      <Stack
        spacing={1}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: "300px",
          bgcolor: "action.hover",
          borderRadius: 4,
          border: "2px dashed",
          borderColor: "divider",
          textAlign: "center",
          p: 4,
        }}
      >
        <Typography variant="h6" fontWeight={700} color="text.secondary">
          Nothing to see here
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ opacity: 0.7 }}>
          {emptyMessage}
        </Typography>
      </Stack>
    );
  }

  return (
    <Box>
      <Stack spacing={3}>
        {povs.map((pov) => (
          <PovCard
            key={pov.id}
            pov={pov}
            onDelete={onDelete}
            onEdit={onEdit}
            onPublish={onPublish}
            isLiked={likedPovIds.includes(pov.id)}
            showActions={!!(onDelete || onEdit || onPublish)}
          />
        ))}
      </Stack>

      {totalPages > 1 && (
        <Box display="flex"  sx={{ mt: 6, mb: 2, justifyContent:"center"}}>
          <Pagination
            count={totalPages}
            page={currentPage + 1}
            onChange={(e, page) => onPageChange?.(page - 1)}
            color="primary"
            size="large"
            shape="rounded"
          />
        </Box>
      )}
    </Box>
  );
});

export default PovList;
