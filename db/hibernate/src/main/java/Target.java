import javax.persistence.*;

@Entity
@Table( name = "Target" )
public class Target {
    @Id
    @Column (name = "name")
    private String name;
    @Column (name = "description")
    private String description;
    // Check if foreign key relationship is correct
    @ManyToOne
    @JoinColumn (name = "targetMissionId", referencedColumnName = "missionId")
    private Mission targetMission;

    public Target() {};
    public Target(String name, String description) {
        this.name = name;
        this.description = description;
    };

    public String       getName()           {return name;};
    public String       getDescription()    {return description;};

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Mission getTargetMission() {
        return targetMission;
    }

    public void setTargetMission(Mission targetMission) {
        this.targetMission = targetMission;
    }
}
