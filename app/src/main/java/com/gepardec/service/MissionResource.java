package com.gepardec.service;

import com.gepardec.model.Mission;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@ApplicationScoped
@Path("/")
public class MissionResource {

    @Inject
    EntityManager em;

    @GET
    @Path("/missions")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Mission> missions() {
        return em.createQuery("SELECT m FROM Mission m", Mission.class).getResultList();
    }

    @GET
    @Path("/mission/{missionId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response mission(@PathParam("missionId") Long missionId) {
        Mission mission = em.find(Mission.class, missionId);

        if (mission != null) {
            return Response.ok().entity(mission).build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }
}
