package ru.myjsf;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.beans.JavaBean;
import java.io.Serializable;

@Entity
@Table(name = "results")
@JavaBean
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result implements Serializable {

    private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double x;

    private double y;

    private double r;

    private boolean result;
    public double getX() {return x;}
    public double getY() {return y;}
    public double getR() {return r;}
    public boolean getResult() {return result;}

}

