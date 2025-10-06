// src/components/PetCard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PetCard({ pet }) {
  return (
    // The entire card is now a link to the pet's detail page
    <Link to={`/pet/${pet.id}`} className="block bg-white rounded-2xl shadow-lg shadow-accent/50 overflow-hidden group transition-transform duration-300 hover:-translate-y-1">
      <article>
        <div className="h-48 overflow-hidden">
          <img 
            src={pet.imageUrl} 
            alt={pet.name} 
            className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300" 
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-primary">{pet.name}</h3>
          <p className="text-sm text-text-medium">{pet.species} • {pet.age || "Unknown age"}</p>
          <p className="mt-2 text-sm text-text-dark">{pet.shortDescription || "Loving and ready for a new home."}</p>
        </div>
      </article>
    </Link>
  );
}