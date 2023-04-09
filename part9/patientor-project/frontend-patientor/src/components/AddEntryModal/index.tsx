import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Divider,
    Alert,
} from '@mui/material';
import { Diagnosis, EntryWithoutId } from '../../types';
import AddEntryForm from './AddEntryForm';
interface Props {
    onClose: () => void;
    modalOpen: boolean;
    diagnosisCodes: Array<Diagnosis>;
    thisID: string;
    error?: string;
    onSubmit: (thisID: string, values: EntryWithoutId) => void;
}
const AddEntryModal = ({
    modalOpen,
    onClose,
    diagnosisCodes,
    thisID,
    error,
    onSubmit,
}: Props) => {
    return (
        <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
            <DialogTitle>Add a new Entry</DialogTitle>
            <Divider />
            <DialogContent>
                {error && <Alert severity="error">{error}</Alert>}
                <AddEntryForm
                    thisID={thisID}
                    onCancel={onClose}
                    diagnosisCodes={diagnosisCodes}
                    onSubmit={onSubmit}
                />
            </DialogContent>
        </Dialog>
    );
};

export default AddEntryModal;
