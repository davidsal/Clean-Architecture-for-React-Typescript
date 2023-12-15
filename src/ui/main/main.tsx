import React, { useState } from 'react';
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
    Box,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { Climate } from '../../domain/entities/climateEntities';
import ClimateController from '../../domain/controllers/climateController';
import { Status } from '../../domain/entities/status';
import { DataWrapper } from '../../domain/entities/dataWrapper';

const MainPage: React.FC = () => {
    const [climate, setClimate] = useState<DataWrapper<Climate>>({
        data: {
            altitude: 0,
            pressure: 0,
            temperature: 0,
        },
        status: Status.LOADING,
        message: '',
    });

    const [realApi, setRealApi] = useState(false);

    const getClimate = async (cache: boolean) => {
        setClimate((prevClimate) => ({
            ...prevClimate,
            status: Status.LOADING,
            message: '',
        }));

        const data = await ClimateController.getClimate(cache, realApi);
        setClimate(data);
    };

    return (
        <Container
            maxWidth="md"
            style={{
                marginTop: '50px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Climate Control
            </Typography>

            {climate.status === Status.LOADING && (
                <Box style={{ color: 'blue', textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        LOADING
                    </Typography>
                </Box>
            )}

            {climate.status === Status.ERROR && (
                <Box textAlign="center" margin="auto">
                    <Typography variant="h6" gutterBottom color="error">
                        ERROR
                    </Typography>
                    <Typography variant="body1">{climate.message}</Typography>
                </Box>
            )}

            {climate.status === Status.OK && (
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    Temperature
                                </Typography>
                                <Typography variant="h4">
                                    {climate.data.temperature} ° Fahrenheit
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    Pressure
                                </Typography>
                                <Typography variant="h4">
                                    {climate.data.pressure} Pascals
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography
                                    variant="h6"
                                    color="textSecondary"
                                    gutterBottom
                                >
                                    Altitude
                                </Typography>
                                <Typography variant="h4">
                                    {climate.data.altitude} Meters
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}

            <FormControlLabel style={{marginTop: '2rem'}}
                control={
                    <Checkbox
                        checked={realApi}
                        onChange={() => setRealApi(!realApi)}
                        color="primary"
                    />
                }
                label="Use real API?"
            />

            <Grid
                container
                spacing={2}
                justifyContent="center"
                style={{ marginTop: '20px' }}
            >
                <Grid item>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            getClimate(true);
                        }}
                    >
                        Update
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            getClimate(false);
                        }}
                    >
                        Force
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default MainPage;
