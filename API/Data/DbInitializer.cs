using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.AspNetCore.Identity;

namespace API.Data
{
    public static class DbInitializer
    {
        public static async Task Initialize(PropertyManagementContext context, UserManager<User> userManager)
        {
            if (!userManager.Users.Any())
            {
                var admin = new User
                {
                    UserName = "airagals",
                    Email = "airagals@sample.com",
                };

                await userManager.CreateAsync(admin, "EFp3GZ(V2=7q<kze");
                await userManager.AddToRolesAsync(admin, new []{"User", "Admin"});
                
                var user1 = new User
                {
                    UserName = "lexcalin",
                    Email = "lexcalin@sample.com",
                };

                await userManager.CreateAsync(user1, "EFp3GZ(V2=7q<kze");
                await userManager.AddToRoleAsync(user1, "User");
                
                var user2 = new User
                {
                    UserName = "ayaheloise",
                    Email = "ayaheloise@sample.com",
                };

                await userManager.CreateAsync(user2, "EFp3GZ(V2=7q<kze");
                await userManager.AddToRoleAsync(user2, "User");
            }

            if (context.Tenants.Any()) return;

            var tenants = new List<Tenant>
            {
                new Tenant
                {
                    FirstName = "Ayah",
                    LastName = "Eloise",
                    Phone = "09123456789",
                    Email = "ayaheloise@sample.com",
                    DateCreated = DateTimeOffset.Now
                },
                new Tenant
                {
                    FirstName = "Aira",
                    LastName = "Gals",
                    Phone = "09123456789",
                    Email = "airagals@sample.com",
                    DateCreated = DateTimeOffset.Now
                },
                new Tenant
                {
                    FirstName = "Lex",
                    LastName = "Calin",
                    Phone = "09123456789",
                    Email = "lexcalin@sample.com",
                    DateCreated = DateTimeOffset.Now
                },
            };

            context.Tenants.AddRange(tenants);
            context.SaveChanges();
        }
    }
}