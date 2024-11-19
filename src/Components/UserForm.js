import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

export default function UserForm({ user, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        margin="normal"
        name="name"
        label="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <Box sx={{ mt: 2 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ mr: 1 }}>
          {user ? 'Update' : 'Add'} User
        </Button>
        <Button onClick={onCancel} variant="outlined">
          Cancel
        </Button>
      </Box>
    </Box>
  );
}