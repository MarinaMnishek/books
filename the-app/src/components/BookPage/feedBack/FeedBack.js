import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

export default function FeedBack({ data }) {
    return (
        <Box sx={{ minWidth: 275, marginTop: "10px" }}>
            <Card variant="outlined">
                <CardContent sx={{ textAlign: "left" }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {data.user} {data.date}
                    </Typography>
                    {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Оценил книгу:
                    </Typography> */}
                    <Typography variant="body2">
                        {data.text}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}