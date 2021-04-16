package com.gepardec.model;

import javax.json.bind.annotation.JsonbAnnotation;
import javax.json.bind.annotation.JsonbProperty;
import javax.json.bind.annotation.JsonbPropertyOrder;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@JsonbPropertyOrder({"id", "name", "description"})
//@Entity
public class Target {
    @Id
    @GeneratedValue
    private Long id;

    private String name;
    private String description;

    public Target() {
    }

    public Target(String name, String description) {
        this.id = 17L;
        this.name = name;
        this.description = description;
    }

    @JsonbProperty("id")
    public Long getId() {
        return id;
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
