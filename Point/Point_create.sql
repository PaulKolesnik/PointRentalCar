
-- tables

-- Table: Rental_branch
CREATE TABLE Rental_branch (
    branch_id int  NOT NULL,
    Adress nvarchar(max)  NOT NULL,
    name nvarchar(max)  NOT NULL,
    loc_id int  NOT NULL,
    CONSTRAINT Rental_branch_pk PRIMARY KEY  (branch_id)
);

-- Table: Users
CREATE TABLE Users (
    user_id int  NOT NULL,
    user_role int  NOT NULL,
    full_name nvarchar(max)  NOT NULL,
    user_name nvarchar(max)  NOT NULL,
    password nvarchar(max)  NOT NULL,
    birth_date date  NOT NULL,
    gender nvarchar(max)  NOT NULL,
    email nvarchar(max)  NOT NULL,
    phone_id int  NOT NULL,
    user_pic image  NULL,
    CONSTRAINT customers_pk PRIMARY KEY  (user_id)
);

-- Table: car_categories
CREATE TABLE car_categories (
    cat_id int  NOT NULL,
    cat_name nvarchar(90)  NOT NULL,
    cat_desc nvarchar(max)  NULL,
    price_id int  NOT NULL,
    CONSTRAINT categories_pk PRIMARY KEY  (cat_id)
);

-- Table: car_details
CREATE TABLE car_details (
    details_id int  NOT NULL,
    car_year nchar(4)  NOT NULL,
    mileage nvarchar(25)  NOT NULL,
    car_img image  NULL,
    gearbox nvarchar(25)  NOT NULL,
    toUsed nvarchar(10)  NOT NULL,
    proper nvarchar(10)  NOT NULL,
    branch_id int  NOT NULL,
    cat_id int  NOT NULL,
    CONSTRAINT car_details_pk PRIMARY KEY  (details_id)
);

-- Table: cars
CREATE TABLE cars (
    id int  NOT NULL,
    VIN nvarchar(11)  NOT NULL,
    brand nvarchar(max)  NOT NULL,
    model nvarchar(max)  NOT NULL,
    color nvarchar(max)  NOT NULL,
    purchase_date date  NOT NULL,
    details_id int  NOT NULL,
    CONSTRAINT cars_pk PRIMARY KEY  (id)
);

-- Table: locations
CREATE TABLE locations (
    loc_id int  NOT NULL,
    latitude DECIMAL(10, 8)   NULL,
    longitude DECIMAL(11, 8)  NULL,
    CONSTRAINT locations_pk PRIMARY KEY  (loc_id)
);

-- Table: phones
CREATE TABLE phones (
    phone_id int  NOT NULL,
    phone_number nvarchar(max)  NOT NULL,
    loc_id int  NOT NULL,
    CONSTRAINT phones_pk PRIMARY KEY  (phone_id)
);

-- Table: price_list
CREATE TABLE price_list (
    price_id int  NOT NULL,
    rental_day MONEY  NOT NULL,
    late_day MONEY  NOT NULL,
    CONSTRAINT price_list_pk PRIMARY KEY  (price_id)
);

-- Table: reservations
CREATE TABLE reservations (
    reservation_id int  NOT NULL,
    amount MONEY  NOT NULL,
    p_date date  NOT NULL,
    r_date date  NOT NULL,
    f_date date  NULL,
    cars_id int  NOT NULL,
    users_id int  NOT NULL,
    paid_up nvarchar(10)  NOT NULL,
    CONSTRAINT reservations_pk PRIMARY KEY  (reservation_id)
);

-- foreign keys
-- Reference: Rental_branch_locations (table: Rental_branch)
ALTER TABLE Rental_branch ADD CONSTRAINT Rental_branch_locations
    FOREIGN KEY (loc_id)
    REFERENCES locations (loc_id);

-- Reference: Users_phones (table: Users)
ALTER TABLE Users ADD CONSTRAINT Users_phones
    FOREIGN KEY (phone_id)
    REFERENCES phones (phone_id);

-- Reference: car_details_Rental_branch (table: car_details)
ALTER TABLE car_details ADD CONSTRAINT car_details_Rental_branch
    FOREIGN KEY (branch_id)
    REFERENCES Rental_branch (branch_id);

-- Reference: car_details_car_categories (table: car_details)
ALTER TABLE car_details ADD CONSTRAINT car_details_car_categories
    FOREIGN KEY (cat_id)
    REFERENCES car_categories (cat_id);

-- Reference: cars_car_details (table: cars)
ALTER TABLE cars ADD CONSTRAINT cars_car_details
    FOREIGN KEY (details_id)
    REFERENCES car_details (details_id);

-- Reference: phones_locations (table: phones)
ALTER TABLE phones ADD CONSTRAINT phones_locations
    FOREIGN KEY (loc_id)
    REFERENCES locations (loc_id);

-- Reference: price_id (table: car_categories)
ALTER TABLE car_categories ADD CONSTRAINT price_id
    FOREIGN KEY (price_id)
    REFERENCES price_list (price_id);

-- Reference: reservations_Users (table: reservations)
ALTER TABLE reservations ADD CONSTRAINT reservations_Users
    FOREIGN KEY (users_id)
    REFERENCES Users (user_id);

-- Reference: reservations_cars (table: reservations)
ALTER TABLE reservations ADD CONSTRAINT reservations_cars
    FOREIGN KEY (cars_id)
    REFERENCES cars (id);

-- End of file.

