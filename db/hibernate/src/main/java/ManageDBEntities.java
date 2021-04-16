/**
 * Main
 */
import java.util.List;
import java.util.Date;
import java.util.Iterator;

import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class ManageDBEntities {

    private static SessionFactory factory;
    public static void main(String[] args) {

        try {
            factory = new Configuration().
                    configure().
                    addAnnotatedClass(Mission.class).
                    buildSessionFactory();
        } catch (Throwable ex) {
            System.err.println("Failed to create sessionFactory object." + ex);
            throw new ExceptionInInitializerError(ex);
        }

        ManageDBEntities ME = new ManageDBEntities();
        int[] missionsAdded = new int[3];
        missionsAdded[0]=ME.addMission(1,"Alpha","The primary mission","AT");
        missionsAdded[1]=ME.addMission(2,"Beta","The secondary mission","AT");
        missionsAdded[2]=ME.addMission(3,"Gamma","The third mission","AT");
        ME.listMissions();
        ME.updateMissionDescription(missionsAdded[2],"The tertiary mission");
        ME.deleteMission(missionsAdded[1]);
        ME.listMissions();
    }

    /* Method to CREATE a mission in the database */
    public Integer addMission(int id, String name, String description, String country){
        Session session = factory.openSession();
        Transaction tx = null;
        //Integer missionID = null;

        try {
            tx = session.beginTransaction();
            Mission mission = new Mission(id,name,description,country);
            /*mission.setMissionId(fname);
            mission.setLastName(lname);
            mission.setSalary(salary);
            missionID = (Integer) session.save(mission);*/
            tx.commit();
        } catch (HibernateException e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
        return id;
    }

    /* Method to  READ all the missions */
    public void listMissions( ){
        Session session = factory.openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            List missions = session.createQuery("FROM Mission").list();
            for (Iterator iterator = missions.iterator(); iterator.hasNext();){
                Mission mission = (Mission) iterator.next();
                System.out.print("Mission ID            : " + mission.getMissionId());
                System.out.print("Mission Name          : " + mission.getName());
                System.out.print("Mission Description   : " + mission.getDescription());
                System.out.print("Mission Country       : " + mission.getCountry());
            }
            tx.commit();
        } catch (HibernateException e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }

    public void updateMissionDescription(int id, String desc ){
        Session session = factory.openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            Mission mission = (Mission)session.get(Mission.class, id);
            mission.setDescription( desc );
            session.update(mission);
            tx.commit();
        } catch (HibernateException e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }

    /* Method to DELETE an mission from the records */
    public void deleteMission(Integer id){
        Session session = factory.openSession();
        Transaction tx = null;

        try {
            tx = session.beginTransaction();
            Mission mission = (Mission)session.get(Mission.class, id);
            session.delete(mission);
            tx.commit();
        } catch (HibernateException e) {
            if (tx!=null) tx.rollback();
            e.printStackTrace();
        } finally {
            session.close();
        }
    }
}


