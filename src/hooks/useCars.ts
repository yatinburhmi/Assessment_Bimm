import { useQuery } from "@apollo/client";
import { GET_CARS } from "../graphql/queries";
import { Car } from "../types/car.types";

export const useCars = () => {
  const { data, loading, error } = useQuery<{ cars: Car[] }>(GET_CARS);
  const cars = data?.cars ?? [];

  return {
    cars,
    loading,
    error,
  };
};
