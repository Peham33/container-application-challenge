import javax.persistence.*;

@Entity
@Table( name = "Spy")
public class Spy {

	@Id
	@Column (name = "missionId")
	private String codeName;
	@Column (name = "name")
	private String name;
	// Check if foreign key relationship is correct
	@ManyToOne
	@JoinColumn(name = "assignedMissionId", referencedColumnName = "missionId")
	private Mission[] missions;
	@Column (name = "retired")
	private boolean retired;
	@Column (name = "alive")
	private boolean alive;

	public Spy() {
	}

	public String getCodeName() {
		return codeName;
	}

	public String getName() {
		return name;
	}

	public Mission[] getMissions() {
		return missions;
	}

	public boolean getRetired() {
		return retired;
	}

	public boolean getAlive() {
		return alive;
	}

	public void setCodeName(String codeName) {
		this.codeName = codeName;
	}

	public void setName(String name) {
		this.name = name;
	}

	public void setMissions(Mission[] missions) {
		this.missions = missions;
	}

	public void setRetired(boolean retired) {
		this.retired = retired;
	}

	public void setAlive(boolean alive) {
		this.alive = alive;
	}
}

