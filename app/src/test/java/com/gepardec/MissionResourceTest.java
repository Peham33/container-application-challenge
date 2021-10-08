package com.gepardec;

import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.CsvSource;

import static io.restassured.RestAssured.given;
import static javax.ws.rs.core.Response.Status.OK;
import static org.hamcrest.Matchers.*;

@QuarkusTest
public class MissionResourceTest {

    @Test
    public void testMissionsEndpoint() {
        given().when().get("/missions").then().statusCode(OK.getStatusCode());
    }

    @ParameterizedTest
    @CsvSource({"1,Operation Dijkstra", "2,Operation Freedom"})
    public void testMissionEndpoint(int missionId, String missionName) {
        given()
                .pathParam("missionId", missionId)
                .when()
                    .get("/mission/{missionId}")
                .then()
                    .statusCode(OK.getStatusCode())
                    .body("name", equalTo(missionName))
                    .body("targets", not(emptyArray()));
    }

}
