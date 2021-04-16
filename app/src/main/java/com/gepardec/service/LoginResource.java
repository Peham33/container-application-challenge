package com.gepardec.service;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

import com.gepardec.model.*;

@Path("/login")
public class LoginResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello RESTEasy";
    }

    @GET
    @Path("/{codeName}")
    @Produces(MediaType.APPLICATION_JSON)
    public Spy test(@PathParam("codeName") String codeName,
                    @QueryParam("name") String name) {
        return new Spy(codeName, name);
    }
}
