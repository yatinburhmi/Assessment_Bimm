import { useCars } from "../hooks/useCars";
import { Car } from "../types/car.types";
import CarCard from "./CarCard";

function CarList() {
  const { cars, loading, error } = useCars();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div>CarList</div>

      {cars.map((car: Car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}

export default CarList;
