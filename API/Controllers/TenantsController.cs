using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TenantsController: ControllerBase
    {
        private readonly PropertyManagementContext _context;
        public TenantsController(PropertyManagementContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tenant>>> GetTenants()
        {
            var tenants = await _context.Tenants.ToListAsync();
            return Ok(tenants);
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Tenant>> GetTenant(Guid id)
        {
            var tenant = await _context.Tenants.FindAsync(id);
            return Ok(tenant);
        }
    }
}