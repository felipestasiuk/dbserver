package com.db.server.controller;

import com.db.server.entity.VotoRestaurante;
import com.db.server.model.*;
import com.db.server.service.DbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/db")
public class DbController {

    @Autowired
    private DbService service;

    @GetMapping(path = "/votos")
    public BaseResponse votos() {
        return service.votos();
    }

    @PostMapping(path = "/voto/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public BaseResponse insertVoto(VotoDTO voto) {
        return service.insertVoto(voto);
    }

    @DeleteMapping(path = "/voto/delete/{id}")
    public BaseResponse deleteVoto(@PathVariable("id") Long id) {
        return service.deleteVoto(id);
    }

    @GetMapping(path = "/resultado")
    public BaseResponse resultado() {
        return service.resultado();
    }

}
