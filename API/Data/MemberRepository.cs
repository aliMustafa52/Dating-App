using System;
using API.Entities;
using API.interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class MemberRepository(AppDbContext context) : IMemberRepository
{
    public async Task<Member?> GetMemberByIdAsync(string id)
    {
        return await context.Members
            .Include(m => m.Photos)
            .FirstOrDefaultAsync(m => m.Id == id);
    }

    public async Task<IEnumerable<Member>> GetMembersAsync()
    {
        return await context.Members
            .Include(m => m.Photos)
            .ToListAsync();
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberId)
    {
        return await context.Photos
            .Where(p => p.MemberId == memberId)
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void update(Member member)
    {
        context.Entry(member).State = EntityState.Modified;
    }
}
