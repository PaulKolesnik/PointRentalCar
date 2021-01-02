using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace PaulKolesnik
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(setup => setup.AddPolicy("EntirePoint", policy => policy.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()));

            services.Configure<ApiBehaviorOptions>(o => o.SuppressModelStateInvalidFilter = true);
            services.AddDbContext<PointContext>(o => o.UseSqlServer(Configuration.GetConnectionString("point")));
            services.AddTransient<CarCategoryLogic>();
            services.AddTransient<RentalBranchLogic>();
            services.AddTransient<CarModelLogic>();
            services.AddTransient<FleetVehiclesLogic>();
            services.AddTransient<ReservationLogic>();
            services.AddTransient<UserLogic>();
            services.AddControllers();



            JwtHelper jwtHelper = new JwtHelper(Configuration.GetValue<string>("JWT:Key"));
            services.AddSingleton(jwtHelper);
            services.AddAuthentication(o => jwtHelper.SetAuthenticationOptions(o)).AddJwtBearer(o => jwtHelper.SetBearerOptions(o));
       
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication(); // אימות
            app.UseAuthorization(); // הרשאות

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
