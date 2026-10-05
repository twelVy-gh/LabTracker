import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  TextField,
  MenuItem,
  Stack,
  Chip,
  InputAdornment,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { mockTasks, mockCourses } from '../../mocks/data';
import type { TaskStatus } from '../../types';

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

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  });

export const TasksPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | TaskStatus>('all');

  const filteredTasks = useMemo(() => {
    return mockTasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCourse =
        courseFilter === 'all' || task.courseId === courseFilter;
      const matchesStatus =
        statusFilter === 'all' || task.status === statusFilter;
      return matchesSearch && matchesCourse && matchesStatus;
    });
  }, [search, courseFilter, statusFilter]);

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Задания
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            <TextField
              placeholder="Поиск по названию..."
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              select
              label="Курс"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              sx={{ minWidth: 200 }}
            >
              <MenuItem value="all">Все курсы</MenuItem>
              {mockCourses.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Статус"
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value as 'all' | TaskStatus)
              }
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="all">Все</MenuItem>
              <MenuItem value="not_started">Не начато</MenuItem>
              <MenuItem value="in_progress">В работе</MenuItem>
              <MenuItem value="submitted">Сдано</MenuItem>
              <MenuItem value="graded">Оценено</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      {filteredTasks.length === 0 ? (
        <Typography color="text.secondary" align="center" sx={{ mt: 4 }}>
          Заданий по заданным фильтрам не найдено
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {filteredTasks.map((task) => (
            <Grid key={task.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ height: '100%' }}>
                <CardActionArea
                  onClick={() => navigate(`/tasks/${task.id}`)}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Stack sx={{ 
                        direction: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 1 }}
                    >
                      <Chip
                        label={task.type === 'lab' ? 'Лаба' : 'ДЗ'}
                        size="small"
                        color={task.type === 'lab' ? 'primary' : 'secondary'}
                      />
                      <Chip
                        label={statusLabel[task.status]}
                        size="small"
                        color={statusColor[task.status]}
                      />
                    </Stack>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 600, mb: 1 }}
                    >
                      {task.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {task.courseName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Дедлайн: {formatDate(task.deadline)}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};