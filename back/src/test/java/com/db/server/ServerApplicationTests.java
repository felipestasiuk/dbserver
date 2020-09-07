package com.db.server;

import com.db.server.model.BaseResponse;
import com.db.server.model.VotoDTO;
import com.db.server.service.DbService;
import org.junit.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
class ServerApplicationTests {

	@Autowired
	private DbService service;

	@Test
	void contextLoads() {
		VotoDTO dto = new VotoDTO(new Date(), "Felipe", "Restaurante Teste");
		BaseResponse retorno1 = service.insertVoto(dto);
		Assert.assertEquals(retorno1.getMessage(), "Voto inserido com sucesso");
		BaseResponse retorno2 = service.insertVoto(dto);
		Assert.assertEquals(retorno2.getMessage(), "Usuário já votou nesse restaurante para essa semana");
	}

}
