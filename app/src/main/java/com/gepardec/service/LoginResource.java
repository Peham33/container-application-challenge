package com.gepardec.service;

import com.gepardec.model.Spy;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/login")
public class LoginResource {

    @Inject
    EntityManager em;

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@FormParam("codeName") String codeName) {

        List<Spy> spyList = em
                .createQuery("SELECT s FROM Spy s WHERE s.code = :codeName", Spy.class)
                .setParameter("codeName", codeName)
                .getResultList();

        if (spyList.isEmpty()) {
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        return Response.ok().entity(spyList.get(0)).build();
    }
}
