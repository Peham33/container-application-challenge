package com.gepardec.model;

import javax.json.bind.annotation.JsonbProperty;
import javax.json.bind.annotation.JsonbPropertyOrder;
import javax.persistence.*;

@JsonbPropertyOrder({"mission_id", "name", "description"})
@Entity
@Table(name = "target")
public class Target {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "mission_id")
    private Long missionId;

    @Column(name = "description")
    private String description;

    public Target() {
    }

    public Target(String name, String description) {
        this.missionId = 17L;
        this.name = name;
        this.description = description;
    }

    @JsonbProperty("mission_id")
    public Long getMissionId() {
        return missionId;
    }

    @JsonbProperty("name")
    public String getName() {
        return name;
    }

    @JsonbProperty("description")
    public String getDescription() {
        return description;
    }
}
