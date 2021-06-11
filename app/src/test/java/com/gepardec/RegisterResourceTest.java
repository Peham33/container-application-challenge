package com.gepardec;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.Response.Status.CONFLICT;

@QuarkusTest
public class RegisterResourceTest {

    @ParameterizedTest
    @ValueSource(strings = {"007", "69", "003"})
    public void testRegisterEndpointWithExistingCodeNameReturnsConflictCode(String codeName) {
        final String name = "Random Spy Name";

        given()
                .with()
                    .formParam("codeName", codeName)
                    .formParam("name", name)
                .when()
                    .post("/register")
                .then()
                    .statusCode(CONFLICT.getStatusCode());
    }
}
