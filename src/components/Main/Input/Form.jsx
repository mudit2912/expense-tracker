import React, { useState, useContext, useEffect } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../../context/context'
import { v4 as uuidv4 } from 'uuid';
import { useSpeechContext } from '@speechly/react-client';
import useStyles from './styles';
import { incomeCategories, expenseCategories } from '../../../constants/categories';
import dateFormat from '../../../utils/dateFormat';
import CustomSnackbar from '../../Creationbar/Snackbar';

const initialData = {
    amount: '',
    category: '',
    type: 'Income',
    date: dateFormat(new Date())
};
const Input = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialData);
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const { segment } = useSpeechContext();
    const [open, setOpen] = useState(false);

    const createTransaction = () => {
        const transaction = { ...formData, amount: Number(formData.amount), id: uuidv4() }

        setOpen(true);
        addTransaction(transaction);
        setFormData(initialData);
    }

    useEffect(() => {
        if(segment) {
            if(segment.intent.intent === 'add_expense') {
                setFormData({ ...formData, type: 'Expense' });
            } else if (segment.intent.intent === 'add_income') {
                setFormData({ ...formData, type: 'Income' })
            } else if(segment.isFinal && segment.intent.intent === 'create_transaction') {
                return createTransaction()
            } else if(segment.isFinal && segment.intent.intent === 'cancel_transaction') {
                return setFormData(initialData);
            }
            segment.entities.forEach((ent) => {
                const cat = `${ent.value.charAt(0)}${ent.value.slice(1).toLowerCase()}`;
                switch (ent.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: ent.value });
                        break;
                    case 'category':
                        if(incomeCategories.map((iCat) => iCat.type).includes(cat)) {
                            setFormData({ ...formData, type: 'Income',category: cat });
                        } else if(expenseCategories.map((iCat) => iCat.type).includes(cat)) {
                            setFormData({ ...formData, type: 'Expense', category: cat });
                        }
                        break;
                    case 'date':
                        setFormData({ ...formData, date: ent.value });
                        break;
                    default:
                        break;

                }
            });
            if(segment.isFinal && formData.date && formData.amount && formData.category && formData.type) {
                createTransaction();
            }
        }
    }, [segment])

    let displayedCategories;
    if(formData.type === 'Income') {
        displayedCategories = incomeCategories;
    } else {
        displayedCategories = expenseCategories;
    } 


    return (
        <Grid container spacing={2}>
            <CustomSnackbar  open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    {segment ? (
                        <>
                            {segment.words.map((w) => w.value).join(" ")}
                        </>
                    ) : null} 
                </Typography>  
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>type</InputLabel>
                    <Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} >
                        {displayedCategories.map((category) => <MenuItem key={category.type} value={category.type}>{category.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" label="Amount" fullWidth value={formData.amount} onChange={(e) => setFormData({ ...formData, amount: e.target.value })}/>
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" label="Date" fullWidth value={formData.date} onChange={(e) => setFormData({ ...formData, date: dateFormat(e.target.value) })} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    );
};

export default Input;