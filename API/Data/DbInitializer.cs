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
        // App users data
        var owner = new User
        {
          UserName = "maximo_galutera",
          Email = "maximo_galutera@sample.com",
          IsEnabled = true,
          Address = "Pasig",
          FirstName = "Maximo",
          LastName = "Galutera",
          Phone = "09880000555"
        };
        await userManager.CreateAsync(owner, "m_galutera");
        await userManager.AddToRolesAsync(owner, new[] {"User", "Admin", "Owner"});

        var systemAdministrator = new User
        {
          UserName = "system_admin",
          Email = "system_admin@sample.com",
          IsEnabled = true,
          Address = "Pasig",
          FirstName = "Ayah",
          LastName = "Eloise",
          Phone = "09123456789"
        };
        await userManager.CreateAsync(systemAdministrator, "s_admin");
        await userManager.AddToRolesAsync(systemAdministrator, new[] {"User", "Admin", "Owner"});

        var admin = new User
        {
          UserName = "maximarket_admin",
          Email = "maximarket_admin@sample.com",
          IsEnabled = true,
          Address = "1st Avenue",
          FirstName = "Paola",
          LastName = "Ramos",
          Phone = "09228888999"
        };
        await userManager.CreateAsync(admin, "m_admin");
        await userManager.AddToRolesAsync(admin, new[] { "User", "Admin" });
      }

      // Slots data
      var units = new List<Unit>();
      units.Add(new Unit { SlotNumber = "A-001", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-002", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-003", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-004", Size = 10, Price = 12000 });
      units.Add(new Unit { SlotNumber = "A-005", Size = 10, Price = 12000 });
      units.Add(new Unit { SlotNumber = "A-006", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-007", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-008", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-009", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-010", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-011", Size = 12, Price = 15000 });
      units.Add(new Unit { SlotNumber = "A-012", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-013", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-014", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-015", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-016", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-017", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-018", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-019", Size = 10, Price = 12000 });
      units.Add(new Unit { SlotNumber = "A-020", Size = 10, Price = 12000 });
      units.Add(new Unit { SlotNumber = "A-021", Size = 10, Price = 12000 });
      units.Add(new Unit { SlotNumber = "A-022", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-023", Size = 5, Price = 8000 });
      units.Add(new Unit { SlotNumber = "A-024", Size = 5, Price = 8000 });
      units.Add(new Unit { SlotNumber = "A-025", Size = 5, Price = 8000 });
      units.Add(new Unit { SlotNumber = "A-026", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-027", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-028", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-029", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-030", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-031", Size = 7, Price = 10000 });
      units.Add(new Unit { SlotNumber = "A-032", Size = 7, Price = 10000 });

        context.Units.AddRange(units);
        context.SaveChanges();

      if (!context.Announcements.Any())
      {
        var announcements = new List<Announcement>
          {
              new Announcement
              {
                  Title = "The standard Lorem Ipsum passage, used since the 1500s",
                  Message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                  DateCreated = DateTimeOffset.UtcNow,
                  IsArchived = false
              },
              new Announcement
              {
                  Title = "Section 1.10.32 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC ",
                  Message = "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
                  DateCreated = DateTimeOffset.UtcNow.AddSeconds(10),
                  IsArchived = false
              },
              new Announcement
              {
                  Title = "1914 translation by H. Rackham",
                  Message = "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
                  DateCreated = DateTimeOffset.UtcNow.AddSeconds(20),
                  IsArchived = false
              },
              new Announcement
              {
                  Title = "Section 1.10.33 of de Finibus Bonorum et Malorum, written by Cicero in 45 BC",
                  Message = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
                  DateCreated = DateTimeOffset.UtcNow.AddSeconds(30),
                  IsArchived = false
              },
              new Announcement
              {
                  Title = "1914 translation by H. Rackham",
                  Message = "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.",
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
                        IsArchived = false,
                        IsEnabled = true
                    },
                    new ModeOfPayment
                    {
                        BankName = "GCASH",
                        AccountName = "Maximo Galutera",
                        AccountNumber = "00191928280",
                        IsArchived = false,
                        IsEnabled = true
                    },
                    new ModeOfPayment
                    {
                        BankName = "UNIONBANK",
                        AccountName = "Maximo Galutera",
                        AccountNumber = "00191928280",
                        IsArchived = false,
                        IsEnabled = true
                    }
                };

        context.ModeOfPayments.AddRange(modeOfPayments);
        context.SaveChanges();
      }
    }
  }
}