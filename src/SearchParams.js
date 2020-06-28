import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";
import Results from "./Results";

const SearchParams = () => {
  const [location, updatelocation] = useState("Seattle,WA");
  const [breeds, setBreeds] = useState([]);
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breeds", "", breeds);
  const [pets, setPets] = useState([]);

  useEffect(() => {
    setBreeds([]);
    setBreed("");
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings);
    });
  }, [animal, setBreed, setBreeds]);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location: {location}
          <input
            type="text"
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => {
              updatelocation(e.target.value);
            }}
          />{" "}
        </label>{" "}
        <AnimalDropdown />
        <BreedDropdown />
        <button> Submit </button>{" "}
      </form>{" "}
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
