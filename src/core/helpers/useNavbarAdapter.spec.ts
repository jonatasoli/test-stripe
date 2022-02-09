import { useNavbarAdapter } from './useNavbarAdapter'

const mock = {
  settings: [
    {
      title: 'Agenda',
      name: 'tatodois-calendario-todos-fisioterapeutas',
      show_in_menu: true,
      category: null,
      category_order: 1,
      menu_order: 3
    },
    {
      title: 'Inserir novo Funcionário',
      name: 'tatodois-novo-funcionario',
      show_in_menu: true,
      category: 'Equipe',
      category_order: 2,
      menu_order: 4
    },
    {
      title: 'Dados do Agendamento',
      name: 'tatodois-visualizar-agendamento',
      show_in_menu: false,
      category: 'Agenda',
      category_order: 0,
      menu_order: 0
    },
    {
      title: 'Triagem',
      name: 'tatodois-edicao-triagem',
      show_in_menu: false,
      category: null,
      category_order: null,
      menu_order: null
    },
    {
      title: 'Listagem de Pacientes',
      name: 'tatodois-lista-pacientes',
      show_in_menu: true,
      category: 'Pacientes',
      category_order: 5,
      menu_order: 1
    },
    {
      title: 'Agenda',
      name: 'tatodois-calendario',
      show_in_menu: false,
      category: 'Agenda',
      category_order: 1,
      menu_order: 2
    },
    {
      title: 'Editar Funcionário',
      name: 'tatodois-atualizar-funcionario',
      show_in_menu: false,
      category: 'Equipe',
      category_order: 0,
      menu_order: 0
    },
    {
      title: 'Inserir Empresa Parceira',
      name: 'tatodois-inserir-empresa',
      show_in_menu: true,
      category: 'Equipe',
      category_order: 2,
      menu_order: 3
    },
    {
      title: 'Visualiza Paciente',
      name: 'tatodois-visualizar-paciente',
      show_in_menu: false,
      category: 'Paciente',
      category_order: 0,
      menu_order: 0
    },
    {
      title: 'Listagem de pré-triagem',
      name: 'tatodois-listagem-pre-triagem',
      show_in_menu: true,
      category: 'Triagem',
      category_order: 6,
      menu_order: 1
    },
    {
      title: 'Triagem',
      name: 'tatodois-triagem',
      show_in_menu: false,
      category: null,
      category_order: null,
      menu_order: null
    },
    {
      title: 'Dados da Empresa Parceira',
      name: 'tatodois-editar-empresa',
      show_in_menu: false,
      category: 'Equipe',
      category_order: 2,
      menu_order: 3
    },
    {
      title: 'Listagem de empresas parceiras',
      name: 'tatodois-listagem-empresas',
      show_in_menu: true,
      category: 'Equipe',
      category_order: 2,
      menu_order: 4
    },
    {
      title: 'Listagem de Funcionários',
      name: 'tatodois-lista-funcionarios',
      show_in_menu: true,
      category: 'Equipe',
      category_order: 2,
      menu_order: 3
    },
    {
      title: 'Dados do Fisioterapeuta',
      name: 'tatodois-dados-fisioterapeuta',
      show_in_menu: false,
      category: 'Equipe',
      category_order: 0,
      menu_order: 0
    },
    {
      title: 'Inserir novo Fisioterapeuta',
      name: 'tatodois-novo-fisioterapeuta',
      show_in_menu: true,
      category: 'Equipe',
      category_order: 2,
      menu_order: 2
    },
    {
      title: 'Listagem de Fisioterapeutas',
      name: 'tatodois-fisioterapeutas',
      show_in_menu: true,
      category: 'Equipe',
      category_order: 2,
      menu_order: 1
    }
  ]
}

const mock_adapted = [
  {
    title: 'Agenda',
    name: 'tatodois-calendario-todos-fisioterapeutas'
  },
  {
    title: 'Equipe',
    children: [
      {
        name: 'tatodois-fisioterapeutas',
        title: 'Listagem de Fisioterapeutas'
      },
      {
        name: 'tatodois-novo-fisioterapeuta',
        title: 'Inserir novo Fisioterapeuta'
      },
      {
        name: 'tatodois-inserir-empresa',
        title: 'Inserir Empresa Parceira'
      },
      {
        name: 'tatodois-lista-funcionarios',
        title: 'Listagem de Funcionários'
      },
      {
        name: 'tatodois-novo-funcionario',
        title: 'Inserir novo Funcionário'
      },
      {
        name: 'tatodois-listagem-empresas',
        title: 'Listagem de empresas parceiras'
      }
    ]
  },
  {
    title: 'Pacientes',
    children: [
      {
        name: 'tatodois-lista-pacientes',
        title: 'Listagem de Pacientes'
      }
    ]
  },
  {
    title: 'Triagem',
    children: [
      {
        name: 'tatodois-listagem-pre-triagem',
        title: 'Listagem de pré-triagem'
      }
    ]
  }
]

describe('check if a response json is being transformed into "NavbarDefinition[]"', () => {
  it('should adapt a valid json api response', () => {
    const response = useNavbarAdapter(mock)
    expect(response).toEqual(mock_adapted)
  })
})
