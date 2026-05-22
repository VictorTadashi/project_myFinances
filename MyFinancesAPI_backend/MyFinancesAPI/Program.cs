using Microsoft.EntityFrameworkCore;
using MyFinancesAPI.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=myfinances.db"));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
    db.Database.ExecuteSqlRaw("""
        CREATE TABLE IF NOT EXISTS Usuarios (
            Id        INTEGER PRIMARY KEY AUTOINCREMENT,
            Nome      TEXT    NOT NULL DEFAULT '',
            Email     TEXT    NOT NULL DEFAULT '',
            SenhaHash TEXT    NOT NULL DEFAULT '',
            CriadoEm TEXT    NOT NULL DEFAULT (datetime('now'))
        )
    """);
}

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyFinances API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AllowFrontend");
app.MapControllers();

app.Run();