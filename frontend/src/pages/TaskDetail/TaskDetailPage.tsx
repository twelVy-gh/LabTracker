import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Divider,
  TextField,
  MenuItem,
  Avatar,
  Paper,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { mockTasks } from '../../mocks/data';
import type { TaskStatus } from '../../types';

const statusLabel: Record<TaskStatus, string> = {
  not_started: 'Не начато',
  in_progress: 'В работе',
  submitted: 'Сдано',
  graded: 'Оценено',
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

const mockComments: Comment[] = [
  {
    id: 'c1',
    author: 'Анна Смирнова',
    text: 'Не забудьте приложить скриншоты работы.',
    date: '2026-09-20T10:30:00',
  },
  {
    id: 'c2',
    author: 'Иван Иванов',
    text: 'Понял, спасибо!',
    date: '2026-09-20T11:15:00',
  },
];

export const TaskDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const task = mockTasks.find((t) => t.id === id);

  const [status, setStatus] = useState<TaskStatus>(task?.status ?? 'not_started');
  const [comment, setComment] = useState('');

  if (!task) {
    return (
      <Box>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Задание не найдено
        </Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/tasks')}
        >
          Вернуться к списку
        </Button>
      </Box>
    );
  }

  const handleSendComment = () => {
    if (!comment.trim()) return;
    // Позже — отправка на сервер
    setComment('');
  };

  return (
    <Box>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/tasks')}
        sx={{ mb: 2 }}
      >
        К списку заданий
      </Button>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack sx={{ 
            direction: {xs: 'column', sm: 'row'},
            justifyContent: "space-between",
            alignItems: { xs: 'flex-start', sm: 'center' },
            spacing: 2,
            mb: 2 }}
          >
            <Box>
              <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                <Chip
                  label={task.type === 'lab' ? 'Лабораторная' : 'Домашнее задание'}
                  size="small"
                  color={task.type === 'lab' ? 'primary' : 'secondary'}
                />
                <Chip label={task.courseName} size="small" variant="outlined" />
              </Stack>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                {task.title}
              </Typography>
            </Box>
            <TextField
              select
              label="Статус"
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              sx={{ minWidth: 180 }}
            >
              <MenuItem value="not_started">Не начато</MenuItem>
              <MenuItem value="in_progress">В работе</MenuItem>
              <MenuItem value="submitted">Сдано</MenuItem>
              <MenuItem value="graded">Оценено</MenuItem>
            </TextField>
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Дедлайн
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {formatDate(task.deadline)}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Описание
          </Typography>
          <Typography variant="body1">{task.description}</Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
            <Button variant="contained">Прикрепить файл</Button>
            <Button variant="outlined">Отметить как сданное</Button>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Комментарии ({mockComments.length})
          </Typography>

          <Stack spacing={2} sx={{ mb: 3 }}>
            {mockComments.map((c) => (
              <Paper
                key={c.id}
                variant="outlined"
                sx={{ p: 2, display: 'flex', gap: 2 }}
              >
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {c.author.charAt(0)}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                  <Stack sx={{
                    direction: "row",
                    justifyContent: "space-between",
                    alignItems: "center"}}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {c.author}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(c.date)}
                    </Typography>
                  </Stack>
                  <Typography variant="body2" sx={{ mt: 0.5 }}>
                    {c.text}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>

          <Stack direction="row" spacing={1}>
            <TextField
              fullWidth
              placeholder="Написать комментарий..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
              maxRows={4}
            />
            <Button variant="contained" onClick={handleSendComment}>
              Отправить
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};