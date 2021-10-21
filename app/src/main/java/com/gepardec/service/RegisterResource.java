package com.gepardec.service;

import com.gepardec.model.Spy;
import org.hibernate.exception.ConstraintViolationException;

import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/register")
public class RegisterResource {

    @Inject
    EntityManager em;

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Transactional
    public Response register(@FormParam("codeName") String codeName, @FormParam("name") String name) {
        Spy spy = new Spy(codeName, name);

        try {
            em.persist(spy);
        } catch (ConstraintViolationException e) {
            return Response.status(Response.Status.CONFLICT).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.ok().entity(e.getMessage()).build();
        }

        return Response.ok().status(Response.Status.CREATED).build();
    }
}
