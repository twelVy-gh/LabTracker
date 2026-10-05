import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Stack,
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  PendingActions as PendingIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { mockTasks } from '../../mocks/data';
import type { Task, TaskStatus } from '../../types';

const statusLabel: Record<TaskStatus, string> = {
  not_started: 'Не начато',
  in_progress: 'В работе',
  submitted: 'Сдано',
  graded: 'Оценено',
};

const statusColor: Record<TaskStatus, 'default' | 'warning' | 'info' | 'success'> = {
  not_started: 'default',
  in_progress: 'warning',
  submitted: 'info',
  graded: 'success',
};

const isOverdue = (task: Task) =>
  new Date(task.deadline) < new Date() &&
  task.status !== 'submitted' &&
  task.status !== 'graded';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard = ({ title, value, icon, color }: StatCardProps) => (
  <Card>
    <CardContent>
      <Stack sx={{direction: "row", alignItems:"center", spacing:2}}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: color,
            color: '#fff',
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export const DashboardPage = () => {
  const total = mockTasks.length;
  const inProgress = mockTasks.filter((t) => t.status === 'in_progress').length;
  const overdue = mockTasks.filter(isOverdue).length;

  const upcoming = [...mockTasks]
    .filter((t) => t.status !== 'submitted' && t.status !== 'graded')
    .sort(
      (a, b) =>
        new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    )
    .slice(0, 5);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Дашборд
      </Typography>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Всего заданий"
            value={total}
            icon={<AssignmentIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="В работе"
            value={inProgress}
            icon={<PendingIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <StatCard
            title="Просрочено"
            value={overdue}
            icon={<WarningIcon />}
            color="#d32f2f"
          />
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Ближайшие дедлайны
          </Typography>
          {upcoming.length === 0 ? (
            <Typography color="text.secondary">
              Нет активных заданий 🎉
            </Typography>
          ) : (
            <List disablePadding>
              {upcoming.map((task, index) => (
                <Box key={task.id}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem
                    sx={{ px: 0 }}
                    secondaryAction={
                      <Chip
                        label={statusLabel[task.status]}
                        color={statusColor[task.status]}
                        size="small"
                      />
                    }
                  >
                    <ListItemText
                      primary={task.title}
                      secondary={`${task.courseName} · до ${formatDate(task.deadline)}`}
                      slotProps={{
                        primary: { sx: { fontWeight: 600 } },
                      }}
                    />
                  </ListItem>
                </Box>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};