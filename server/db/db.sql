--Table Creation

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    f_name varchar(20) NOT NULL,
    l_name varchar(20) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(128) NOT NULL
);

CREATE TABLE trip (
    trip_id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    trip_name VARCHAR(128),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT NOT NULL,
    is_public BOOLEAN,
    cover_photo VARCHAR(128)
);

CREATE TABLE event (
    event_id SERIAL NOT NULL PRIMARY KEY,
    trip_ref_id INT NOT NULL REFERENCES trip(trip_id),
    event_name VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    description TEXT,
    photos VARCHAR(128),
    rating INT CHECK(rating >= 1 and rating <= 5)
);

--Dummy Data 

--users
INSERT INTO users(f_name, l_name, email, password) VALUES ('Nick', 'Kwok', 'nwkwok@gmail.com', 'password');
INSERT INTO users(f_name, l_name, email, password) VALUES ('Josh', 'Kwok', 'jtkwok@gmail.com', 'password');
INSERT INTO users(f_name, l_name, email, password) VALUES ('Kai', 'Kwok', 'kdkwok@gmail.com', 'password');


--trips
INSERT INTO trip(user_id, trip_name, start_date, end_date, description, is_public, cover_photo) VALUES (1, 'Test Trip', current_date, current_date, 'My Trip to Los Angeles', TRUE, 'www.google.com/image');
INSERT INTO trip(user_id, trip_name, start_date, end_date, description, is_public, cover_photo) VALUES (2, 'San Ramon', current_date, current_date, 'A trip to visit my cousins', FALSE, 'www.google.com/image');
INSERT INTO trip(user_id, trip_name, start_date, end_date, description, is_public, cover_photo) VALUES (3, 'Torrance', current_date, current_date, 'Staycation!', TRUE, 'www.google.com/image');
INSERT INTO trip(user_id, trip_name, start_date, end_date, description, is_public, cover_photo) VALUES (3, 'YMCA', current_date, current_date, 'Gotta lift those weights.', TRUE, 'www.google.com/image');


--events
INSERT INTO event(trip_ref_id, event_name, start_date, end_date, description, photos) VALUES (1, 'The Getty', current_date, current_date, 'Checking out some art exhibits @ The Getty', 'www.google.com/images');
INSERT INTO event(trip_ref_id, event_name, start_date, end_date, description, photos) VALUES (2, 'The Park', current_date, current_date, 'Played at the park with my cousins', 'www.google.com/images');
INSERT INTO event(trip_ref_id, event_name, start_date, end_date, description, photos) VALUES (3, 'The Aquarium', current_date, current_date, 'Went to the aquarium with my mom and baby brother.', 'www.google.com/images');