namespace about_me.Models;

public class Person
{
    public int Id { get; set; }
    public string? Name { get; set; }
    //public IEnumerable<profile> = GetGithubProfile
    public List<string>? Skills { get; set; }
    public List<string>? Likes { get; set; }
    public string? Contact { get; set; }
}
