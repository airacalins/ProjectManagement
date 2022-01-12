using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class PropertyManagementContext : IdentityDbContext<User>
  {
    public PropertyManagementContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Tenant> Tenants { get; set; }
    public DbSet<Photo> Photos { get; set; }

    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<InvoiceItem> InvoiceItems { get; set; }
    public DbSet<TenantContract> TenantContracts { get; set; }
    public DbSet<Unit> Units { get; set; }
    public DbSet<UnitPrice> UnitPrices { get; set; }
    public DbSet<UnitPhoto> UnitPhotos { get; set; }
    public DbSet<Announcement> Announcements { get; set; }
    public DbSet<ModeOfPayment> ModeOfPayments { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);
      builder.Entity<IdentityRole>()
      .HasData(new IdentityRole { Name = "USER", NormalizedName = "USER" },
      new IdentityRole { Name = "Admin", NormalizedName = "ADMIN" }
      );
    }

  }
}