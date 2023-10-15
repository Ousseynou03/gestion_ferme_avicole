package com.dione.gestion_avicole.dao;

import com.dione.gestion_avicole.POJO.Nutrition;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NutritionDao extends JpaRepository<Nutrition,Integer> {
}
