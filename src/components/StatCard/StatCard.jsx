import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default ({ title, text, subText, buttonText, onClick }) => {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {text}
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
          <Typography sx={{ mb: 1 }} color="text.secondary">
            <small>{subText}</small>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={onClick}>
            {buttonText}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
