namespace API.Dtos;

public class UpdateMemberDto
{
    public required string DisplayName { get; set; }
    public string? Description { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
}
