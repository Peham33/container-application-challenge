package com.gepardec.model;

import javax.json.bind.annotation.JsonbProperty;
import javax.json.bind.annotation.JsonbPropertyOrder;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@JsonbPropertyOrder({"name", "description", "country", "targets"})
//@Entity
public class Mission {

    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    private String country;
    private Target[] targets;

    public Mission() {
    }

    public Mission(String name, String description, String country) {
        this.name = name;
        this.description = description;
        this.country = country;
    }

    @JsonbProperty("name")
    public String getName() {
        return name;
    }

    @JsonbProperty("description")
    public String getDescription() {
        return description;
    }

    @JsonbProperty("country")
    public String getCountry() {
        return country;
    }

    @JsonbProperty("targets")
    public Target[] getTargets() {
        return targets;
    }
}
