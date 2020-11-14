using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PaulKolesnik
{
    public partial class PointContext : DbContext
    {
        public PointContext()
        {
        }

        public PointContext(DbContextOptions<PointContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CarCategory> CarCategories { get; set; }
        public virtual DbSet<CarModel> CarModels { get; set; }
        public virtual DbSet<FleetVehicle> FleetVehicles { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Phone> Phones { get; set; }
        public virtual DbSet<RentalBranch> RentalBranches { get; set; }
        public virtual DbSet<Reservation> Reservations { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=DESKTOP-5TL5HPJ\\SQLEXPRESS;Database=Point;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarCategory>(entity =>
            {
                entity.HasKey(e => e.CatId)
                    .HasName("PK__car_cate__DD5DDDBD7A61D710");

                entity.ToTable("car_categories");

                entity.HasIndex(e => e.CatName)
                    .HasName("UQ__car_cate__FA8C179008A6884B")
                    .IsUnique();

                entity.Property(e => e.CatId).HasColumnName("cat_id");

                entity.Property(e => e.CatDesc).HasColumnName("cat_desc");

                entity.Property(e => e.CatName)
                    .IsRequired()
                    .HasColumnName("cat_name")
                    .HasMaxLength(90);
            });

            modelBuilder.Entity<CarModel>(entity =>
            {
                entity.HasKey(e => e.CModelId)
                    .HasName("PK__car_mode__45A3F0E71D49780A");

                entity.ToTable("car_model");

                entity.HasIndex(e => e.CModelName)
                    .HasName("UQ__car_mode__AAAEFA1C534BFA4A")
                    .IsUnique();

                entity.Property(e => e.CModelId).HasColumnName("cModel_id");

                entity.Property(e => e.CModelCatId).HasColumnName("cModel_catID");

                entity.Property(e => e.CModelManufacturer)
                    .IsRequired()
                    .HasColumnName("cModel_manufacturer")
                    .HasMaxLength(90);

                entity.Property(e => e.CModelName)
                    .IsRequired()
                    .HasColumnName("cModel_name")
                    .HasMaxLength(90);

                entity.Property(e => e.PriceDay)
                    .HasColumnName("price_day")
                    .HasColumnType("money");

                entity.Property(e => e.PriceLateDay)
                    .HasColumnName("price_lateDay")
                    .HasColumnType("money");

                entity.HasOne(d => d.CModelCat)
                    .WithMany(p => p.CarModels)
                    .HasForeignKey(d => d.CModelCatId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_car_model_car_categories");
            });

            modelBuilder.Entity<FleetVehicle>(entity =>
            {
                entity.ToTable("fleet_vehicles");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.BranchId).HasColumnName("branch_id");

                entity.Property(e => e.CarFixed)
                    .IsRequired()
                    .HasColumnName("carFixed")
                    .HasMaxLength(10);

                entity.Property(e => e.CarImg).HasColumnName("car_img");

                entity.Property(e => e.CarYear)
                    .IsRequired()
                    .HasColumnName("car_year")
                    .HasMaxLength(4)
                    .IsFixedLength();

                entity.Property(e => e.Color)
                    .IsRequired()
                    .HasColumnName("color");

                entity.Property(e => e.Gearbox)
                    .IsRequired()
                    .HasColumnName("gearbox")
                    .HasMaxLength(25);

                entity.Property(e => e.Mileage)
                    .IsRequired()
                    .HasColumnName("mileage")
                    .HasMaxLength(25);

                entity.Property(e => e.ModelId).HasColumnName("model_id");

                entity.Property(e => e.PurchaseDate)
                    .HasColumnName("purchase_date")
                    .HasColumnType("date");

                entity.Property(e => e.ToUsed)
                    .IsRequired()
                    .HasColumnName("toUsed")
                    .HasMaxLength(10);

                entity.Property(e => e.Vin)
                    .IsRequired()
                    .HasColumnName("VIN")
                    .HasMaxLength(11);

                entity.HasOne(d => d.Branch)
                    .WithMany(p => p.FleetVehicles)
                    .HasForeignKey(d => d.BranchId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_fleet_vehicles_Rental_branch");

                entity.HasOne(d => d.Model)
                    .WithMany(p => p.FleetVehicles)
                    .HasForeignKey(d => d.ModelId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_fleet_vehicles_car_model");
            });

            modelBuilder.Entity<Location>(entity =>
            {
                entity.HasKey(e => e.LocId)
                    .HasName("PK__location__BF539ED3CDC55860");

                entity.ToTable("locations");

                entity.Property(e => e.LocId).HasColumnName("loc_id");

                entity.Property(e => e.Latitude)
                    .HasColumnName("latitude")
                    .HasColumnType("decimal(10, 8)");

                entity.Property(e => e.Longitude)
                    .HasColumnName("longitude")
                    .HasColumnType("decimal(11, 8)");
            });

            modelBuilder.Entity<Phone>(entity =>
            {
                entity.ToTable("phones");

                entity.Property(e => e.PhoneId).HasColumnName("phone_id");

                entity.Property(e => e.LocId).HasColumnName("loc_id");

                entity.Property(e => e.PhoneNumber)
                    .IsRequired()
                    .HasColumnName("phone_number");

                entity.HasOne(d => d.Loc)
                    .WithMany(p => p.Phones)
                    .HasForeignKey(d => d.LocId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_phones_locations");
            });

            modelBuilder.Entity<RentalBranch>(entity =>
            {
                entity.HasKey(e => e.BranchId)
                    .HasName("PK__Rental_b__E55E37DE90B17257");

                entity.ToTable("Rental_branch");

                entity.HasIndex(e => e.Address)
                    .HasName("UQ__Rental_b__751C8E54EB4F0C52")
                    .IsUnique();

                entity.Property(e => e.BranchId).HasColumnName("branch_id");

                entity.Property(e => e.Address)
                    .IsRequired()
                    .HasColumnName("address")
                    .HasMaxLength(50);

                entity.Property(e => e.BranchName)
                    .IsRequired()
                    .HasColumnName("branch_name")
                    .HasMaxLength(50);

                entity.Property(e => e.LocId).HasColumnName("loc_id");

                entity.HasOne(d => d.Loc)
                    .WithMany(p => p.RentalBranches)
                    .HasForeignKey(d => d.LocId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rental_branch_locations");
            });

            modelBuilder.Entity<Reservation>(entity =>
            {
                entity.ToTable("reservations");

                entity.Property(e => e.ReservationId).HasColumnName("reservation_id");

                entity.Property(e => e.Amount)
                    .HasColumnName("amount")
                    .HasColumnType("money");

                entity.Property(e => e.CarsId).HasColumnName("cars_id");

                entity.Property(e => e.FDate)
                    .HasColumnName("f_date")
                    .HasColumnType("date");

                entity.Property(e => e.PDate)
                    .HasColumnName("p_date")
                    .HasColumnType("date");

                entity.Property(e => e.PaidUp)
                    .IsRequired()
                    .HasColumnName("paid_up")
                    .HasMaxLength(10);

                entity.Property(e => e.RDate)
                    .HasColumnName("r_date")
                    .HasColumnType("date");

                entity.Property(e => e.UsersId).HasColumnName("users_id");

                entity.HasOne(d => d.Cars)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.CarsId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_reservations_fleet_vehicles");

                entity.HasOne(d => d.Users)
                    .WithMany(p => p.Reservations)
                    .HasForeignKey(d => d.UsersId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_reservations_Users");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.BirthDate)
                    .HasColumnName("birth_date")
                    .HasColumnType("date");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email");

                entity.Property(e => e.FullName)
                    .IsRequired()
                    .HasColumnName("full_name");

                entity.Property(e => e.Gender)
                    .IsRequired()
                    .HasColumnName("gender");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(150);

                entity.Property(e => e.PhoneId).HasColumnName("phone_id");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasColumnName("user_name");

                entity.Property(e => e.UserPic).HasColumnName("user_pic");

                entity.Property(e => e.UserRole).HasColumnName("user_role");

                entity.HasOne(d => d.Phone)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.PhoneId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Users_phones");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
