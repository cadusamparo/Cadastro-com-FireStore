import ColecaoCliente from "@/backend/db/ColecaoCliente"
import Cliente from "@/src/core/Cliente"
import ClienteRepositorio from "@/src/core/ClienteRepositorio"
import { useEffect, useState } from "react"
import useTabelaOuForm from "./useTabelaouForm"

export default function useClientes() {

    const repo: ClienteRepositorio = new ColecaoCliente()

    const {tabelaVisivel, exibirTabela, exibirFormulario} = useTabelaOuForm()

    const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  
    const [clientes, setClientes] = useState<Cliente[]>([])
  
    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')
  
    useEffect(obterTodos, [])
    
    function obterTodos() {
      repo.obterTodos().then(clientes => {
        setClientes(clientes)
        exibirTabela()
      })
    }
  
    function selecionarCliente(cliente: Cliente) {
      setCliente(cliente)
      exibirFormulario()
    }
  
    async function excluirCliente(cliente: Cliente) {
      await repo.excluir(cliente)
      obterTodos()
    }
  
    function novoCliente() {
      setCliente(Cliente.vazio())
      exibirFormulario()
    }
    
    async function salvarCliente(cliente: Cliente) {
      await repo.salvar(cliente)
      obterTodos()
    }

    return {
        cliente,
        clientes,
        novoCliente,
        salvarCliente,
        excluirCliente,
        selecionarCliente,
        obterTodos,
        tabelaVisivel,
        exibirTabela
    }
}