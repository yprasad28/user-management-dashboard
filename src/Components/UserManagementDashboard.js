import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default function UserManagementDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching users. Please try again later.');
      setLoading(false);
    }
  };

  const handleAddUser = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);
      setUsers([...users, response.data]);
      setIsFormOpen(false);
    } catch (err) {
      setError('Error adding user. Please try again.');
    }
  };

  const handleEditUser = async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/${editingUser.id}`, userData);
      setUsers(users.map(user => user.id === editingUser.id ? response.data : user));
      setEditingUser(null);
      setIsFormOpen(false);
    } catch (err) {
      setError('Error updating user. Please try again.');
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`${API_URL}/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
    } catch (err) {
      setError('Error deleting user. Please try again.');
    }
  };

  const openAddForm = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditForm = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Management Dashboard
        </Typography>
        {isFormOpen ? (
          <UserForm
            user={editingUser}
            onSubmit={editingUser ? handleEditUser : handleAddUser}
            onCancel={() => setIsFormOpen(false)}
          />
        ) : (
          <>
            <Button variant="contained" color="primary" onClick={openAddForm} sx={{ mb: 2 }}>
              Add User
            </Button>
            <UserList
              users={users}
              onEdit={openEditForm}
              onDelete={handleDeleteUser}
            />
          </>
        )}
      </Box>
    </Container>
  );
}