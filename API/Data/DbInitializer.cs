using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Services;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
  public static class DbInitializer
  {
    public static async Task Initialize(PropertyManagementContext context, UserManager<User> userManager, RandomStringService randomStringService)
    {
      if (!userManager.Users.Any())
      {
        var admin = new User
        {
          UserName = "airagals",
          Email = "airagals@sample.com",
          IsEnabled = true,
          Address = "Pasig",
          FirstName = "Aira",
          LastName = "Gals",
          Phone = "09123456789"
        };

        await userManager.CreateAsync(admin, "EFp3GZ(V2=7q<kze");
        await userManager.AddToRolesAsync(admin, new[] { "User", "Admin" });

        var user1 = new User
        {
          UserName = "lexcalin",
          Email = "lexcalin@sample.com",
          IsEnabled = true,
          Address = "Pasig",
          FirstName = "Lex",
          LastName = "Calin",
          Phone = "09123456789"
        };

        await userManager.CreateAsync(user1, "EFp3GZ(V2=7q<kze");
        await userManager.AddToRoleAsync(user1, "User");

        var user2 = new User
        {
          UserName = "ayaheloise",
          Email = "ayaheloise@sample.com",
          IsEnabled = true,
          Address = "Pasig",
          FirstName = "Ayah",
          LastName = "Eloise",
          Phone = "09123456789"
        };

        await userManager.CreateAsync(user2, "EFp3GZ(V2=7q<kze");
        await userManager.AddToRoleAsync(user2, "User");
      }

      // if (!context.Tenants.Any())
      // {
      //   var tenants = new List<Tenant>
      //           {
      //               new Tenant
      //               {
      //                   FirstName = "Ayah",
      //                   LastName = "Eloise",
      //                   Phone = "09123456789",
      //                   BusinessName = "BN1",
      //                   DateCreated = DateTimeOffset.UtcNow,
      //                   TenantUniqueId = randomStringService.GetRandomString().ToUpper()
      //               },
      //               new Tenant
      //               {
      //                   FirstName = "Aira",
      //                   LastName = "Gals",
      //                   Phone = "09123456789",
      //                   BusinessName = "BN2",
      //                   DateCreated = DateTimeOffset.UtcNow,
      //                   TenantUniqueId = randomStringService.GetRandomString().ToUpper()
      //               },
      //               new Tenant
      //               {
      //                   FirstName = "Lex",
      //                   LastName = "Calin",
      //                   Phone = "09123456789",
      //                   BusinessName = "BN3",
      //                   DateCreated = DateTimeOffset.UtcNow,
      //                   TenantUniqueId = randomStringService.GetRandomString().ToUpper()
      //               },
      //           };

      //   context.Tenants.AddRange(tenants);
      //   context.SaveChanges();
      // }

      if (!context.Units.Any())
      {
        var units = new List<Unit>();
        for (var i = 1; i <= 50; i++)
        {
          units.Add(new Unit
          {
            SlotNumber = $"UNT{i}",
            Size = 30,
            Price = 15000,
            SlotStatus = Enums.SlotStatus.Available
          });
        }

        context.Units.AddRange(units);
        context.SaveChanges();
      }

      if (!context.Announcements.Any())
      {
        var announcements = new List<Announcement>
                {
                    new Announcement
                    {
                        Title = "Test Announcement",
                        Message = "This is to test the announcement",
                        DateCreated = DateTimeOffset.UtcNow,
                        IsArchived = false
                    },
                    new Announcement
                    {
                        Title = "Second Announcement",
                        Message = "This is another test announcement",
                        DateCreated = DateTimeOffset.UtcNow.AddSeconds(10),
                        IsArchived = false
                    },
                    new Announcement
                    {
                        Title = "Third Announcement",
                        Message = "This is the third test announcement",
                        DateCreated = DateTimeOffset.UtcNow.AddSeconds(20),
                        IsArchived = false
                    },
                    new Announcement
                    {
                        Title = "Fourth Announcement",
                        Message = "This is the fourth test announcement",
                        DateCreated = DateTimeOffset.UtcNow.AddSeconds(30),
                        IsArchived = false
                    },
                    new Announcement
                    {
                        Title = "Fifth Announcement",
                        Message = "This is the fifth test announcement",
                        DateCreated = DateTimeOffset.UtcNow.AddSeconds(40),
                        IsArchived = false
                    }
                };

        context.Announcements.AddRange(announcements);
        context.SaveChanges();
      }

      if (!context.ModeOfPayments.Any())
      {
        var modeOfPayments = new List<ModeOfPayment>
                {
                    new ModeOfPayment
                    {
                        BankName = "BDO",
                        AccountName = "Maximo Galutera",
                        AccountNumber = "00191928280",
                        IsArchived = false
                    },
                    new ModeOfPayment
                    {
                        BankName = "GCASH",
                        AccountName = "Maximo Galutera",
                        AccountNumber = "00191928280",
                        IsArchived = false
                    },
                    new ModeOfPayment
                    {
                        BankName = "UNIONBANK",
                        AccountName = "Maximo Galutera",
                        AccountNumber = "00191928280",
                        IsArchived = false
                    }
                };

        context.ModeOfPayments.AddRange(modeOfPayments);
        context.SaveChanges();
      }
    }
  }
}