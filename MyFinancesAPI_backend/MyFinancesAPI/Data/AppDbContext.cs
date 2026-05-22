using Microsoft.EntityFrameworkCore;
using MyFinancesAPI.Models;

namespace MyFinancesAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Lancamento> Lancamentos { get; set; }
    public DbSet<Usuario> Usuarios { get; set; }
}
