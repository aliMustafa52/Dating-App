using System;
using System.Linq;
using API.Dtos;
using API.Entities;

namespace API.Extensions;

public static class MemberExtensions
{
    public static MemberDto ToDto(this Member member)
    {
        return new MemberDto
        {
            Id = member.Id,
            BirthDate = member.BirthDate,
            ImageUrl = member.ImageUrl,
            DisplayName = member.DisplayName,
            CreatedOn = member.CreatedOn,
            LastActive = member.LastActive,
            Gender = member.Gender,
            Description = member.Description,
            City = member.City,
            Country = member.Country,
            Photos = member.Photos.Select(p => p.ToDto()).ToList()
        };
    }

    public static PhotoDto ToDto(this Photo photo)
    {
        return new PhotoDto
        {
            Id = photo.Id,
            Url = photo.Url,
            IsMain = photo.IsMain
        };
    }
}
