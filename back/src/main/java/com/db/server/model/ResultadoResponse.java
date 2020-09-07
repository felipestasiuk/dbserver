package com.db.server.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "ResultadoResponse", description = "Retorno de resultados")
public class ResultadoResponse extends BaseResponse{

    @ApiModelProperty(position = 3, notes = "Lista de Resultados")
    private List<ResultadoDTO> resultados;

    public ResultadoResponse(Integer code, String message, List<ResultadoDTO> resultados) {
        super(code, message);
        this.resultados = resultados;
    }
}
