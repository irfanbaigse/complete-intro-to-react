import React from "react";
import { render } from "react-dom";
import Pet from "./Pet";
import pf from "petfinder-client";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});
// class components
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(data => {
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        }
        // this is the way to set the state object
        this.setState({ pets });
      });
  }
  render() {
    return (
      <div>
        <h1>Adopt Me!</h1>
        {/* <Pet name="luna" animal="dog" breed="havenese" />
        <Pet name="pepper" animal="bird" breed="Cooktail" />
        <Pet name="Doink" animal="cat" breed="Mixed" /> */}

        <div>
          {this.state.pets.map(pet => {
            let breed = pet.breeds.breed;
            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(",");
            }
            return (
              <Pet
                key={pet.id}
                animal={pet.animal}
                location={`${pet.contact.city}, ${pet.contact.state}`}
                media={pet.media}
                name={pet.name}
                breed={breed}
              />
            );
          })}
        </div>

        {/* <pre>
          <code>{JSON.stringify(this.state, null, 4)}</code>
        </pre> */}
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
