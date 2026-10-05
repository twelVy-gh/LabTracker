import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Switch,
  Select,
  MenuItem,
  Button,
  Stack,
  Chip,
} from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { mockUsers, mockCourses } from '../../mocks/data';
import type { AccessRight } from '../../types';

const initialRights: AccessRight[] = mockUsers
  .filter((u) => u.role === 'student')
  .flatMap((user) =>
    mockCourses.map((course) => ({
      userId: user.id,
      courseId: course.id,
      canView: true,
      canEdit: false,
    }))
  );

export const AccessControlPage = () => {
  const [rights, setRights] = useState<AccessRight[]>(initialRights);
  const [courseFilter, setCourseFilter] = useState('all');

  const students = mockUsers.filter((u) => u.role === 'student');
  const filteredCourses =
    courseFilter === 'all'
      ? mockCourses
      : mockCourses.filter((c) => c.id === courseFilter);

  const toggleRight = (
    userId: string,
    courseId: string,
    field: 'canView' | 'canEdit'
  ) => {
    setRights((prev) =>
      prev.map((r) =>
        r.userId === userId && r.courseId === courseId
          ? {
              ...r,
              [field]: !r[field],
              // Если даём право редактировать — автоматически даём просмотр
              canView: field === 'canEdit' && !r[field] ? true : r.canView,
            }
          : r
      )
    );
  };

  const handleSave = () => {
    // Позже — отправка на сервер
    console.log('Сохранённые права:', rights);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
        Управление доступом
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack sx={{direction: "row", spacing: 2, alignItems: "center"}}>
            <Select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              size="small"
              sx={{ minWidth: 220 }}
            >
              <MenuItem value="all">Все курсы</MenuItem>
              {mockCourses.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
            <Chip label={`Студентов: ${students.length}`} variant="outlined" />
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent sx={{ p: 0 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Студент</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Курс</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Просмотр
                  </TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    Редактирование
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.flatMap((student) =>
                  filteredCourses.map((course) => {
                    const right = rights.find(
                      (r) =>
                        r.userId === student.id && r.courseId === course.id
                    );
                    if (!right) return null;
                    return (
                      <TableRow key={`${student.id}-${course.id}`} hover>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>{course.name}</TableCell>
                        <TableCell align="center">
                          <Switch
                            checked={right.canView}
                            onChange={() =>
                              toggleRight(student.id, course.id, 'canView')
                            }
                            color="primary"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Switch
                            checked={right.canEdit}
                            onChange={() =>
                              toggleRight(student.id, course.id, 'canEdit')
                            }
                            color="secondary"
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSave}
        >
          Сохранить изменения
        </Button>
      </Box>
    </Box>
  );
};