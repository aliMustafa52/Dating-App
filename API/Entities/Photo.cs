using System;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }

    public string? PublicId { get; set; }
    public bool IsMain { get; set; }

    //navigation properties
    public string MemberId { get; set; } = string.Empty;
    public Member Member { get; set; } = null!;
}
