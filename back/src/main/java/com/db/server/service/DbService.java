package com.db.server.service;

import com.db.server.entity.VotoRestaurante;
import com.db.server.model.*;
import com.db.server.repository.VotoRestauranteRepository;
import org.apache.commons.collections4.IterableUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.temporal.WeekFields;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DbService {

    @Autowired
    private VotoRestauranteRepository repository;

    public BaseResponse votos() {
        try {
            List<VotoRestaurante> list = listaTodosVotos();
            return new VotoResponse(200, "Consulta realizada com sucesso", list);
        } catch (Exception e) {
            return new BaseResponse(500, e.getMessage());
        }
    }

    private List<VotoRestaurante> listaTodosVotos() {
        return IterableUtils.toList(repository.findAll());
    }

    public BaseResponse insertVoto(VotoDTO votoDTO) {
        try {
            VotoRestaurante voto = VotoRestaurante.builder()
                    .restaurante(votoDTO.getRestaurante())
                    .nome(votoDTO.getNome())
                    .data(votoDTO.getData())
                    .build();
            if (verificarVotoMesmaSemana(voto)) {
                return new BaseResponse(400, "Usuário já votou nesse restaurante para essa semana");
            } else {
                repository.save(voto);
                return new BaseResponse(200, "Voto inserido com sucesso");
            }
        } catch (Exception e) {
            return new BaseResponse(500, e.getMessage());
        }
    }

    private boolean verificarVotoMesmaSemana(VotoRestaurante voto) {
        WeekFields weekFields = WeekFields.of(Locale.getDefault());
        return listaTodosVotos().stream()
                .filter(v -> v.getNome().equals(voto.getNome()))
                .filter(v -> v.getRestaurante().equals(voto.getRestaurante()))
                .filter(v -> v.getData().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().get(weekFields.weekOfWeekBasedYear())
                        == voto.getData().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().get(weekFields.weekOfWeekBasedYear()))
                .collect(Collectors.toList()).size() > 0;
    }

    public BaseResponse deleteVoto(Long id) {
        try {
            repository.deleteById(id);
            return new BaseResponse(200, "Voto deletado com sucesso");
        } catch (Exception e) {
            return new BaseResponse(500, e.getMessage());
        }
    }

    public BaseResponse resultado() {
        try {
            List<Date> datasVotadas = listaTodosVotos().stream()
                    .map(VotoRestaurante::getData)
                    .distinct()
                    .collect(Collectors.toList());
            List<ResultadoDTO> listResultado = buildListResultado(datasVotadas);
            return new ResultadoResponse(200, "Resultados calculados com sucesso", listResultado);
        } catch (Exception e) {
            return new BaseResponse(500, e.getMessage());
        }
    }

    private List<ResultadoDTO> buildListResultado(List<Date> datasVotadas) {
        List<ResultadoDTO> lisResultado = new ArrayList<>();
        for(Date data : datasVotadas) {
            lisResultado.add(buildResultadoDTO(data));
        }
        return lisResultado;
    }

    private ResultadoDTO buildResultadoDTO(Date data) {
        Optional<Map.Entry<String, Long>> maisVotadoDia  = listaTodosVotos()
                .stream()
                .filter(v -> v.getData().equals(data))
                .collect(Collectors.groupingBy(VotoRestaurante::getRestaurante, Collectors.counting()))
                .entrySet()
                .stream()
                .max(Map.Entry.comparingByValue());

        return new ResultadoDTO(maisVotadoDia.get().getKey(), data, maisVotadoDia.get().getValue());
    }

}
