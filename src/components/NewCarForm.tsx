import { Button, Grid, MenuItem, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Car } from "../types/car.types";

const initialCarFormData: Omit<Car, "id"> = {
  make: "",
  model: "",
  year: new Date().getFullYear(),
  color: "",
  mobile: "",
  tablet: "",
  desktop: "",
};

const carFormDataFields = ["make", "model", "year", "color"];
const carFormRequiredFields = ["make", "model"];
const carFormImageFields = ["mobile", "tablet", "desktop"];

type NewCarFormProps = {
  closeAddCarDialog: () => void;
};

const NewCarForm = ({ closeAddCarDialog }: NewCarFormProps) => {
  const [carFormData, setCarFormData] =
    useState<Omit<Car, "id">>(initialCarFormData);

  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>(
    {}
  );

  // to populate year select field
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i);

  // validating each required field in the newCarForm
  const isFieldInvalid = (field: string) => {
    if (!touchedFields[field]) return false;

    if (!carFormRequiredFields.includes(field)) return false;

    const value = carFormData[field as keyof Omit<Car, "id">];

    if (typeof value == "string") {
      return value.trim() === "";
    }
    if (typeof value == "number") {
      return isNaN(value);
    }
    return false;
  };

  // This make sures that the form filled is valid. If not valid, form will not submit
  const isFormValid = carFormRequiredFields.every((field) => {
    const value = carFormData[field as keyof Omit<Car, "id">];
    if (typeof value === "string") {
      return value.trim() !== "";
    }
    if (typeof value === "number") {
      return !isNaN(value);
    }
    return false;
  });

  // DRY - To show error helper text for all the required fields
  const getHelperText = (field: string) => {
    if (!isFieldInvalid(field)) return "";
    return field.charAt(0).toUpperCase() + field.slice(1) + " is required.";
  };

  // This will detect if user has intracted with the field or not
  // Error will only be displayed if user interacted with the field for better UX
  const handleFieldBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
  };

  // This method controlles the form and updates the state on user input
  const handleCarFormDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = name === "year" ? Number(e.target.value) : e.target.value;
    setCarFormData((prev) => ({ ...prev, [name]: value }));
  };

  // This method is called when form is submitted. It handles form validation
  // and calls createCar mutation if the form is valid
  const handleCarFormDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredTouchedFields = carFormRequiredFields.reduce(
      (acc, field) => ({ ...acc, [field]: true }),
      {}
    );

    setTouchedFields(requiredTouchedFields);
    if (!isFormValid) return;
    // console.log(carFormData);
    setCarFormData(initialCarFormData);
    setTouchedFields({});
    closeAddCarDialog();
  };

  return (
    <form onSubmit={handleCarFormDataSubmit} noValidate>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Grid container>
            <Grid size={6}>
              <Typography variant="h6">Add a new car</Typography>
            </Grid>
            <Grid size={6} textAlign={"right"}>
              {" "}
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={closeAddCarDialog}
              />
            </Grid>
          </Grid>
        </Grid>
        {carFormDataFields.map((field) =>
          field == "year" ? (
            <Grid size={{ xs: 12, md: 6 }} key={field}>
              <TextField
                select
                label="Year"
                name="year"
                value={carFormData.year}
                onChange={handleCarFormDataChange}
                fullWidth
              >
                {years.map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          ) : (
            <Grid size={{ xs: 12, md: 6 }} key={field}>
              <TextField
                fullWidth
                name={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                required={carFormRequiredFields.includes(field)}
                onChange={handleCarFormDataChange}
                value={carFormData[field as keyof Omit<Car, "id">]}
                onBlur={handleFieldBlur}
                error={isFieldInvalid(field)}
                helperText={getHelperText(field)}
              />
            </Grid>
          )
        )}
        <Grid size={12}>
          <Typography>Image URLs</Typography>
        </Grid>
        {carFormImageFields.map((field) => (
          <Grid size={{ xs: 12, md: 6 }}>
            <TextField
              fullWidth
              name={field}
              label={field.charAt(0).toUpperCase() + field.slice(1)}
              value={carFormData[field as keyof Omit<Car, "id">]}
              onChange={handleCarFormDataChange}
            />
          </Grid>
        ))}
        <Grid size={12} textAlign={"center"}>
          <Button fullWidth type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewCarForm;
