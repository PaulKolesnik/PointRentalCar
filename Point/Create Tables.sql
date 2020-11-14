

use Point
GO
-- tables for database Point


-- Table: Rental_branch
CREATE TABLE Rental_branch (
    branch_id int PRIMARY KEY IDENTITY(1,1),
    address nvarchar(50) NOT NULL Unique,
    branch_name nvarchar(50)  NOT NULL,
    loc_id int NOT NULL,
);

-- Table: Users
CREATE TABLE Users (
    user_id int PRIMARY KEY IDENTITY(1,1),
    user_role int  NOT NULL,
    full_name nvarchar(max)  NOT NULL,
    user_name nvarchar(max)  NOT NULL,
    password nvarchar(150)  NOT NULL,
    birth_date date,
    gender nvarchar(max) NOT NULL check(gender in ('male','female','other')),
    email nvarchar(max)  NOT NULL,
    phone_id int NOT NULL,
    user_pic nvarchar(max) NULL,
);

-- Table: car_categories
CREATE TABLE car_categories (
    cat_id int PRIMARY KEY IDENTITY(1,1),
    cat_name nvarchar(90)  NOT NULL unique,
    cat_desc nvarchar(max)  NULL,
);
-- Table: car_model
CREATE TABLE car_model (
    cModel_id int PRIMARY KEY IDENTITY(1,1),
	cModel_manufacturer nvarchar(90)  NOT NULL ,
    cModel_name nvarchar(90)  NOT NULL unique,
	cModel_catID int NOT NULL,
	price_day MONEY  NOT NULL,
    price_lateDay MONEY  NOT NULL,
);

-- Table: cars 
CREATE TABLE fleet_vehicles (
    id int PRIMARY KEY IDENTITY(1,1),
    VIN nvarchar(11)  NOT NULL,
    model_id int NOT NULL,
    color nvarchar(max)  NOT NULL,
    purchase_date date  NOT NULL,
	car_year nchar(4)  NOT NULL,
    mileage nvarchar(25)  NOT NULL,
    car_img nvarchar(max)  NULL,
    gearbox nvarchar(25)  NOT NULL,
    toUsed nvarchar(10)  NOT NULL check(toUsed in('yes','no')),
    carFixed nvarchar(10)  NOT NULL check(carFixed in('yes','no')),
    branch_id int NOT NULL,
);

-- Table: locations
CREATE TABLE locations (
    loc_id int PRIMARY KEY IDENTITY(1,1),
    latitude DECIMAL(10, 8)  NULL,
    longitude DECIMAL(11, 8) NULL,
);

-- Table: phones
CREATE TABLE phones (
    phone_id int PRIMARY KEY IDENTITY(1,1),
    phone_number nvarchar(max)  NOT NULL,
    loc_id int  NOT NULL,
);


-- Table: reservations
CREATE TABLE reservations (
    reservation_id int  PRIMARY KEY IDENTITY(1,1),
    amount MONEY  NOT NULL,
    p_date date  NOT NULL,
    r_date date  NOT NULL,
    f_date date  NULL,
    cars_id int  NOT NULL,
    users_id int  NOT NULL,
    paid_up nvarchar(10)  NOT NULL,
);

-- End of file.

