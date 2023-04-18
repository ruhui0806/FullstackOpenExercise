import React from "react";
import { useState, SyntheticEvent } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Checkbox,
} from "@mui/material";

import {
  Diagnosis,
  HealthCheckRating,
  EntryWithoutId,
  EntryTypes,
} from "../../types";

interface Props {
  onCancel: () => void;
  thisID: string;
  diagnosisCodes: Array<Diagnosis>;
  onSubmit: (thisID: string, values: EntryWithoutId) => void;
}

interface healthCheckOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: healthCheckOption[] = Object.values(
  HealthCheckRating
)
  .filter((item) => typeof item === "number")
  .map((item) => ({ value: Number(item), label: item.toString() }));

interface entryType {
  value: EntryTypes;
  label: string;
}
const entryTypesOptions: entryType[] = Object.values(EntryTypes).map((v) => ({
  value: v,
  label: v.toString(),
}));

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const AddEntryForm = ({
  onCancel,
  diagnosisCodes,
  onSubmit,
  thisID,
}: Props) => {
  const [description, setDescription] = useState("");
  const [entryDate, setEntryDate] = useState(
    new Date().toLocaleString("en-CA").split(",")[0]
  );
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState(0);
  const [entryType, setEntryType] = useState(EntryTypes.OccupationalHealthcare);
  const [employerName, setEmployerName] = useState("");
  const [sickLeave, setSickLeave] = useState(false);
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = React.useState<string>("");
  const [diagnosisValue, setDiagnosisValue] = React.useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState("");
  const onEntryTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    try {
      if (typeof event.target.value === "string") {
        const value = event.target.value;
        const type = Object.values(EntryTypes).find(
          (e) => e.toString() === value
        );
        if (type) {
          setEntryType(type);
        }
      }
    } catch (error) {
      setErrorMessage("wrong entry type");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    event.preventDefault();
    try {
      if (typeof event.target.value === "number") {
        const rate = event.target.value;
        const healthRate = Object.values(HealthCheckRating).find(
          (value) => value.toString() === rate.toString()
        );
        if (healthRate) {
          setHealthCheckRating(Number(healthRate));
        }
      }
    } catch (error) {
      setErrorMessage("something is wrong in changing health check rating");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  const handleDiagnosisCodeChange = (
    event: SelectChangeEvent<typeof diagnosisValue>
  ) => {
    const {
      target: { value },
    } = event;
    try {
      setDiagnosisValue(typeof value === "string" ? value.split(",") : value);
    } catch (error) {
      setErrorMessage("something is wrong in changing diagnosis code");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };
  const addNewEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    console.log("date", entryDate);
    try {
      onSubmit(
        thisID,
        entryType === EntryTypes.Hospital && isDate(entryDate)
          ? {
              description,
              date: entryDate,
              specialist,
              diagnosisCodes: diagnosisValue || [],
              type: EntryTypes.Hospital,
              discharge: { date: dischargeDate, criteria: dischargeCriteria },
            }
          : entryType === EntryTypes.OccupationalHealthcare && isDate(entryDate)
          ? {
              description,
              date: entryDate,
              specialist,
              diagnosisCodes: diagnosisValue || [],
              type: EntryTypes.OccupationalHealthcare,
              employerName,
              sickLeave:
                sickLeave === true
                  ? {
                      startDate: sickLeaveStartDate,
                      endDate: sickLeaveEndDate,
                    }
                  : undefined,
            }
          : {
              description,
              date: entryDate,
              specialist,
              diagnosisCodes: diagnosisValue || [],
              type: EntryTypes.HealthCheck,
              healthCheckRating: healthCheckRating,
            }
      );
    } catch (error) {
      setErrorMessage("something is wrong in adding new entry");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={addNewEntry}>
        <InputLabel style={{ marginTop: 20 }}>Description</InputLabel>
        <TextField
          label="description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField
          type="date"
          fullWidth
          value={entryDate}
          onChange={(event) => setEntryDate(event.target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Specialist</InputLabel>
        <TextField
          label="Specialist"
          placeholder="spacialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <InputLabel style={{ marginTop: 20 }}>Diagnosis Codes</InputLabel>
        <Select
          label="diagnosisCodes"
          multiple
          fullWidth
          value={diagnosisValue}
          onChange={handleDiagnosisCodeChange}
        >
          {diagnosisCodes.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              <Checkbox checked={diagnosisValue.indexOf(option.code) > -1} />
              {option.code}
            </MenuItem>
          ))}
        </Select>
        <InputLabel style={{ marginTop: 20 }}>Entry type</InputLabel>
        <Select
          style={{ marginBottom: 20 }}
          label="type"
          fullWidth
          value={entryType}
          onChange={onEntryTypeChange}
        >
          {entryTypesOptions.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
        {entryType === "HealthCheck" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>
              Health Check Rating
            </InputLabel>
            <Select
              label="HealthCheckRating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.value}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        {entryType === "OccupationalHealthcare" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Employer Name</InputLabel>
            <TextField
              label="Employer Name"
              placeholder="Employer Name"
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <InputLabel style={{ marginTop: 20 }}>
              Sick leave
              <Checkbox
                onChange={() => setSickLeave(!sickLeave)}
                checked={sickLeave}
              />
            </InputLabel>
            {sickLeave && (
              <div>
                <InputLabel style={{ marginTop: 20 }}>
                  Sick leave start date
                </InputLabel>
                <TextField
                  type="date"
                  fullWidth
                  value={sickLeaveStartDate}
                  onChange={({ target }) => setSickLeaveStartDate(target.value)}
                ></TextField>
                <InputLabel style={{ marginTop: 20 }}>
                  Sick leave end date
                </InputLabel>
                <TextField
                  fullWidth
                  type="date"
                  value={sickLeaveEndDate}
                  onChange={({ target }) => setSickLeaveEndDate(target.value)}
                ></TextField>
              </div>
            )}
          </>
        )}
        {entryType === "Hospital" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Discharge</InputLabel>

            <InputLabel style={{ marginTop: 20 }}>Discharge date</InputLabel>
            <TextField
              fullWidth
              type="date"
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            ></TextField>
            <InputLabel style={{ marginTop: 20 }}>Criteria</InputLabel>
            <TextField
              label="criteria"
              placeholder="criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        )}

        <Grid style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
AddEntryForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  diagnosisCodes: PropTypes.array.isRequired,
  thisID: PropTypes.string.isRequired,
};
