/**
 * Main
 */
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;


public class ManageDBEntities {

    private static EntityManagerFactory factory;

    public static void main(String[] args) {
        factory = Persistence.createEntityManagerFactory( "hibernate.persistence" );
        EntityManager entityManager = factory.createEntityManager();
        entityManager.getTransaction().begin();
        entityManager.persist(new Mission(1, "Alpha", "The primary mission", "AT"));
        entityManager.persist(new Mission(2, "Beta", "The secondary mission", "AT"));
        entityManager.persist(new Mission(3, "Gamma", "The third mission", "AT"));
        entityManager.getTransaction().commit();
        entityManager.close();
    }

}


