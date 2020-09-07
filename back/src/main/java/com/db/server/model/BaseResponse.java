package com.db.server.model;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ApiModel(value = "BaseResponse", description = "Estrutura base de resposta")
public class BaseResponse {

    @ApiModelProperty(position = 1, notes = "Codigo de Retorno")
    private Integer code;

    @ApiModelProperty(position = 2, notes = "Mensagem")
    private String message;
}
