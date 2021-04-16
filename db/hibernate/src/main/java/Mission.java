import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;

@Entity
@Table( name = "Mission")
public class Mission {
    @Id
    @Column (name = "missionId")
    private int missionId;
    @Column (name = "name")
    private String name;
    @Column (name = "description")
    private String description;
    @Column (name = "country",nullable = true)
    private String country;

    public Mission() {};

    public Mission(int id, String name, String description, String country) {
        this.missionId = id;
        this.name = name;
        this.description = description;
        this.country = country;
    };

    public int      getMissionId()          {return missionId;};
    public String   getName()               {return name;};
    public String   getDescription()        {return description;};
    public String   getCountry()            {return country;};
    public void     setMissionId(int id)                    {this.missionId = id;};
    public void     setName         (String name)           {this.name = name;};
    public void     setDescription  (String description)    {this.description = description;};
    public void     setCountry      (String country)        {this.country = country;};
}
