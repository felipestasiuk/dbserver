package com.db.server.repository;

import com.db.server.entity.VotoRestaurante;
import com.db.server.model.ResultadoDTO;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.Date;

public interface VotoRestauranteRepository extends CrudRepository<VotoRestaurante, Long> {

}
