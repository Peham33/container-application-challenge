package com.gepardec.model;

import javax.json.bind.annotation.JsonbProperty;
import javax.json.bind.annotation.JsonbPropertyOrder;
import java.util.ArrayList;
import java.util.Iterator;

//@Entity
@JsonbPropertyOrder({"codename", "name", "retired", "alive", "missions"})
public class Spy {
    private String codeName;
    private String name;
    private ArrayList<Mission> missions;
    private boolean retired;
    private boolean alive;

    public Spy(String codeName, String name) {
        this.codeName = codeName;
        this.name = name;
        this.missions = new ArrayList<>();
        this.retired = false;
        this.alive = true;
    }

    @JsonbProperty("codename")
    public String getCodeName() {
        return codeName;
    }

    @JsonbProperty("name")
    public String getName() {
        return name;
    }

    @JsonbProperty("missions")
    public ArrayList<Mission> getMissions() {
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
