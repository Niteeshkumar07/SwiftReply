import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  CircularProgress,
  Button,
  CssBaseline,
  Switch
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      background: {
        default: darkMode ? '#121212' : '#f4f6f8',
        paper: darkMode ? '#1e1e1e' : '#fff',
      },
    },
    shape: {
      borderRadius: 12,
    },
  });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setGeneratedReply("Failed to generate reply. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py: 4 }}>
        {/* 🟦 Stylish Header */}
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            borderRadius: '16px',
            px: 4,
            py: 3,
            mb: 4,
            boxShadow: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            ✉️ SwiftReply
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" sx={{ mr: 1 }}>
              {darkMode ? 'Dark' : 'Light'} Mode
            </Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="primary"
            />
          </Box>
        </Box>

        {/* ✏️ Email Input */}
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            label="Original Email Content"
            value={emailContent}
            onChange={(e) => setEmailContent(e.target.value)}
            sx={{ mb: 3, borderRadius: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Tone (Optional)</InputLabel>
            <Select
              value={tone}
              label="Tone (Optional)"
              onChange={(e) => setTone(e.target.value)}
            >
              <MenuItem value="">None</MenuItem>
              <MenuItem value="professional">Professional</MenuItem>
              <MenuItem value="casual">Casual</MenuItem>
              <MenuItem value="friendly">Friendly</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            sx={{ py: 1.5, fontWeight: 'bold', borderRadius: 2 }}
            onClick={handleSubmit}
            disabled={!emailContent || loading}
          >
            {loading ? <CircularProgress size={24} /> : '✨ Generate Reply'}
          </Button>
        </Box>

        {/* 📩 Generated Reply Output */}
        <Box>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply}
            inputProps={{ readOnly: true }}
            sx={{ mb: 2 }}
          />

          <Button
            variant="outlined"
            fullWidth
            onClick={() => navigator.clipboard.writeText(generatedReply)}
            disabled={!generatedReply}
            sx={{ borderRadius: 2, py: 1 }}
          >
            📋 Copy to Clipboard
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;


