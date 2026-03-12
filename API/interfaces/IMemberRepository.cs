using System;
using API.Entities;

namespace API.interfaces;

public interface IMemberRepository
{
    void update(Member member);
    Task<bool> SaveAllAsync();

    Task<IEnumerable<Member>> GetMembersAsync();
    Task<Member?> GetMemberByIdAsync(string id);

    Task<IReadOnlyList<Photo>> GetPhotosForMemberAsync(string memberId);
}
