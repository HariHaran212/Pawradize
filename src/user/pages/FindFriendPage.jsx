import React from "react";
import PetCard from "../../components/PetCard";
import Dog from "/assets/Dog-1.jpg";
import Cat from "/assets/Cat-1.jpg";
import Rabbit from "/assets/Rabbit-1.jpg";
import PageContainer from "../../components/PageContainer";

const pets = [
  { id: 11, name: "Buddy", type: "Dog", img: Dog, age: "2 yrs", short: "Playful, vaccinated." },
  { id: 12, name: "Nala", type: "Cat", img: Cat, age: "1.5 yrs", short: "Calm and cuddly." },
  { id: 13, name: "Pip", type: "Rabbit", img: Rabbit, age: "6 mo", short: "Gentle companion." },
];

export default function FindFriend() {
  return (
    <PageContainer>
      <h1 className="text-3xl text-primary font-bold mb-4">Find a Friend</h1>
      <p className="text-gray-600 mb-8">Browse local pets that are ready for a loving home. Each pet has details, health records, and an easy application form.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {pets.map(p => <PetCard key={p.id} pet={p} />)}
      </div>
      
      <section className="mt-16 p-8 rounded-2xl bg-ivory text-text-dark">
        <h3 className="text-2xl font-bold text-black text-center mb-8">
          Our Simple 3-Step Adoption Process
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary text-ivory font-bold text-xl rounded-full mb-3">
              1
            </div>
            <h4 className="font-semibold mb-1">Submit Application</h4>
            <p className="text-sm text-text-medium">
              Fill out our online form with your details and tell us about the loving home you can provide.
            </p>
          </div>
          
          {/* Step 2 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary text-ivory font-bold text-xl rounded-full mb-3">
              2
            </div>
            <h4 className="font-semibold mb-1">Meet & Greet</h4>
            <p className="text-sm text-text-medium">
              We'll schedule a friendly virtual home-check and a meet-up for you to connect with your chosen pet.
            </p>
          </div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary text-ivory font-bold text-xl rounded-full mb-3">
              3
            </div>
            <h4 className="font-semibold mb-1">Welcome Home</h4>
            <p className="text-sm text-text-medium">
              Finalize the adoption and welcome your new friend! We offer follow-up support to ensure a smooth transition.
            </p>
          </div>

        </div>
      </section>
    </PageContainer>
  );
}
