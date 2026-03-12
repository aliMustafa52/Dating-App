using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities;

public class Member
{
    public string Id { get; set; } = string.Empty;
    public DateOnly BirthDate { get; set; }
    public string? ImageUrl { get; set; }
    public required string DisplayName { get; set; }
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public string? Description { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }


    //navigation properties
    public ICollection<Photo> Photos { get; set; } = [];

    [ForeignKey(nameof(Id))]
    public AppUser AppUser { get; set; } = null!;
}
