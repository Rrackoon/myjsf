package ru.myjsf;

import jakarta.ejb.TransactionManagement;
import jakarta.ejb.TransactionManagementType;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

import java.io.Serializable;
import java.util.List;

@Named("resultBean")
@SessionScoped
@TransactionManagement(TransactionManagementType.BEAN)
public class ResultBean implements Serializable {

    @PersistenceContext
    private EntityManager entityManager;
    private double x;
    private double y;
    private double r;
    private boolean isInside;

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isInside() {
        return isInside;
    }

    public void setInside(boolean inside) {
        isInside = inside;
    }

    @Transactional
    public String addResult() {
        boolean isInside = checkArea(x, y, r);
        this.isInside = isInside;
        Result result = new Result(null, x, y, r, isInside);
        entityManager.getTransaction().begin();
        entityManager.persist(result);
        entityManager.getTransaction().commit();
        return null;
    }


    @Transactional
    public void saveResult(Result result) {
        entityManager.getTransaction().begin();
        entityManager.persist(result);
        entityManager.getTransaction().commit();
    }


    public List<Result> getResults() {
        List<Result> res= entityManager.createQuery(" SELECT r FROM Result r ", Result.class).getResultList();
        return res;
    }
    @Transactional
    public void clearResults() {
        entityManager.getTransaction().begin();
        entityManager.createQuery("DELETE FROM Result").executeUpdate();
        entityManager.getTransaction().commit();
    }

    public boolean checkArea(double x, double y, double r) {
        if (x >= 0 && y >= 0 && x <= r/2.0 && y <= r ) {
            return true;
        }
        if (x >= 0 && y <= 0 && (x -y  <= r )) {
            return true;
        }
        if (x <= 0 && y <= 0 && (x*x + y*x <= r*r )) {
            return true;
        }
        return false;
    }
}
