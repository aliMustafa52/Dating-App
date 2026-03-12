using System;
using System.Security.Cryptography;
using System.Text.Json;
using API.Dtos;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedData(AppDbContext context)
    {
        if (await context.Users.AnyAsync())
            return;

        var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var members = JsonSerializer.Deserialize<List<SeedUserDto>>(memberData);

        if (members is null)
            return;



        foreach (var member in members)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Id = member.Id,
                DisplayName = member.DisplayName,
                Email = member.Email,
                ImageUrl = member.ImageUrl,
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                Member = new Member
                {
                    Id = member.Id,
                    BirthDate = member.BirthDate,
                    City = member.City,
                    Country = member.Country,
                    Description = member.Description,
                    DisplayName = member.DisplayName,
                    Gender = member.Gender,
                    ImageUrl = member.ImageUrl,
                    LastActive = member.LastActive,
                    CreatedOn = member.CreatedOn
                }
            };

            user.Member.Photos.Add(new Photo
            {
                Url = member.ImageUrl!,
                IsMain = true,
                MemberId = member.Id
            });

            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }
}
