import { memo, useEffect, useRef } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import PovCard from "./PovCard";
import type { PoV } from "../../../models/pov.model";

interface PovListProps {
  povs: {
    content: PoV[];
    empty: boolean;
  } | null | undefined;
  loading?: boolean;
  onDelete?: (id: string) => void;
  onEdit: (pov: PoV) => void;
  likedPovIds?: string[];
  hasMore?: boolean;
  onLoadMore?: () => void;
  loadingMore?: boolean;
  emptyMessage?: string;
}

const PovList = memo<PovListProps>(({
  povs,
  loading = false,
  onDelete,
  onEdit,
  hasMore = false,
  onLoadMore,
  loadingMore = false,
  emptyMessage = 'No POVs found',
}) => {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!onLoadMore || !hasMore || loading || loadingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, onLoadMore, loading, loadingMore]);

  if (loading) {
    return (
      <Stack spacing={3}>
        {[1, 2, 3].map((item) => (
          <Card key={item} sx={{ borderRadius: 4, border: 'none', boxShadow: (theme) => theme.shadows[1], bgcolor: 'background.paper', mb: 3 }}>
            <CardContent sx={{ p: { xs: 2.5, sm: 3 }, pb: '16px !important' }}>
              <Grid container spacing={2}>
                <Grid size="auto">
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

  if (!povs || povs.empty) {
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
        <Typography variant="h6" sx={{ fontWeight: 700, color: "text.secondary" }}>
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
        {povs.content.map((pov) => (
          <PovCard
            key={pov.id}
            pov={pov}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </Stack>

      {/* Infinite Scroll Trigger */}
      <Box 
        ref={loadMoreRef} 
        sx={{ 
          py: 4, 
          display: 'flex', 
          justifyContent: 'center',
          visibility: hasMore ? 'visible' : 'hidden'
        }}
      >
        {loadingMore && <CircularProgress size={32} thickness={5} />}
      </Box>
    </Box>
  );
});

PovList.displayName = "PovList";

export default PovList;
