const matriz = (status) => {
    return {
        editProject: status,
        removeProject: status,
        addRoleProject: status,
        editRoleProject: status,
        removeRoleProject: status,
        acceptMemberProject: status,
        editMemberProject: status,
        kickMemberProject: status,
        addCategory: status,
        editCategory: status,
        removeCategory: status,
        addProduct: status,
        editProduct: status,
        removeProduct: status,
        addClient: status,
        editClient: status,
        removeClient: status,
        addService: status,
        editService: status,
        removeService: status
    }
}


const defaultRolesProject = [
    {
        name: "Administrador",
        slug: "administrador",
        description: "Admininistración del Proyecto.",
        matriz: matriz(true),
        project: "atic",
        members: ["magguer"]
    },
    {
        name: "CEO",
        slug: "ceo",
        description: "CEO del Proyecto.",
        matriz: matriz(true),
        project: "atic",
        members: ["iviza"]
    },
    {
        name: "Miembro",
        slug: "miembro",
        description: "Miembro del Proyecto.",
        matriz: matriz(false),
        project: "atic",
        members: []
    },
    {
        name: "Administrador",
        slug: "administrador",
        description: "Admininistración del Proyecto.",
        matriz: matriz(true),
        project: "cuartoexpreso",
        members: ["magguer"]
    },
    {
        name: "Miembro",
        slug: "miembro",
        description: "Miembro del Proyecto.",
        matriz: matriz(false),
        project: "cuartoexpreso",
        members: []
    },
    {
        name: "Administrador",
        slug: "administrador",
        description: "Admininistración del Proyecto.",
        matriz: matriz(true),
        project: "noboss",
        members: ["magguer"]
    },
    {
        name: "Miembro",
        slug: "miembro",
        description: "Miembro del Proyecto.",
        matriz: matriz(false),
        project: "noboss",
        members: []
    },
    {
        name: "Administrador",
        slug: "administrador",
        description: "Admininistración del Proyecto.",
        matriz: matriz(true),
        project: "tero_ventas",
        members: ["magguer", "iviza"]
    },
    {
        name: "Miembro",
        slug: "miembro",
        description: "Miembro del Proyecto.",
        matriz: matriz(false),
        project: "tero_ventas",
        members: []
    },
    {
        name: "Administrador",
        slug: "administrador",
        description: "Admininistración del Proyecto.",
        matriz: matriz(true),
        project: "noheliaiguines_personaltrainer",
        members: ["noheiguines"]
    },
    {
        name: "Miembro",
        slug: "miembro",
        description: "Miembro del Proyecto.",
        matriz: matriz(false),
        project: "noheliaiguines_personaltrainer",
        members: []
    },
]

module.exports = defaultRolesProject