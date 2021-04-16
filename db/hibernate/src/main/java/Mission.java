public class Mission {
    private int missionId;
    private String name;
    private String description;
    private String country;

    public Mission() {};

    public Mission(int id, String name, String description, String country) {
        this.missionId = id;
        this.name = name;
        this.description = description;
        this.country = country;
    };

    public String   getId()             {return missionId;};
    public String   getName()           {return name;};
    public String   getDescription()    {return description;};
    public String   getCountry()        {return country;};
    public void     setId           (int id)                {this.missionId = id;};
    public void     setName         (String name)           {this.name = name;};
    public void     setDescription  (String description)    {this.description = description;};
    public void     setCountry      (String country)        {this.country = country;};
}
