import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../services/patients";
import diagnosisService from "../services/diagnoses";
import {
  Patient,
  Params,
  Diagnosis,
  Entry,
  EntryWithoutId,
  EntryTypes,
} from "../types";

import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import Man4Icon from "@mui/icons-material/Man4";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import AddEntryModal from "./AddEntryModal";
const SinglePatientInfoPage = () => {
  let { id } = useParams<Params>();
  id = id ? id : "d2773336-f723-11e9-8f0b-362b9e155667";

  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [entries, setEntries] = useState<Entry[]>();
  useEffect(() => {
    if (id) {
      const fetchPatient = async (id: string) => {
        const patient = await patientService.getById(id);
        setPatient(patient);
        setEntries(patient.entries);
      };
      const fetchDiagnoses = async () => {
        const diagnoses = await diagnosisService.getDiagnoses();
        setDiagnoses(diagnoses);
      };
      void fetchPatient(id);
      void fetchDiagnoses();
    }
  }, [id]);

  const EntryDetails = ({ EntryItem }: { EntryItem: Entry }): JSX.Element => {
    switch (EntryItem.type) {
      case EntryTypes.HealthCheck:
        return (
          <>
            <p> HealthCheck: {EntryItem.healthCheckRating}</p>
            <FavoriteIcon
              style={
                EntryItem.healthCheckRating === 0
                  ? { color: "green" }
                  : EntryItem.healthCheckRating === 1
                  ? { color: "yellow" }
                  : EntryItem.healthCheckRating === 2
                  ? { color: "purple" }
                  : { color: "red" }
              }
            />
          </>
        );
      case EntryTypes.OccupationalHealthcare:
        return (
          <>
            <p>Employ Name: {EntryItem.employerName}</p>
            <p>{EntryItem.employerName}</p>
          </>
        );
      case EntryTypes.Hospital:
        return (
          <>
            <h4>Discharge details:</h4>
            <p>Discharge criteria: {EntryItem.discharge.criteria}</p>
            <p>Discharge date: {EntryItem.discharge.date}</p>
          </>
        );
      default:
        return <h1>Something is not included in the Entry type</h1>;
    }
  };

  const submitNewEntry = async (thisID: string, object: EntryWithoutId) => {
    try {
      const newEntry = await patientService.createEntry(thisID, object);
      setModalOpen(false);
      setEntries(entries && entries.concat(newEntry));
    } catch (error: unknown) {
      let errorMessage = "Something went wrong.";
      if (error instanceof Error) {
        errorMessage += " Error: " + error.message;
      }
      window.alert(errorMessage);
    }
  };

  return (
    <div>
      {patient === undefined ? (
        <p>unknown</p>
      ) : (
        <div>
          <h2>
            {patient.name + " "}{" "}
            {patient.gender === "male" ? (
              <MaleIcon />
            ) : patient.gender === "other" ? (
              <Man4Icon />
            ) : (
              <FemaleIcon />
            )}
          </h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>

          <h4>entries</h4>
          {entries &&
            entries.map((entry, index) => (
              <div
                key={index}
                style={{
                  outlineStyle: "inset",
                  outlineWidth: "thin",
                  padding: "0 1%",
                  margin: "1% 0",
                }}
              >
                <p>
                  {entry.date}:
                  <span style={{ fontStyle: "italic" }}>
                    {entry.description}
                  </span>
                </p>
                <ul>
                  {entry.diagnosisCodes &&
                    entry.diagnosisCodes.map((code, index) => (
                      <li key={index}>
                        {code}:{" "}
                        {diagnoses &&
                          diagnoses.filter((item) => item.code === code)[0]
                            .name}
                      </li>
                    ))}
                </ul>
                <EntryDetails EntryItem={entry} />
                <p>diagnose by: {entry.specialist}</p>
                <br />
              </div>
            ))}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            ADD NEW ENTRY
          </Button>
        </div>
      )}
      <AddEntryModal
        thisID={id}
        onClose={() => {
          setModalOpen(false);
          setError(undefined);
        }}
        diagnosisCodes={diagnoses || []}
        modalOpen={modalOpen}
        error={error}
        onSubmit={submitNewEntry}
      />
    </div>
  );
};

export default SinglePatientInfoPage;
