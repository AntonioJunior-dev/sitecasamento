import { useEffect, useState } from "react";
import { getConfig, updateConfig } from "../../services/configService";
export default function Configuracoes() {
  return (
    <>
      <h1>Configurações Gerais</h1>

      <input placeholder="Nome dos Noivos" />

      <input placeholder="Data" />

      <input placeholder="Local" />
    </>
  );
}