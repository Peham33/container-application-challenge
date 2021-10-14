package com.gepardec.model;

import javax.json.bind.annotation.JsonbProperty;
import javax.json.bind.annotation.JsonbPropertyOrder;
import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@JsonbPropertyOrder({"code", "name", "alive", "retired", "missions"})
@Entity
@Table(name = "spy")
public class Spy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code", unique = true, nullable = false)
    private String code;

    @Column(name = "name")
    private String name;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "mission_assignment",
            joinColumns = {@JoinColumn(name = "spy_id")},
            inverseJoinColumns = {@JoinColumn(name = "mission_id")}
    )
    private Set<Mission> missions;

    @Column(name = "retired")
    private boolean retired;

    @Column(name = "alive")
    private boolean alive;

    public Spy() {
    }

    public Spy(String code, String name) {
        this.code = code;
        this.name = name;
        this.missions = new HashSet<>();
        this.retired = false;
        this.alive = true;
    }

    @JsonbProperty("code")
    public String getCode() {
        return code;
    }

    @JsonbProperty("name")
    public String getName() {
        return name;
    }

    @JsonbProperty("missions")
    public Set<Mission> getMissions() {
        return missions;
    }

    @JsonbProperty("retired")
    public boolean isRetired() {
        return retired;
    }

    @JsonbProperty("alive")
    public boolean isAlive() {
        return alive;
    }
}
