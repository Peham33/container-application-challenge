package com.gepardec.service;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gepardec.model.*;

import java.util.List;
import java.util.Collections;

@Path("/")
public class MissionResource {

    @GET
    @Path("/missions")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Mission> missions() {
        return Collections.singletonList(new Mission());
    }

    @GET
    @Path("/mission/{missionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Mission mission(@PathParam("missionId") Long missionId) {
        return new Mission();
    }
}
