10/27
 -- Just transferred all Trips logic from Dashboard to Trips component

    Next: 
        Figure out how to click on a trip and pull up an event with all events in the trip
            (fetch request with a query that pulls up this info)
        Create an event component that shows all of the info for the event
        Create inputs with CRUD
            Dashboard:
                ✅ Get all trips (...limit up to 5)
                ✅ Get all trips (...limit up to 5)

                ✅ Create a new trip
                    - Make sure date formats align with DB
                    - Add checkbox for isPublic 
                    - Then it will be complete!

            Inside of Trips Component:
                ✅ Edit Trip Modal
                ✅ Delete Trip
                😡 Update trip
                😡 Delete trip

            Events Component:
            (For each individual trip -- be able to):
                ✅ Get all events
                ✅ Create a new event
                😡 Update event
                😡 Delete events
                
        Figure out logic for the TripHub
            (how can people view and download other people's trips but not delete or edit them?)
        
        Create front end

        

 query the event table
 SELECT event.*, trip.* from event LEFT Join trip on trip.id = event.trip_id WHERE trip_id = $1 