using about_me.Models;
/*This service provides a simple in-memory data caching service
with users by default that our web API will use. (No data can be perm saved.)
When we stop and start the web API the in-memory data cache will be reset 
to the two default Users from the constructor of the Userservice.*/
namespace about_me.Services;

public static class UserService
{
    static List<Person> Users {get;}
    static int nextId = 1;
    static UserService()
    {
        Users = new List<Person>
        {
            new Person {
                Id = 0,
                Name = "Ben", 
                Skills=new List<string>(){"Mechanics", "Boat Captain", "Electrical", "Programming"},
                Likes=new List<string>(){"Coding", "Cars", "Beer"},
                Contact="Boyer.BenLee@gmail.com"
            }
        };
    }
    public static Person GetById(int _id) => Users[_id];
    public static List<Person> GetAll() => Users;   //store person list in memory
    public static Person? Get(int id) => Users.FirstOrDefault(p => p.Id == id);
    public static void Add(Person person)
    {
        person.Id = nextId++;    //we defined this ^^
        Users.Add(person);
    }
    public static void Delete(int id)
    {
        var person = Get(id);
        if(person is null)
        return;
        Users.Remove(person);
    }
    public static void Update(Person person)
    {
        var index = Users.FindIndex(p => p.Id == person.Id);
        if(index == -1)
        return;
        Users[index] = person;
    }
}