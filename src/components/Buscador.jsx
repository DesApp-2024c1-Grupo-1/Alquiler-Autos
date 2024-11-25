import SearchIcon from '@mui/icons-material/Search';
import { Box } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';

export function Buscador() {
  return <Box sx={{ml:4, mt:2}}>
  <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '90%' }}
  >
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Buscar"
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon />
    </IconButton>
  </Paper>
  </Box>
}