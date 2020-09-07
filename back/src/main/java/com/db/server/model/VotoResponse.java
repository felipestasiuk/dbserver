package com.db.server.model;

import com.db.server.entity.VotoRestaurante;
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
@ApiModel(value = "VotoResponse", description = "Retorno de votos")
public class VotoResponse extends BaseResponse{

    @ApiModelProperty(position = 3, notes = "Lista de Votos")
    private List<VotoRestaurante> votos;

    public VotoResponse(Integer code, String message, List<VotoRestaurante> votos) {
        super(code, message);
        this.votos = votos;
    }
}
