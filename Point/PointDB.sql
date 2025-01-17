USE [master]
GO
/****** Object:  Database [Point]    Script Date: 21/12/2020 22:21:20 ******/
CREATE DATABASE [Point]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Point', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\Point.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Point_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\Point_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [Point] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Point].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Point] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Point] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Point] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Point] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Point] SET ARITHABORT OFF 
GO
ALTER DATABASE [Point] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [Point] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Point] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Point] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Point] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Point] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Point] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Point] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Point] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Point] SET  ENABLE_BROKER 
GO
ALTER DATABASE [Point] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Point] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Point] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Point] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Point] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Point] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Point] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Point] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Point] SET  MULTI_USER 
GO
ALTER DATABASE [Point] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Point] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Point] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Point] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Point] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Point] SET QUERY_STORE = OFF
GO
USE [Point]
GO
/****** Object:  Table [dbo].[car_categories]    Script Date: 21/12/2020 22:21:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[car_categories](
	[cat_id] [int] IDENTITY(1,1) NOT NULL,
	[cat_name] [nvarchar](90) NOT NULL,
	[cat_desc] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[cat_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[car_model]    Script Date: 21/12/2020 22:21:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[car_model](
	[cModel_id] [int] IDENTITY(1,1) NOT NULL,
	[cModel_manufacturer] [nvarchar](90) NOT NULL,
	[cModel_name] [nvarchar](90) NOT NULL,
	[cModel_catID] [int] NOT NULL,
	[price_day] [money] NOT NULL,
	[price_lateDay] [money] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[cModel_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[fleet_vehicles]    Script Date: 21/12/2020 22:21:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[fleet_vehicles](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[VIN] [nvarchar](11) NOT NULL,
	[model_id] [int] NOT NULL,
	[color] [nvarchar](max) NOT NULL,
	[purchase_date] [date] NOT NULL,
	[car_year] [nchar](4) NOT NULL,
	[mileage] [nvarchar](25) NOT NULL,
	[car_img] [nvarchar](max) NULL,
	[gearbox] [nvarchar](25) NOT NULL,
	[toUsed] [nvarchar](10) NOT NULL,
	[carFixed] [nvarchar](10) NOT NULL,
	[branch_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[locations]    Script Date: 21/12/2020 22:21:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[locations](
	[loc_id] [int] IDENTITY(1,1) NOT NULL,
	[latitude] [decimal](10, 8) NULL,
	[longitude] [decimal](11, 8) NULL,
PRIMARY KEY CLUSTERED 
(
	[loc_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[phones]    Script Date: 21/12/2020 22:21:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[phones](
	[phone_id] [int] IDENTITY(1,1) NOT NULL,
	[phone_number] [nvarchar](max) NOT NULL,
	[loc_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[phone_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Rental_branch]    Script Date: 21/12/2020 22:21:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Rental_branch](
	[branch_id] [int] IDENTITY(1,1) NOT NULL,
	[address] [nvarchar](50) NOT NULL,
	[branch_name] [nvarchar](50) NOT NULL,
	[loc_id] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[branch_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[reservations]    Script Date: 21/12/2020 22:21:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[reservations](
	[reservation_id] [int] IDENTITY(1,1) NOT NULL,
	[amount] [money] NOT NULL,
	[p_date] [date] NOT NULL,
	[r_date] [date] NOT NULL,
	[f_date] [date] NULL,
	[cars_id] [int] NOT NULL,
	[users_id] [int] NOT NULL,
	[paid_up] [nvarchar](10) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[reservation_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 21/12/2020 22:21:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[user_id] [int] IDENTITY(1,1) NOT NULL,
	[user_role] [int] NOT NULL,
	[full_name] [nvarchar](max) NOT NULL,
	[user_name] [nvarchar](max) NOT NULL,
	[password] [nvarchar](150) NOT NULL,
	[birth_date] [date] NULL,
	[gender] [nvarchar](max) NOT NULL,
	[email] [nvarchar](max) NOT NULL,
	[phone_id] [int] NOT NULL,
	[user_pic] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[car_categories] ON 

INSERT [dbo].[car_categories] ([cat_id], [cat_name], [cat_desc]) VALUES (1, N'Mini Cars', N'The cheapest category of small vehicles with small engine volume and not particularly large vehicles')
INSERT [dbo].[car_categories] ([cat_id], [cat_name], [cat_desc]) VALUES (2, N'Family Cars', N'Standard vehicles suitable for the family')
INSERT [dbo].[car_categories] ([cat_id], [cat_name], [cat_desc]) VALUES (3, N'Executive Cars', N'Large vehicles with a large trunk and high driving comfort')
SET IDENTITY_INSERT [dbo].[car_categories] OFF
GO
SET IDENTITY_INSERT [dbo].[car_model] ON 

INSERT [dbo].[car_model] ([cModel_id], [cModel_manufacturer], [cModel_name], [cModel_catID], [price_day], [price_lateDay]) VALUES (1, N'Opel', N'Astra', 2, 150.0000, 200.0000)
INSERT [dbo].[car_model] ([cModel_id], [cModel_manufacturer], [cModel_name], [cModel_catID], [price_day], [price_lateDay]) VALUES (2, N'Opel', N'Corsa', 2, 135.0000, 185.0000)
INSERT [dbo].[car_model] ([cModel_id], [cModel_manufacturer], [cModel_name], [cModel_catID], [price_day], [price_lateDay]) VALUES (3, N'Mazda', N'3', 2, 200.0000, 300.0000)
INSERT [dbo].[car_model] ([cModel_id], [cModel_manufacturer], [cModel_name], [cModel_catID], [price_day], [price_lateDay]) VALUES (4, N'Opel', N'Granda', 2, 150.0000, 200.0000)
INSERT [dbo].[car_model] ([cModel_id], [cModel_manufacturer], [cModel_name], [cModel_catID], [price_day], [price_lateDay]) VALUES (7, N'Mazda', N'232', 1, 150.0000, 200.0000)
INSERT [dbo].[car_model] ([cModel_id], [cModel_manufacturer], [cModel_name], [cModel_catID], [price_day], [price_lateDay]) VALUES (9, N'Mazda', N'323', 3, 150.0000, 200.0000)
INSERT [dbo].[car_model] ([cModel_id], [cModel_manufacturer], [cModel_name], [cModel_catID], [price_day], [price_lateDay]) VALUES (11, N'Seat', N'Cupra', 3, 600.0000, 850.0000)
SET IDENTITY_INSERT [dbo].[car_model] OFF
GO
SET IDENTITY_INSERT [dbo].[fleet_vehicles] ON 

INSERT [dbo].[fleet_vehicles] ([id], [VIN], [model_id], [color], [purchase_date], [car_year], [mileage], [car_img], [gearbox], [toUsed], [carFixed], [branch_id]) VALUES (1, N'2262790', 1, N'Red', CAST(N'2020-10-18' AS Date), N'2020', N'4000', NULL, N'Auto', N'yes', N'yes', 1)
INSERT [dbo].[fleet_vehicles] ([id], [VIN], [model_id], [color], [purchase_date], [car_year], [mileage], [car_img], [gearbox], [toUsed], [carFixed], [branch_id]) VALUES (2, N'4484520', 2, N'Blue', CAST(N'2020-09-16' AS Date), N'2020', N'3005', NULL, N'Auto', N'yes', N'yes', 1)
INSERT [dbo].[fleet_vehicles] ([id], [VIN], [model_id], [color], [purchase_date], [car_year], [mileage], [car_img], [gearbox], [toUsed], [carFixed], [branch_id]) VALUES (3, N'448344520', 2, N'Blue', CAST(N'2020-09-16' AS Date), N'2020', N'3005', NULL, N'Auto', N'yes', N'yes', 1)
INSERT [dbo].[fleet_vehicles] ([id], [VIN], [model_id], [color], [purchase_date], [car_year], [mileage], [car_img], [gearbox], [toUsed], [carFixed], [branch_id]) VALUES (5, N'44820', 2, N'Blue', CAST(N'2020-09-16' AS Date), N'2020', N'3005', NULL, N'Auto', N'no', N'yes', 1)
INSERT [dbo].[fleet_vehicles] ([id], [VIN], [model_id], [color], [purchase_date], [car_year], [mileage], [car_img], [gearbox], [toUsed], [carFixed], [branch_id]) VALUES (13, N'213123', 2, N'Red', CAST(N'2020-10-19' AS Date), N'2020', N'4000', NULL, N'Auto', N'yes', N'yes', 2)
INSERT [dbo].[fleet_vehicles] ([id], [VIN], [model_id], [color], [purchase_date], [car_year], [mileage], [car_img], [gearbox], [toUsed], [carFixed], [branch_id]) VALUES (14, N'5145', 9, N'Red', CAST(N'2020-12-15' AS Date), N'2016', N'4314', NULL, N'yes', N'no', N'yes', 1)
INSERT [dbo].[fleet_vehicles] ([id], [VIN], [model_id], [color], [purchase_date], [car_year], [mileage], [car_img], [gearbox], [toUsed], [carFixed], [branch_id]) VALUES (16, N'5145', 9, N'Red', CAST(N'2020-12-15' AS Date), N'2016', N'4314', NULL, N'sf', N'yes', N'no', 1)
INSERT [dbo].[fleet_vehicles] ([id], [VIN], [model_id], [color], [purchase_date], [car_year], [mileage], [car_img], [gearbox], [toUsed], [carFixed], [branch_id]) VALUES (17, N'342432', 1, N'red', CAST(N'2020-12-27' AS Date), N'2016', N'3141341', N'9d24e713-cc90-45e2-9153-83d8f98b75dd.jpg', N'yes', N'yes', N'yes', 1)
INSERT [dbo].[fleet_vehicles] ([id], [VIN], [model_id], [color], [purchase_date], [car_year], [mileage], [car_img], [gearbox], [toUsed], [carFixed], [branch_id]) VALUES (18, N'341341', 11, N'blue', CAST(N'2020-12-14' AS Date), N'2018', N'16651', N'3a69c55d-f42a-47de-bd73-3a9c7d568341.jpg', N'yes', N'no', N'yes', 2)
SET IDENTITY_INSERT [dbo].[fleet_vehicles] OFF
GO
SET IDENTITY_INSERT [dbo].[locations] ON 

INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (1, CAST(31.80438000 AS Decimal(10, 8)), CAST(34.65531500 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (2, CAST(31.67489100 AS Decimal(10, 8)), CAST(34.57503900 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (3, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (4, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (5, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (6, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (7, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (8, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (9, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (10, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (11, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (12, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (15, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
INSERT [dbo].[locations] ([loc_id], [latitude], [longitude]) VALUES (16, CAST(31.70181970 AS Decimal(10, 8)), CAST(34.58605000 AS Decimal(11, 8)))
SET IDENTITY_INSERT [dbo].[locations] OFF
GO
SET IDENTITY_INSERT [dbo].[phones] ON 

INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (1, N'0523662291', 1)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (2, N'0546216379', 2)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (3, N'052758373', 4)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (4, N'052758373', 4)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (5, N'105156020', 6)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (6, N'105156020', 6)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (7, N'0527583535', 8)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (8, N'0527583535', 8)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (9, N'0546216379', 10)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (10, N'0546216379', 10)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (11, N'4265', 12)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (12, N'4265', 12)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (14, N'065156156', 16)
INSERT [dbo].[phones] ([phone_id], [phone_number], [loc_id]) VALUES (15, N'065156156', 16)
SET IDENTITY_INSERT [dbo].[phones] OFF
GO
SET IDENTITY_INSERT [dbo].[Rental_branch] ON 

INSERT [dbo].[Rental_branch] ([branch_id], [address], [branch_name], [loc_id]) VALUES (1, N'Ashdod Tasia 3', N'Branch Ashdod', 1)
INSERT [dbo].[Rental_branch] ([branch_id], [address], [branch_name], [loc_id]) VALUES (2, N'Ashqelon mapilim 18b', N'Branch Ashqelon', 2)
SET IDENTITY_INSERT [dbo].[Rental_branch] OFF
GO
SET IDENTITY_INSERT [dbo].[reservations] ON 

INSERT [dbo].[reservations] ([reservation_id], [amount], [p_date], [r_date], [f_date], [cars_id], [users_id], [paid_up]) VALUES (1, 550.0000, CAST(N'2019-05-20' AS Date), CAST(N'2019-05-20' AS Date), NULL, 2, 1, N'500')
INSERT [dbo].[reservations] ([reservation_id], [amount], [p_date], [r_date], [f_date], [cars_id], [users_id], [paid_up]) VALUES (3, 220.0000, CAST(N'2019-05-20' AS Date), CAST(N'2019-05-20' AS Date), NULL, 1, 1, N'222')
INSERT [dbo].[reservations] ([reservation_id], [amount], [p_date], [r_date], [f_date], [cars_id], [users_id], [paid_up]) VALUES (4, 1215.0000, CAST(N'2020-12-23' AS Date), CAST(N'2021-01-01' AS Date), NULL, 3, 3, N'3546')
INSERT [dbo].[reservations] ([reservation_id], [amount], [p_date], [r_date], [f_date], [cars_id], [users_id], [paid_up]) VALUES (5, 405.0000, CAST(N'2020-12-22' AS Date), CAST(N'2020-12-25' AS Date), NULL, 5, 3, N'145')
INSERT [dbo].[reservations] ([reservation_id], [amount], [p_date], [r_date], [f_date], [cars_id], [users_id], [paid_up]) VALUES (6, 150.0000, CAST(N'2020-12-25' AS Date), CAST(N'2020-12-26' AS Date), NULL, 14, 3, N'53')
INSERT [dbo].[reservations] ([reservation_id], [amount], [p_date], [r_date], [f_date], [cars_id], [users_id], [paid_up]) VALUES (9, 6000.0000, CAST(N'2020-12-20' AS Date), CAST(N'2020-12-30' AS Date), NULL, 18, 3, N'84564')
SET IDENTITY_INSERT [dbo].[reservations] OFF
GO
SET IDENTITY_INSERT [dbo].[Users] ON 

INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (1, 1, N'Yosi shit', N'yosis', N'123', CAST(N'2019-05-20' AS Date), N'male', N'sda@gmail.com', 1, NULL)
INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (3, 1, N'paul kolesnik', N'paul', N'1234', CAST(N'2019-01-02' AS Date), N'male', N'esd@gh.com', 1, NULL)
INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (4, 2, N'sfgs sfgsg', N'sg', N'afga', CAST(N'2020-12-10' AS Date), N'male', N'paulsason@gmail.com', 2, NULL)
INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (5, 3, N'sfgs sfgsg', N'fafad', N'3rfs', CAST(N'2020-12-29' AS Date), N'male', N'paulsason@gmail.com', 2, NULL)
INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (17, 3, N'sfgs sfgsgs', N'qwrlk', N'1431rf', CAST(N'2020-12-11' AS Date), N'female', N'paulssason@gmail.com', 2, NULL)
INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (18, 3, N'גל אבידן', N'galb', N'46rhj4', CAST(N'2016-12-11' AS Date), N'male', N'gal772r2@gmail.com', 4, NULL)
INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (26, 3, N'Guest User', N'Guest', N'1234', CAST(N'2020-12-11' AS Date), N'other', N'guest@gmail.com', 1, NULL)
INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (27, 2, N'avner poket', N'avner', N'5123', CAST(N'2020-12-11' AS Date), N'male', N'ggg@gmail.com', 2, NULL)
INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (29, 1, N'master', N'admin', N'123', CAST(N'2016-11-11' AS Date), N'other', N'hs@gmail.com', 1, NULL)
INSERT [dbo].[Users] ([user_id], [user_role], [full_name], [user_name], [password], [birth_date], [gender], [email], [phone_id], [user_pic]) VALUES (30, 3, N'chano', N'chano', N'123', CAST(N'2020-12-31' AS Date), N'female', N'paulsason@gmail.com', 15, NULL)
SET IDENTITY_INSERT [dbo].[Users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__car_cate__FA8C179008A6884B]    Script Date: 21/12/2020 22:21:20 ******/
ALTER TABLE [dbo].[car_categories] ADD UNIQUE NONCLUSTERED 
(
	[cat_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__car_mode__AAAEFA1C534BFA4A]    Script Date: 21/12/2020 22:21:20 ******/
ALTER TABLE [dbo].[car_model] ADD UNIQUE NONCLUSTERED 
(
	[cModel_name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Rental_b__751C8E54EB4F0C52]    Script Date: 21/12/2020 22:21:20 ******/
ALTER TABLE [dbo].[Rental_branch] ADD UNIQUE NONCLUSTERED 
(
	[address] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[car_model]  WITH CHECK ADD  CONSTRAINT [FK_car_model_car_categories] FOREIGN KEY([cModel_catID])
REFERENCES [dbo].[car_categories] ([cat_id])
GO
ALTER TABLE [dbo].[car_model] CHECK CONSTRAINT [FK_car_model_car_categories]
GO
ALTER TABLE [dbo].[fleet_vehicles]  WITH CHECK ADD  CONSTRAINT [FK_fleet_vehicles_car_model] FOREIGN KEY([model_id])
REFERENCES [dbo].[car_model] ([cModel_id])
GO
ALTER TABLE [dbo].[fleet_vehicles] CHECK CONSTRAINT [FK_fleet_vehicles_car_model]
GO
ALTER TABLE [dbo].[fleet_vehicles]  WITH CHECK ADD  CONSTRAINT [FK_fleet_vehicles_Rental_branch] FOREIGN KEY([branch_id])
REFERENCES [dbo].[Rental_branch] ([branch_id])
GO
ALTER TABLE [dbo].[fleet_vehicles] CHECK CONSTRAINT [FK_fleet_vehicles_Rental_branch]
GO
ALTER TABLE [dbo].[phones]  WITH CHECK ADD  CONSTRAINT [FK_phones_locations] FOREIGN KEY([loc_id])
REFERENCES [dbo].[locations] ([loc_id])
GO
ALTER TABLE [dbo].[phones] CHECK CONSTRAINT [FK_phones_locations]
GO
ALTER TABLE [dbo].[Rental_branch]  WITH CHECK ADD  CONSTRAINT [FK_Rental_branch_locations] FOREIGN KEY([loc_id])
REFERENCES [dbo].[locations] ([loc_id])
GO
ALTER TABLE [dbo].[Rental_branch] CHECK CONSTRAINT [FK_Rental_branch_locations]
GO
ALTER TABLE [dbo].[reservations]  WITH CHECK ADD  CONSTRAINT [FK_reservations_fleet_vehicles] FOREIGN KEY([cars_id])
REFERENCES [dbo].[fleet_vehicles] ([id])
GO
ALTER TABLE [dbo].[reservations] CHECK CONSTRAINT [FK_reservations_fleet_vehicles]
GO
ALTER TABLE [dbo].[reservations]  WITH CHECK ADD  CONSTRAINT [FK_reservations_Users] FOREIGN KEY([users_id])
REFERENCES [dbo].[Users] ([user_id])
GO
ALTER TABLE [dbo].[reservations] CHECK CONSTRAINT [FK_reservations_Users]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_Users_phones] FOREIGN KEY([phone_id])
REFERENCES [dbo].[phones] ([phone_id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_Users_phones]
GO
ALTER TABLE [dbo].[fleet_vehicles]  WITH CHECK ADD CHECK  (([carFixed]='no' OR [carFixed]='yes'))
GO
ALTER TABLE [dbo].[fleet_vehicles]  WITH CHECK ADD CHECK  (([toUsed]='no' OR [toUsed]='yes'))
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD CHECK  (([gender]='other' OR [gender]='female' OR [gender]='male'))
GO
USE [master]
GO
ALTER DATABASE [Point] SET  READ_WRITE 
GO
