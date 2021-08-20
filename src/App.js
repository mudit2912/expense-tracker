import React from 'react';
import { Grid } from '@material-ui/core';
import { PushToTalkButton, PushToTalkButtonContainer, ErrorPanel } from '@speechly/react-ui';
import  Info  from './components/Info/Info';
import Main from './components/Main/Main';
import useStyles from './styles';


const App = () => {
    const classes = useStyles();

    return (
        <div>
            <Grid className={classes.grid} container spacing={0} alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
                <Grid item xs={12} sm={4}>
                    <Info title="Income"/>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Info title="Expense"/>
                </Grid>
            </Grid>
            <PushToTalkButtonContainer>
                <PushToTalkButton />
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </div>
    )
};

export default App;