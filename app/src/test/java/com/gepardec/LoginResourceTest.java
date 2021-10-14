package com.gepardec;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.ValueSource;

import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.Response.Status.OK;
import static javax.ws.rs.core.Response.Status.UNAUTHORIZED;
import static org.hamcrest.Matchers.equalTo;

@QuarkusTest
public class LoginResourceTest {

    @Test
    public void testLoginEndpointWhenEmptyCodeNameReturnsUnauthorizedCode() {
        given().when().post("/login").then().statusCode(UNAUTHORIZED.getStatusCode());
    }

    @ParameterizedTest
    @CsvSource({"007,James Bond", "69,Austin Powers", "003,Johnny English"})
    public void testLoginEndpointWithValidCodeName(String codeName, String name) {
        given()
                .formParam("codeName", codeName)
                .when()
                    .post("/login")
                .then()
                    .statusCode(OK.getStatusCode())
                    .body("code", equalTo(codeName))
                    .body("name", equalTo(name));
    }

    @ParameterizedTest
    @ValueSource(strings = {"invalid"})
    @NullAndEmptySource
    public void testLoginEndpointWithInvalidCodeName(String codeName) {
        given()
                .formParam("codeName", codeName)
                .when()
                    .post("/login")
                .then()
                    .statusCode(UNAUTHORIZED.getStatusCode());
    }
}
