import { Button, Dialog, DialogContent, Typography } from "@mui/material";
import { useCars } from "../hooks/useCars";
import { Car } from "../types/car.types";
import CarCard from "./CarCard";
import { useState } from "react";
import NewCarForm from "./NewCarForm";

function CarList() {
  const { cars, loading, error } = useCars();
  const [openAddCarDialog, setOpenAddCarDialog] = useState<boolean>(false);

  const handleOpenAddCarDialog = () => {
    setOpenAddCarDialog(true);
  };

  const handleCloseAddCarDialog = () => {
    setOpenAddCarDialog(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div>CarList</div>
      <Button variant="contained" onClick={handleOpenAddCarDialog}>
        + Add Car
      </Button>
      <Dialog
        open={openAddCarDialog}
        onClose={handleCloseAddCarDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
          {/* <Typography>Content</Typography> */}
          <NewCarForm closeAddCarDialog={handleCloseAddCarDialog} />
        </DialogContent>
      </Dialog>

      {cars.map((car: Car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarList;
