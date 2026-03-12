using System;

namespace API.Dtos;

public class MemberDto
{
    public string Id { get; set; } = string.Empty;
    public DateOnly BirthDate { get; set; }
    public string? ImageUrl { get; set; }
    public required string DisplayName { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime LastActive { get; set; }
    public required string Gender { get; set; }
    public string? Description { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }

    //navigation properties
    public List<PhotoDto> Photos { get; set; } = [];
}
