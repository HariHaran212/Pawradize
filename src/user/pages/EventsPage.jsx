import React from 'react';
import PageContainer from '../../components/PageContainer';
import { BsCalendarEvent } from 'react-icons/bs';

const upcomingEvents = [
    { title: "Diwali Safety Workshop for Pets", date: "October 19, 2025", location: "Pawradise Store, Coimbatore", description: "Learn how to keep your pets calm and safe during the festive season's fireworks and noise." },
    { title: "Monthly Adoption Drive", date: "November 2, 2025", location: "VOC Park Grounds", description: "Meet adorable puppies and kittens from local shelters looking for their forever homes. Partnered with Coimbatore Animal Aid." },
];

export default function EventsPage() {
  return (
    <PageContainer>
       <div className="text-center mb-12">
        <BsCalendarEvent className="text-peach mx-auto mb-4" size={48}/>
        <h1 className="text-4xl md:text-5xl font-bold text-peach">Join the Pawradise Pack!</h1>
        <p className="text-text-medium mt-4 max-w-2xl mx-auto">
            We're more than a store—we're a community. Check out our upcoming events, workshops, and adoption drives happening right here in Coimbatore.
        </p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold text-text-dark mb-8">Upcoming Events</h2>
        <div className="space-y-6">
            {upcomingEvents.map(event => (
                <div key={event.title} className="flex flex-col md:flex-row gap-6 p-6 bg-ivory rounded-xl">
                    <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{event.date.split(' ')[1].replace(',', '')}</p>
                        <p className="text-md text-text-medium">{event.date.split(' ')[0]}</p>
                    </div>
                    <div className="border-l-2 border-accent pl-6">
                        <h3 className="font-bold text-xl text-primary">{event.title}</h3>
                        <p className="text-sm font-semibold text-text-medium mt-1">{event.location}</p>
                        <p className="text-text-medium text-sm mt-2">{event.description}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </PageContainer>
  );
}