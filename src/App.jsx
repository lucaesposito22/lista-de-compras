import { useState } from 'react'
import logo from './assets/logo.png'
import checkboxDefault from './assets/checkbox-default.png'
import checkboxSelected from './assets/checkbox-selected.png'
import iconDelete from './assets/icon-delete.png'
import Icon from './assets/Icon.png'
import './App.css'

export default function ListaDeCompras() {
  const [novoItem, setNovoItem] = useState('')
  const [lista, setLista] = useState([])
  const [mensagemRemocao, setMensagemRemocao] = useState('')

  function adicionarItem() {
    const itemLimpo = novoItem.trim()
    if (itemLimpo === '') return
    setLista([...lista, { nome: itemLimpo, comprado: false }])
    setNovoItem('')
  }

  function alternarComprado(index) {
    const novaLista = [...lista]
    novaLista[index].comprado = !novaLista[index].comprado
    setLista(novaLista)
  }

  function removerItem(indice) {
    const itemRemovido = lista[indice].nome
    const novaLista = lista.filter((_, i) => i !== indice)
    setLista(novaLista)
    setMensagemRemocao(`"${itemRemovido}" foi removido da lista`)
    setTimeout(() => setMensagemRemocao(''), 3000)
  }

  return (
    <div className="container">
      <img src={logo} alt="Logo do site" className="logo" />
      <a href=""><p id="botao-voltar">⬅ Voltar </p></a>

      <h2>Compras da semana</h2>

      <form onSubmit={e => e.preventDefault()}>
        <input 
          value={novoItem}
          onChange={e => setNovoItem(e.target.value)}
          placeholder="Adicione um novo item"
        />
        <button id="adicionar" onClick={adicionarItem}>
          Adicionar item
        </button>
      </form>

      <ul>
        {lista.map((item, i) => (
          <li key={i} className={item.comprado ? 'comprado' : ''}>
            <img 
              src={item.comprado ? checkboxSelected : checkboxDefault}
              alt="Checkbox"
              className={`checkbox ${item.comprado ? 'marcado' : ''}`}
              onClick={() => alternarComprado(i)}
            />

            <div className={`texto-item ${item.comprado ? 'comprado' : ''}`}>
              {item.nome}
            </div>

            <img
              src={iconDelete}
              alt="Remover item"
              className="IconDelete"
              onClick={() => removerItem(i)}
            />
          </li>
        ))}
      </ul>

      {mensagemRemocao && (
        <div className="mensagem-remocao">
          <img src={Icon} alt="deletado" className="Icon" />
          {mensagemRemocao}
        </div>
      )}
    </div>
  )
}
