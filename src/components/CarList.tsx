import { useCars } from "../hooks/useCars";
import { Car } from "../types/car.types";

function CarList() {
  const { cars, loading, error } = useCars();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <div>CarList</div>
      <ul>
        {cars.map((car: Car) => (
          <li key={car.id}>
            {car.make} {car.model}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarList;
